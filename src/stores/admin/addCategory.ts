import { useForm } from '@/composables/useForm'
import { warehouseCategoryFormSchema } from '@/forms/warehouseCategory/schema'
import { getWarehouseCategory } from '@/services/nomenclature'
import type { WarehouseCategory } from '@/types/warehouseCategory'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddCategoryStore = defineStore('add-category', () => {
   // ─── Reference data ────────────────────────────────────────────────────────
   const categoriesOptions = ref<WarehouseCategory[]>([])
   const categoriesLoading = ref(false)

   const isLoading = ref(false)

   async function searchCategories(query?: string) {
      categoriesLoading.value = true
      categoriesOptions.value = await getWarehouseCategory(query)
      categoriesLoading.value = false
   }

   async function load() {
      isLoading.value = true
      await searchCategories()
      isLoading.value = false
   }

   // ─── Form ──────────────────────────────────────────────────────────────────
   const form = useForm({
      schema: warehouseCategoryFormSchema,

      onSubmit: async (values) => {
         isLoading.value = true

         // await createWarehouseCategory(values)

         isLoading.value = false
      },
   })

   return {
      isLoading,
      categoriesOptions,
      categoriesLoading,
      searchCategories,
      load,
      ...form,
   }
})
