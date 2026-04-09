import { adminRoutes } from '@/router'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface MenuItem {
   id: string
   label: string
   to?: string
   children?: MenuItem[]
}

async function fetchMenuItems(): Promise<MenuItem[]> {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve([])
      }, 300)
   })
}

export const useMenuStore = defineStore('menu', () => {
   const mainItems = ref<MenuItem[]>([])
   const mode = ref<'admin' | 'main'>('main')
   const isLoading = ref<boolean>(false)
   const error = ref<string | null>(null)
   const isOpen = ref<boolean>(false)

   const items = computed<MenuItem[]>(() => {
      if (isLoading.value) return []
      return mode.value == 'main' ? mainItems.value : adminItems.value
   })

   const adminItems = computed<MenuItem[]>(() => {
      return [
         ...adminRoutes
            .filter((r) => r.meta && r.meta.existInMenu)
            .map((r): MenuItem => {
               return {
                  id: String(r.name),
                  label: String(r.meta?.title),
                  to: r.path,
               }
            }),
      ]
   })

   const staticItems = computed<MenuItem[]>(() => {
      return [
         // { id: 'admin', label: 'Админ панель', to: '/admin' },
         // ...mainRoutes
         //    .filter((r) => r.meta && r.meta.existInMenu)
         //    .map((r): MenuItem => {
         //       return {
         //          id: String(r.name),
         //          label: String(r.meta?.title),
         //          to: r.path,
         //       }
         //    }),
      ]
   })

   const load = async (): Promise<void> => {
      if (mode.value == 'admin') return
      if (mainItems.value.length) return // не грузим повторно
      isLoading.value = true
      error.value = null
      try {
         mainItems.value = [...staticItems.value, ...(await fetchMenuItems())]
      } catch {
         error.value = 'Не удалось загрузить меню'
      } finally {
         isLoading.value = false
      }
   }

   const open = (): void => {
      isOpen.value = true
   }
   const close = (): void => {
      isOpen.value = false
   }
   const toggle = (): void => {
      isOpen.value = !isOpen.value
   }

   return {
      mode,
      adminItems,
      items,
      isLoading,
      error,
      isOpen,
      load,
      open,
      close,
      toggle,
   }
})
