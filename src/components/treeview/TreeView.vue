<template>
   <div class="tree-table-wrapper">
      <table class="tree-table">
         <thead>
            <tr class="tree-table__head-row">
               <th
                  v-for="(header, i) in headers"
                  :key="header.key"
                  class="tree-table__th"
                  :class="`align-${header.align ?? 'left'}`"
                  :style="header.width ? { width: header.width } : {}"
               >
                  <!-- первая колонка — extra padding под expand-btn -->
                  <span :style="i === 0 ? 'padding-left: 0.25rem' : ''">
                     {{ header.title }}
                  </span>
               </th>
               <!-- слот для колонки действий -->
               <th
                  v-if="$slots.actions"
                  class="tree-table__th align-right actions-th"
               >
                  <span>Действия</span>
               </th>
            </tr>
         </thead>

         <tbody>
            <!-- Drop zone: в корень — последняя строка при drag -->
            <template v-for="node in rootNodes" :key="node.id">
               <TreeNodeRow
                  :node="node"
                  :headers="headers"
                  :drag-state="dragState"
                  :depth="0"
                  :parent-slots="slots"
                  @drag-start="onDragStart"
                  @drag-over="onDragOver"
                  @drag-end="onDragEnd"
                  @drop="onDrop"
               />
            </template>

            <tr
               v-if="dragState.dragging"
               class="tree-table__drop-root"
               :class="{
                  'tree-table__drop-root--active':
                     dragState.overTarget === '__root__',
               }"
               @dragover.prevent="onDragOver($event, null, 'root')"
               @drop.prevent="onDrop($event, null, 'root')"
            >
               <td :colspan="headers.length + ($slots.actions ? 1 : 0)">
                  <span>
                     <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                           d="M3 8h10M8 3v10"
                           stroke="currentColor"
                           stroke-width="1.5"
                           stroke-linecap="round"
                        />
                     </svg>
                     Переместить в корень
                  </span>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>
<script setup lang="ts">
import { reactive, computed, useSlots } from 'vue'
import TreeNodeRow from './TreeNode.vue'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TreeItem {
   id: string
   name: string
   parent_id: string | null
   [key: string]: unknown
}

export interface TreeNode extends TreeItem {
   children: TreeNode[]
}

export interface TreeHeader {
   key: string
   title: string
   align?: 'left' | 'center' | 'right'
   width?: string
}

interface DragState {
   dragging: boolean
   draggedId: string | null
   overTarget: string | null
   position: 'before' | 'inside' | 'after' | 'root' | null
}

// ─── Props / Model ────────────────────────────────────────────────────────────

const items = defineModel<TreeItem[]>('items', { required: true })

const { headers = [{ key: 'name', title: 'Название' }] } = defineProps<{
   headers?: TreeHeader[]
}>()

// ─── Tree builder ─────────────────────────────────────────────────────────────

const rootNodes = computed<TreeNode[]>(() => buildTree(items.value, null))

function buildTree(source: TreeItem[], parentId: string | null): TreeNode[] {
   return source
      .filter((i) => i.parent_id === parentId)
      .map((i) => ({ ...i, children: buildTree(source, i.id) }))
}

function isDescendant(ancestorId: string, nodeId: string): boolean {
   let cur = items.value.find((i) => i.id === nodeId)
   while (cur) {
      if (cur.parent_id === null) return false
      if (cur.parent_id === ancestorId) return true
      cur = items.value.find((i) => i.id === cur!.parent_id)
   }
   return false
}

// ─── Drag & Drop ─────────────────────────────────────────────────────────────

const dragState = reactive<DragState>({
   dragging: false,
   draggedId: null,
   overTarget: null,
   position: null,
})

function onDragStart(e: DragEvent, nodeId: string) {
   dragState.dragging = true
   dragState.draggedId = nodeId
   e.dataTransfer!.effectAllowed = 'move'
}

function onDragOver(
   e: DragEvent,
   targetId: string | null,
   position: DragState['position']
) {
   e.preventDefault()
   if (targetId === dragState.draggedId) return
   dragState.overTarget = targetId ?? '__root__'
   dragState.position = position
   e.dataTransfer!.dropEffect = 'move'
}

function onDrop(
   e: DragEvent,
   targetId: string | null,
   position: DragState['position']
) {
   e.preventDefault()
   const { draggedId } = dragState
   if (!draggedId || !position) {
      reset()
      return
   }
   if (draggedId === targetId) {
      reset()
      return
   }
   if (targetId && isDescendant(draggedId, targetId)) {
      reset()
      return
   }

   const list = [...items.value]
   const fromIdx = list.findIndex((i) => i.id === draggedId)
   if (fromIdx === -1) {
      reset()
      return
   }
   const sourceItem = list[fromIdx]
   if (!sourceItem) {
      reset()
      return
   }
   let dragged: TreeItem = { ...sourceItem }
   list.splice(fromIdx, 1)

   if (position === 'root') {
      items.value = [{ ...dragged, parent_id: null }, ...list]
      reset()
      return
   }

   if (position === 'inside') {
      dragged = { ...dragged, parent_id: targetId }
      const toIdx = list.findIndex((i) => i.id === targetId)
      list.splice(toIdx === -1 ? list.length : toIdx + 1, 0, dragged)
      items.value = list
      reset()
      return
   }

   const targetIdx = list.findIndex((i) => i.id === targetId)
   if (targetIdx === -1) {
      reset()
      return
   }
   const target = list[targetIdx]
   if (!target) {
      reset()
      return
   }
   dragged = { ...dragged, parent_id: target.parent_id }
   const insertAt = position === 'before' ? targetIdx : targetIdx + 1
   list.splice(insertAt, 0, dragged)
   items.value = list
   reset()
}

function onDragEnd() {
   reset()
}

function reset() {
   dragState.dragging = false
   dragState.draggedId = null
   dragState.overTarget = null
   dragState.position = null
}

const slots = useSlots()
</script>
<style scoped>
.tree-table-wrapper {
   width: 100%;
   background: var(--foreground);
   border-radius: var(--border-radius);
   border: 1px solid var(--border-color);
   overflow: hidden;
}

.tree-table {
   width: 100%;
   border-collapse: collapse;
   font-size: 0.875rem;
   color: var(--text);
}

/* ── Head ─────────────────────────────────────────────────── */
.tree-table__head-row {
   background: var(--muted-foreground);
}

.tree-table__th {
   padding: var(--padding-secondary, 0.71rem) var(--padding-primary, 1.45rem);
   border-bottom: 1px solid var(--border-color);
   font-weight: 600;
   font-size: 0.8rem;
   color: var(--muted-text);
   white-space: nowrap;
   user-select: none;
   letter-spacing: 0.02em;
   text-align: left;
}

.tree-table__th.align-center {
   text-align: center;
}
.tree-table__th.align-right {
   text-align: right;
}

.actions-th {
   width: 1px;
   white-space: nowrap;
}

/* ── Drop-to-root row ─────────────────────────────────────── */
.tree-table__drop-root td {
   padding: 0.45rem var(--padding-primary, 1.45rem);
   border-top: 1px dashed var(--border-color);
   transition:
      background 0.15s,
      border-color 0.15s;
}

.tree-table__drop-root td span {
   display: flex;
   align-items: center;
   gap: 0.4rem;
   font-size: 0.78rem;
   color: var(--muted-text);
}

.tree-table__drop-root td svg {
   width: 0.85rem;
   height: 0.85rem;
   flex-shrink: 0;
}

.tree-table__drop-root--active td {
   background: var(--muted-accent);
   border-color: var(--accent);
}

.tree-table__drop-root--active td span {
   color: var(--on-muted-accent);
}

/* ── Alignment helpers (used by TreeNode cells too) ───────── */
:deep(.align-left) {
   text-align: left;
}
:deep(.align-center) {
   text-align: center;
}
:deep(.align-right) {
   text-align: right;
}
</style>
