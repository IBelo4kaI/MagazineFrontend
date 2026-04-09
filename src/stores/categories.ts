import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Category {
   id: string
   name: string
   parent_id: string | null
   imgUrl?: string
}

export interface CategoryTreeNode extends Category {
   children: Category[]
}

const mockCategories: Category[] = [
   {
      id: '27bcf122-14df-48c1-8cc9-02ff3667c5ec',
      name: 'Инструменты',
      parent_id: null,
   },
   {
      id: '6d7f283c-12d4-11f1-aa8c-bc241127d0bd',
      name: 'Гвозди',
      parent_id: 'e73bfbe7-12d3-11f1-aa8c-bc241127d0bd',
   },
   {
      id: 'e73bfbe7-12d3-11f1-aa8c-bc241127d0bd',
      name: 'Метизы',
      parent_id: null,
   },
]

async function fetchCategories(): Promise<Category[]> {
   return new Promise((resolve) => {
      setTimeout(() => resolve(mockCategories), 600)
   })
}

export const useCategoriesStore = defineStore('categories', () => {
   const items = ref<Category[]>([])
   const isLoading = ref(false)
   const error = ref<string | null>(null)

   const load = async (): Promise<void> => {
      if (items.value.length) return
      isLoading.value = true
      error.value = null
      try {
         items.value = await fetchCategories()
      } catch {
         error.value = 'Не удалось загрузить категории'
      } finally {
         isLoading.value = false
      }
   }

   function getById(id: string) {
      return items.value.find((c) => c.id === id) ?? null
   }

   const rootItems = computed(() =>
      items.value.filter((c) => c.parent_id === null)
   )

   const tree = computed<CategoryTreeNode[]>(() =>
      rootItems.value.map((parent) => ({
         ...parent,
         children: items.value.filter((c) => c.parent_id === parent.id),
      }))
   )

   return { items, isLoading, error, rootItems, tree, load, getById }
})
