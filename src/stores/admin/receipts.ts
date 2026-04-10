import { WAREHOUSE_ID } from '@/constants/warehouse'
import { createReceipt, deleteReceipt, getReceipts } from '@/services/receipt'
import type { Receipt } from '@/types/receipt'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useNewReceiptStore } from './newReceipt'

export const useReceiptsStore = defineStore('receipts', () => {
   const receipts = ref<Receipt[]>([])
   const isLoading = ref(false)
   const error = ref<string | null>(null)

   const newReceiptStore = useNewReceiptStore()

   const items = computed<Receipt[]>(() => {
      return receipts.value.filter((r) => r.warehouse_id == WAREHOUSE_ID)
   })

   async function load(): Promise<void> {
      isLoading.value = true
      error.value = null
      try {
         receipts.value = await getReceipts()
      } catch {
         error.value = 'Не удалось загрузить номенклатуры'
      } finally {
         isLoading.value = false
      }
   }

   async function getNextNum(): Promise<number> {
      if (!items.value.length) {
         await load()
      }

      if (!items.value.length) return 1

      return [...items.value].sort((a, b) => b.num - a.num)[0]!.num + 1
   }

   async function create(): Promise<Receipt> {
      const num = await getNextNum()
      const res = await createReceipt({ num: num, warehouse_id: WAREHOUSE_ID })
      return res
   }

   function update() {}

   async function remove(id: string) {
      isLoading.value = true
      await deleteReceipt(id)
      receipts.value = receipts.value.filter((r) => r.id != id)
      isLoading.value = false
   }

   return {
      receipts,
      items,
      isLoading,
      error,
      load,
      create,
      update,
      remove,
   }
})
