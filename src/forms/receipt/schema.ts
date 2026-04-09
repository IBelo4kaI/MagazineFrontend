import { validators } from '@/composables/useForm'
import type { FormSchema } from '@/composables/useForm'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ReceiptItem {
   nomenclature_id: string
   quantity?: number | null
   price?: number | null
   object_id?: string | null
}

export interface ReceiptForm {
   // Receipt
   num: number | null
   from: string
   object_id: string | null
   file_id: string | null
   date_arrival: string | null // ISO date (YYYY-MM-DD)
   date_completed: string | null // ISO datetime
   warehouse_id: string | null
   delivery_id: number | null
   status_id: string | null

   // product
   items: ReceiptItem[]
}

// ─── Schema ───────────────────────────────────────────────────────────────────

export const receiptFormSchema: FormSchema<ReceiptForm> = {
   num: {
      initial: null,
   },
   from: {
      initial: '',
      validators: [validators.required('Укажите поставщика')],
   },
   object_id: {
      initial: null,
   },
   file_id: {
      initial: null,
   },
   date_arrival: {
      initial: null,
   },
   date_completed: {
      initial: null,
   },
   warehouse_id: {
      initial: null,
   },
   delivery_id: {
      initial: null,
   },
   status_id: {
      initial: null,
   },
   items: { initial: [] },
}
