import { markRaw, ref } from 'vue'
import type { Component } from 'vue'

interface ModalEntry {
   id: number
   component: Component
   props?: Record<string, unknown>
   onClose?: (result?: unknown) => void
}

const stack = ref<ModalEntry[]>([])
let nextId = 0

export function useModal() {
   const open = <T = unknown>(
      component: Component,
      props?: Record<string, unknown>
   ): Promise<T | undefined> => {
      return new Promise((resolve) => {
         stack.value.push({
            id: nextId++,
            component: markRaw(component),
            props,
            onClose: (result?: unknown) => resolve(result as T | undefined),
         })
      })
   }

   const close = (id: number, result?: unknown) => {
      const idx = stack.value.findIndex((m) => m.id === id)
      if (idx === -1) return
      stack.value[idx]?.onClose?.(result)
      stack.value.splice(idx, 1)
   }

   const closeLast = (result?: unknown) => {
      const last = stack.value[stack.value.length - 1]
      if (!last) return
      close(last.id, result)
   }

   return { stack, open, close, closeLast }
}
