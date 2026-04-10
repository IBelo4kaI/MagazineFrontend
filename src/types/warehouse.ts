export interface WarehouseStockResponse {
   warehouse: {
      id: string
      name: string
      type: string
      type_name: string
      object_levels_id: string | null
   }
   items: StockItem[]
}

export interface StockItem {
   id: string
   row_ids: string[]
   warehouse_id: string
   warehouse_name: string
   nomenclature_id: string
   nomenclature_name: string
   unit_id: string
   unit_name: string
   object_levels_id: string | null
   object_id: string | null
   project_name: string | null
   quantity: number
   total_quantity: number
   date: string
}

export interface GroupedStockItem extends StockItem {
   children: Pick<StockItem, 'object_id' | 'project_name' | 'quantity'>[]
}
