import type { Unit } from './unit'
import type { WarehouseCategory } from './warehouseCategory'

export interface Nomenclature {
   id: string
   name: string
   description: string | null
   article: string | null
   unit_id: string
   warehouse_category_id: string
   unit: Unit
   warehouse_category: WarehouseCategory
   length: number | null
   width: number | null
   height: number | null
   weight: number | null
   created_at: string
   created_by: string
}

export interface CreateNomenclatureRequest {
   warehouse_category_id: string
   name: string
   description?: string | null
   article?: string | null
   unit_id: string
   length?: number | null
   width?: number | null
   height?: number | null
   weight?: number | null
}
