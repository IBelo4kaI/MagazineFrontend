import { getNomenclatures } from '@/services/nomenclature'
import type { Nomenclature } from '@/types/nomenclature'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNomenclaturesStore = defineStore('nomenclatures', () => {
   const nomenclatures = ref<Nomenclature[]>([])
   const newNomenclature = ref<Nomenclature | null>(null)
   const isLoading = ref(false)
   const error = ref<string | null>(null)

   const load = async (): Promise<void> => {
      isLoading.value = true
      error.value = null
      try {
         nomenclatures.value = await getNomenclatures()
      } catch {
         error.value = 'Не удалось загрузить номенклатуры'
      } finally {
         isLoading.value = false
      }
   }

   function create() {}

   function update() {}

   function remove() {}

   return {
      nomenclatures,
      newNomenclature,
      isLoading,
      error,
      load,
      create,
      update,
      remove,
   }
})
