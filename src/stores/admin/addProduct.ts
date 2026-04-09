import { useForm } from '@/composables/useForm'
import type { NomenclatureForm } from '@/forms/product/schema'
import { nomenclatureFormSchema } from '@/forms/product/schema'
import {
   getNomenclatures,
   getUnits,
   getWarehouseCategory,
} from '@/services/nomenclature'
import type { Nomenclature } from '@/types/nomenclature'
import type { Unit } from '@/types/unit'
import type { WarehouseCategory } from '@/types/warehouseCategory'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const NOMENCLATURE_FIELDS: ReadonlyArray<keyof NomenclatureForm> = [
   'name',
   'warehouseCategoryId',
   'unitId',
   'article',
   'description',
   'length',
   'width',
   'height',
   'weight',
]

export const useAddProductStore = defineStore('add-product', () => {
   // ─── Reference data ────────────────────────────────────────────────────────
   const nomenclatureIdCreated = ref<string | null>(null)
   const nomenclatureOptions = ref<Nomenclature[]>([])
   const nomenclatureLoading = ref(false)
   const categoriesOptions = ref<WarehouseCategory[]>([])
   const categoriesLoading = ref(false)
   const unitsOptions = ref<Unit[]>([])
   const unitsLoading = ref(false)
   const isLoading = ref(false)

   async function searchNomenclatures(query?: string) {
      nomenclatureLoading.value = true
      nomenclatureOptions.value = await getNomenclatures(query)
      nomenclatureLoading.value = false
   }

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
      await Promise.all([
         searchNomenclatures(),
         searchCategories(),
         searchUnits(),
      ])
      isLoading.value = false
   }

   // ─── Linked nomenclature tracking ─────────────────────────────────────────

   const linkedNomenclatureId = ref<string | null>(null)

   // ─── Form ──────────────────────────────────────────────────────────────────

   const form = useForm({
      schema: nomenclatureFormSchema,

      onAfterSet: (key) => {
         if (
            linkedNomenclatureId.value &&
            NOMENCLATURE_FIELDS.includes(key as keyof NomenclatureForm)
         ) {
            linkedNomenclatureId.value = null
         }
      },

      onSubmit: async (values) => {
         isLoading.value = true
         try {
            const {
               purchasePrice,
               wholesalePrice,
               retailPrice,
               ...nomenclature
            } = values

            // if (linkedNomenclatureId.value) {
            //    await updateNomenclaturePrices(linkedNomenclatureId.value, {
            //       purchasePrice,
            //       wholesalePrice,
            //       retailPrice,
            //    })
            // } else {
            //    await createNomenclature({
            //       ...nomenclature,
            //       prices: { purchasePrice, wholesalePrice, retailPrice },
            //    })
            // }

            linkedNomenclatureId.value = null
         } catch (e) {
            throw e
         } finally {
            isLoading.value = false
         }
      },
   })

   function selectNomenclature(v: Nomenclature) {
      form.setMany({
         name: v.name,
         article: v.article ?? null,
         description: v.description ?? null,
         height: v.height ?? null,
         length: v.length ?? null,
         weight: v.weight ?? null,
         width: v.width ?? null,
         unitId: v.unit.id,
         warehouseCategoryId: v.warehouse_category_id,
      })
      linkedNomenclatureId.value = v.id
   }

   return {
      isLoading,
      linkedNomenclatureId,
      nomenclatureIdCreated,
      nomenclatureOptions,
      nomenclatureLoading,
      categoriesOptions,
      categoriesLoading,
      unitsOptions,
      unitsLoading,
      searchNomenclatures,
      searchCategories,
      searchUnits,
      load,
      selectNomenclature,
      ...form,
   }
})
