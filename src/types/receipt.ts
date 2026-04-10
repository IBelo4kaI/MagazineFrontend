export interface ReceiptItem {
   id: string
   warehouse_receipt_id: string
   nomenclature_id: string
   nomenclature_name: string
   unit_id: string
   unit_name: string
   quantity: number
   price: number
   object_id: string | null
   object_name: string | null
   comment: string | null
}

export interface Receipt {
   id: string
   num: number
   type: number
   from: string
   from_name: string
   to: string | null
   to_name: string | null
   area_name: string | null
   document: string | null
   object_id: string | null
   object_name: string | null
   file_id: string | null
   created_at: string
   date_arrival: string
   date_completed: string | null
   warehouse_id: string
   warehouse_name: string
   delivery_id: string | null
   status_id: string
   status_name: string
   items: ReceiptItem[]
}

export interface ReceiptCreate {
   num?: number | null
   from?: string | null
   to?: string | null
   type?: number | null
   area_name?: string | null
   document?: string | null
   object_id?: string | null
   file_id?: string | null
   date_arrival?: string | null
   date_completed?: string | null
   warehouse_id?: string | null
   delivery_id?: number | null
   status_id?: string | null
}

export type ReceiptUpdate = ReceiptCreate
