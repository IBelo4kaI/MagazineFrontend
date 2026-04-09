<script setup lang="ts">
import { ref, computed, useSlots, renderSlot, type Slots } from 'vue'

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

// ─── Props / Emits ────────────────────────────────────────────────────────────

const {
   node,
   headers,
   dragState,
   depth = 0,
   parentSlots = null,
} = defineProps<{
   node: TreeNode
   headers: TreeHeader[]
   dragState: DragState
   depth?: number
   parentSlots?: Slots | null
}>()

const emit = defineEmits<{
   'drag-start': [e: DragEvent, id: string]
   'drag-over': [e: DragEvent, id: string | null, pos: DragState['position']]
   'drag-end': [e: DragEvent]
   drop: [e: DragEvent, id: string | null, pos: DragState['position']]
}>()

// ─── Slots ────────────────────────────────────────────────────────────────────

// Use own slots if available, otherwise fall through to parentSlots.
// This allows the root TreeView to pass its slots down the full recursive tree
// without vue-tsc needing to infer types from dynamic slot names.
const ownSlots = useSlots()
const activeSlots = computed<Slots>(() =>
   Object.keys(ownSlots).length ? ownSlots : (parentSlots ?? {})
)

// ─── State ────────────────────────────────────────────────────────────────────

const isOpen = ref(true)
const hasChildren = computed(() => node.children.length > 0)
const isDragging = computed(() => dragState.draggedId === node.id)
const isOver = computed(
   () => dragState.overTarget === node.id && dragState.position === 'inside'
)
const showDropLines = computed(
   () => dragState.dragging && dragState.draggedId !== node.id
)

// Typed forwarders — avoids implicit `any` in template arrow functions
function fwdDragStart(e: DragEvent, id: string) {
   emit('drag-start', e, id)
}
function fwdDragOver(
   e: DragEvent,
   id: string | null,
   pos: DragState['position']
) {
   emit('drag-over', e, id, pos)
}
function fwdDragEnd(e: DragEvent) {
   emit('drag-end', e)
}
function fwdDrop(e: DragEvent, id: string | null, pos: DragState['position']) {
   emit('drop', e, id, pos)
}

function getCellValue(key: string): unknown {
   return node[key]
}
</script>

<template>
   <!-- Drop line: before -->
   <tr
      v-if="showDropLines"
      class="drop-line-row"
      :class="{
         'drop-line-row--active':
            dragState.overTarget === node.id && dragState.position === 'before',
      }"
      @dragover.prevent="emit('drag-over', $event, node.id, 'before')"
      @drop.prevent="emit('drop', $event, node.id, 'before')"
   >
      <td
         :colspan="headers.length + ($slots.actions ? 1 : 0)"
         class="drop-line-cell"
      />
   </tr>

   <!-- Node row -->
   <tr
      class="tree-row"
      :class="{
         'tree-row--dragging': isDragging,
         'tree-row--over': isOver,
         'tree-row--parent': hasChildren,
      }"
      draggable="true"
      @dragstart.stop="emit('drag-start', $event, node.id)"
      @dragend.stop="emit('drag-end', $event)"
      @dragover.prevent.stop="emit('drag-over', $event, node.id, 'inside')"
      @drop.prevent.stop="emit('drop', $event, node.id, 'inside')"
   >
      <td
         v-for="(header, i) in headers"
         :key="header.key"
         class="tree-cell"
         :class="`align-${header.align ?? 'left'}`"
      >
         <!-- First column: indent + expand + drag handle + content -->
         <span
            v-if="i === 0"
            class="tree-cell__first"
            :style="{ paddingLeft: `${depth * 1.5}rem` }"
         >
            <!-- Expand toggle -->
            <button
               v-if="hasChildren"
               class="expand-btn"
               :class="{ 'expand-btn--open': isOpen }"
               type="button"
               :aria-label="isOpen ? 'Свернуть' : 'Развернуть'"
               @click.stop="isOpen = !isOpen"
            >
               <svg viewBox="0 0 8 12" fill="none" aria-hidden="true">
                  <path
                     d="M2 2L6 6L2 10"
                     stroke="currentColor"
                     stroke-width="1.5"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                  />
               </svg>
            </button>
            <span v-else class="leaf-indent" aria-hidden="true" />

            <!-- Cell content -->
            <component
               :is="
                  () =>
                     renderSlot(activeSlots, `cell-${header.key}`, {
                        value: getCellValue(header.key),
                        node,
                        depth,
                        hasChildren,
                     })
               "
            />
            <span
               v-if="!activeSlots[`cell-${header.key}`]"
               class="cell-value"
               :class="{ 'cell-value--bold': hasChildren }"
            >
               {{ getCellValue(header.key) ?? '—' }}
            </span>

            <!-- Drag handle — крайний правый в первой колонке -->
            <span class="drag-handle" aria-hidden="true" title="Перетащить">
               <svg viewBox="0 0 16 16" fill="none">
                  <circle cx="5.5" cy="4" r="1" fill="currentColor" />
                  <circle cx="10.5" cy="4" r="1" fill="currentColor" />
                  <circle cx="5.5" cy="8" r="1" fill="currentColor" />
                  <circle cx="10.5" cy="8" r="1" fill="currentColor" />
                  <circle cx="5.5" cy="12" r="1" fill="currentColor" />
                  <circle cx="10.5" cy="12" r="1" fill="currentColor" />
               </svg>
            </span>
         </span>

         <!-- Other columns -->
         <template v-else>
            <component
               :is="
                  () =>
                     renderSlot(activeSlots, `cell-${header.key}`, {
                        value: getCellValue(header.key),
                        node,
                        depth,
                        hasChildren,
                     })
               "
            />
            <span v-if="!activeSlots[`cell-${header.key}`]" class="cell-value">
               {{ getCellValue(header.key) ?? '—' }}
            </span>
         </template>
      </td>

      <!-- Actions slot column -->
      <td v-if="activeSlots.actions" class="tree-cell align-right actions-cell">
         <component
            :is="
               () =>
                  renderSlot(activeSlots, 'actions', {
                     node,
                     depth,
                     hasChildren,
                  })
            "
         />
      </td>
   </tr>

   <!-- Children rows (recursive) — pass activeSlots down, no dynamic slot forwarding needed -->
   <template v-if="hasChildren && isOpen">
      <TreeNode
         v-for="child in node.children"
         :key="child.id"
         :node="child"
         :headers="headers"
         :drag-state="dragState"
         :depth="depth + 1"
         :parent-slots="activeSlots"
         @drag-start="fwdDragStart"
         @drag-over="fwdDragOver"
         @drag-end="fwdDragEnd"
         @drop="fwdDrop"
      />
   </template>

   <!-- Drop line: after -->
   <tr
      v-if="showDropLines"
      class="drop-line-row"
      :class="{
         'drop-line-row--active':
            dragState.overTarget === node.id && dragState.position === 'after',
      }"
      @dragover.prevent="emit('drag-over', $event, node.id, 'after')"
      @drop.prevent="emit('drop', $event, node.id, 'after')"
   >
      <td
         :colspan="headers.length + ($slots.actions ? 1 : 0)"
         class="drop-line-cell"
      />
   </tr>
</template>

<style scoped>
/* ── Data row ─────────────────────────────────────────────── */
.tree-row {
   border-bottom: 1px solid var(--border-color);
   cursor: grab;
   transition:
      background 0.12s,
      opacity 0.12s;
   user-select: none;
}

.tree-row:last-child {
   border-bottom: none;
}
.tree-row:hover {
   background: var(--muted-foreground);
}
.tree-row:active {
   cursor: grabbing;
}

.tree-row--parent {
   background: var(--muted-foreground);
   font-weight: 600;
}
.tree-row--parent:hover {
   background: var(--background);
}

.tree-row--dragging {
   opacity: 0.35;
   cursor: grabbing;
}

.tree-row--over {
   background: var(--muted-accent) !important;
   outline: 1.5px solid var(--accent);
   outline-offset: -1px;
}

/* ── Cells ────────────────────────────────────────────────── */
.tree-cell {
   padding: var(--padding-secondary, 0.71rem) var(--padding-primary, 1.45rem);
   color: var(--text);
   vertical-align: middle;
   font-size: 0.875rem;
}

.tree-cell.align-center {
   text-align: center;
}
.tree-cell.align-right {
   text-align: right;
}

.actions-cell {
   width: 1px;
   white-space: nowrap;
}

/* ── First column layout ──────────────────────────────────── */
.tree-cell__first {
   display: flex;
   align-items: center;
   gap: 0.4rem;
}

/* ── Expand button ────────────────────────────────────────── */
.expand-btn {
   all: unset;
   display: inline-flex;
   align-items: center;
   justify-content: center;
   flex-shrink: 0;
   width: 1.2rem;
   height: 1.2rem;
   border: 1px solid var(--border-color);
   border-radius: calc(var(--border-radius, 0.7rem) * 0.5);
   background: var(--foreground);
   cursor: pointer;
   transition:
      border-color 0.12s,
      background 0.12s;
}

.expand-btn svg {
   width: 8px;
   height: 12px;
   color: var(--muted-text);
   transition:
      transform 0.18s ease,
      color 0.12s;
}

.expand-btn--open svg {
   transform: rotate(90deg);
}

.expand-btn:hover {
   border-color: var(--accent);
}
.expand-btn:hover svg {
   color: var(--accent);
}

.expand-btn:focus-visible {
   outline: 2px solid var(--accent);
   outline-offset: 1px;
}

/* ── Leaf indent ──────────────────────────────────────────── */
.leaf-indent {
   display: inline-block;
   width: 1.2rem;
   flex-shrink: 0;
}

/* ── Cell value ───────────────────────────────────────────── */
.cell-value {
   display: block;
}
.cell-value--bold {
   font-weight: 600;
}

/* ── Drag handle ──────────────────────────────────────────── */
.drag-handle {
   display: flex;
   align-items: center;
   margin-left: auto;
   width: 0.88rem;
   height: 0.88rem;
   color: transparent;
   flex-shrink: 0;
   transition: color 0.12s;
}
.drag-handle svg {
   width: 100%;
   height: 100%;
}
.tree-row:hover .drag-handle {
   color: var(--muted-text);
}

/* ── Drop line rows ───────────────────────────────────────── */
.drop-line-row {
   height: 0;
}

.drop-line-cell {
   padding: 0;
   height: 3px;
   background: transparent;
   transition: background 0.1s;
   position: relative;
}

.drop-line-row--active .drop-line-cell {
   background: var(--accent);
}

.drop-line-row--active .drop-line-cell::before {
   content: '';
   position: absolute;
   left: 0;
   top: 50%;
   translate: 0 -50%;
   width: 7px;
   height: 7px;
   border-radius: 50%;
   background: var(--accent);
}
</style>
