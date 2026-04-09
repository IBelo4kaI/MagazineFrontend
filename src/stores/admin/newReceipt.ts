import { useForm } from '@/composables/useForm'
import { receiptFormSchema } from '@/forms/receipt/schema'
import { getCounterparties } from '@/services/counterparty'
import { getNomenclatures } from '@/services/nomenclature'
import type { Counterparty } from '@/types/counterparty'
import type { Nomenclature } from '@/types/nomenclature'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNewReceipt = defineStore('new-receipt', () => {
   const counterpartyOptions = ref<Counterparty[]>([])
   const counterpartyLoading = ref(false)
   const nomenclatureOptions = ref<Nomenclature[]>([])
   const nomenclatureLoading = ref(false)
   const isLoading = ref(false)

   const load = async () => {
      isLoading.value = true
      await searchCounterparty()
      await searchNomenclatures()
      isLoading.value = false
   }

   async function searchNomenclatures(query?: string) {
      nomenclatureLoading.value = true
      nomenclatureOptions.value = await getNomenclatures(query)
      nomenclatureLoading.value = false
   }

   async function searchCounterparty(query?: string) {
      counterpartyLoading.value = true
      counterpartyOptions.value = await getCounterparties(query)
      counterpartyLoading.value = false
   }

   const form = useForm({
      schema: receiptFormSchema,
      onSubmit: async (values) => {
         console.log(values)
      },
   })

   return {
      counterpartyOptions,
      counterpartyLoading,
      nomenclatureOptions,
      nomenclatureLoading,
      searchCounterparty,
      searchNomenclatures,
      isLoading,
      load,
      ...form,
   }
})
