import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCategoriesStore } from '@/stores/categories'

// ─── Типы ────────────────────────────────────────────────

export interface Unit {
   id: string
   name: string
}

export interface Nomenclature {
   id: string
   warehouse_category_id: string
   name: string
   description: string | null
   article: string | null
   unit_id: string
   length: number | null
   width: number | null
   height: number | null
   weight: number | null
   created_at: string
   created_by: string | null
}

export interface NomenclatureView extends Nomenclature {
   unit: Unit
   category: ReturnType<ReturnType<typeof useCategoriesStore>['getById']>
   parentCategory: ReturnType<ReturnType<typeof useCategoriesStore>['getById']>
}

// ─── Моковые данные ───────────────────────────────────────

const mockUnits: Unit[] = [
   { id: '0b9a841a-1640-11f1-aa8c-bc241127d0bd', name: 'м²' },
   { id: '0b9a8afe-1640-11f1-aa8c-bc241127d0bd', name: 'пог. м.' },
   { id: '95d86089-12d4-11f1-aa8c-bc241127d0bd', name: 'шт' },
   { id: '95d8671d-12d4-11f1-aa8c-bc241127d0bd', name: 'кг' },
]

const mockNomenclature: Nomenclature[] = [
   {
      id: '0de89b24-72cd-4736-a602-e8cfe0da38cf',
      warehouse_category_id: '27bcf122-14df-48c1-8cc9-02ff3667c5ec',
      name: 'Молоток',
      description: null,
      article: null,
      unit_id: '95d86089-12d4-11f1-aa8c-bc241127d0bd',
      length: null,
      width: null,
      height: null,
      weight: null,
      created_at: '2026-03-05 18:00:43',
      created_by: '122d844d-b3be-42d9-8b5b-8a0058edb2d8',
   },
   {
      id: '1fa56da1-12df-11f1-aa8c-bc241127d0bd',
      warehouse_category_id: '6d7f283c-12d4-11f1-aa8c-bc241127d0bd',
      name: 'Гвоздь 100 мм',
      description: null,
      article: null,
      unit_id: '95d86089-12d4-11f1-aa8c-bc241127d0bd',
      length: null,
      width: null,
      height: null,
      weight: null,
      created_at: '2026-02-26 09:53:36',
      created_by: '122d844d-b3be-42d9-8b5b-8a0058edb2d8',
   },
]

async function fetchNomenclature(): Promise<Nomenclature[]> {
   return new Promise((resolve) => {
      setTimeout(() => resolve(mockNomenclature), 600)
   })
}

async function fetchUnits(): Promise<Unit[]> {
   return new Promise((resolve) => {
      setTimeout(() => resolve(mockUnits), 300)
   })
}

// ─── Стор ─────────────────────────────────────────────────

export const useNomenclatureStore = defineStore('nomenclature', () => {
   const categoriesStore = useCategoriesStore()

   const items = ref<Nomenclature[]>([])
   const units = ref<Unit[]>([])
   const isLoading = ref(false)
   const error = ref<string | null>(null)

   const load = async (): Promise<void> => {
      if (items.value.length) return
      isLoading.value = true
      error.value = null
      try {
         // грузим параллельно
         ;[items.value, units.value] = await Promise.all([
            fetchNomenclature(),
            fetchUnits(),
         ])
      } catch {
         error.value = 'Не удалось загрузить номенклатуру'
      } finally {
         isLoading.value = false
      }
   }

   function getUnit(id: string) {
      return units.value.find((u) => u.id === id) ?? null
   }

   const itemsView = computed<NomenclatureView[]>(() =>
      items.value.map((n) => {
         const category = categoriesStore.getById(n.warehouse_category_id)
         return {
            ...n,
            unit: getUnit(n.unit_id)!,
            category,
            parentCategory: category?.parent_id
               ? categoriesStore.getById(category.parent_id)
               : null,
         }
      })
   )

   function add(item: Omit<Nomenclature, 'id' | 'created_at' | 'created_by'>) {
      items.value.push({
         ...item,
         id: crypto.randomUUID(),
         created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
         created_by: null,
      })
   }

   function update(
      id: string,
      patch: Partial<Omit<Nomenclature, 'id' | 'created_at' | 'created_by'>>
   ) {
      const item = items.value.find((n) => n.id === id)
      if (item) Object.assign(item, patch)
   }

   function remove(id: string) {
      items.value = items.value.filter((n) => n.id !== id)
   }

   return {
      items,
      units,
      isLoading,
      error,
      itemsView,
      load,
      getUnit,
      add,
      update,
      remove,
   }
})
