import { useForm } from '@/composables/useForm'
import { nomenclatureFormModalSchema } from '@/forms/nomenclature/schemaModal'
import type { NomenclatureForm } from '@/forms/product/schema'
import { nomenclatureFormSchema } from '@/forms/product/schema'
import {
   createNomenclature,
   getNomenclatures,
   getUnits,
   getWarehouseCategory,
} from '@/services/nomenclature'
import type { Nomenclature } from '@/types/nomenclature'
import type { Unit } from '@/types/unit'
import type { WarehouseCategory } from '@/types/warehouseCategory'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNomenclaturesStore } from './nomenclatures'

export const useAddNomenclatureModalStore = defineStore(
   'add-nomenclature-modal',
   () => {
      const nomenclaturesStore = useNomenclaturesStore()
      const categoriesOptions = ref<WarehouseCategory[]>([])
      const categoriesLoading = ref(false)
      const unitsOptions = ref<Unit[]>([])
      const unitsLoading = ref(false)
      const isLoading = ref(false)

      async function searchCategories(query?: string) {
         categoriesLoading.value = true
         categoriesOptions.value = await getWarehouseCategory(query)
         categoriesLoading.value = false
      }

      async function searchUnits(query?: string) {
         unitsLoading.value = true
         unitsOptions.value = await getUnits(query)
         unitsLoading.value = false
      }

      async function load() {
         isLoading.value = true
         await Promise.all([searchCategories(), searchUnits()])
         isLoading.value = false
      }

      // ─── Form ──────────────────────────────────────────────────────────────────

      const form = useForm({
         schema: nomenclatureFormModalSchema,

         onSubmit: async (values) => {
            isLoading.value = true
            try {
               console.log(values)
               const created = await createNomenclature({
                  name: values.name,
                  unit_id: values.unitId,
                  warehouse_category_id: values.warehouseCategoryId,
               })
               nomenclaturesStore.newNomenclature = created
            } catch (e) {
               throw e
            } finally {
               isLoading.value = false
            }
         },
      })

      return {
         isLoading,
         categoriesOptions,
         categoriesLoading,
         unitsOptions,
         unitsLoading,
         searchCategories,
         searchUnits,
         load,
         ...form,
      }
   }
)
