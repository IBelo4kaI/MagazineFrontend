import { reactive, computed, type Ref } from 'vue'
import type { DragState, TreeItem, TreeNode } from './types'

// ─── Tree builder ──────────────────────────────────────────────────────────────

export function useTree(items: Ref<TreeItem[]>) {
   const rootNodes = computed<TreeNode[]>(() => buildTree(items.value, null))

   function buildTree(source: TreeItem[], parentId: string | null): TreeNode[] {
      return source
         .filter((item) => item.parent_id === parentId)
         .map((item) => ({
            ...item,
            children: buildTree(source, item.id),
         }))
   }

   function isDescendant(ancestorId: string, nodeId: string): boolean {
      let current = items.value.find((i) => i.id === nodeId)
      while (current) {
         if (current.parent_id === ancestorId) return true
         current = items.value.find((i) => i.id === current!.parent_id)
      }
      return false
   }

   return { rootNodes, isDescendant }
}

// ─── Drag & Drop ───────────────────────────────────────────────────────────────

export function useDragDrop(
   items: Ref<TreeItem[]>,
   emit: (event: 'update:items', value: TreeItem[]) => void
) {
   const dragState = reactive<DragState>({
      dragging: false,
      draggedId: null,
      overTarget: null,
      position: null,
   })

   const { isDescendant } = useTree(items)

   function onDragStart(event: DragEvent, nodeId: string) {
      dragState.dragging = true
      dragState.draggedId = nodeId
      event.dataTransfer!.effectAllowed = 'move'
   }

   function onDragOver(
      event: DragEvent,
      targetId: string | null,
      position: DragState['position']
   ) {
      event.preventDefault()
      if (targetId === dragState.draggedId) return
      dragState.overTarget = targetId ?? '__root__'
      dragState.position = position
      event.dataTransfer!.dropEffect = 'move'
   }

   function onDrop(
      event: DragEvent,
      targetId: string | null,
      position: DragState['position']
   ) {
      event.preventDefault()
      const { draggedId } = dragState
      if (!draggedId) return
      if (draggedId === targetId) {
         reset()
         return
      }
      if (targetId && isDescendant(draggedId, targetId)) {
         reset()
         return
      }

      const updated = items.value.map((item) => {
         if (item.id !== draggedId) return item

         if (position === 'inside') return { ...item, parent_id: targetId }
         if (position === 'root') return { ...item, parent_id: null }

         // before / after → inherit target's parent
         const target = items.value.find((i) => i.id === targetId)
         return { ...item, parent_id: target?.parent_id ?? null }
      })

      emit('update:items', updated)
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

   return { dragState, onDragStart, onDragOver, onDrop, onDragEnd }
}
