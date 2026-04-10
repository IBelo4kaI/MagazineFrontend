import type {
   CreateNomenclatureRequest,
   Nomenclature,
} from '@/types/nomenclature'
import { magApi, supplyApi } from './api'
import type { WarehouseCategory } from '@/types/warehouseCategory'
import {
   mockNomenclatures,
   mockUnits,
   mockWarehouseCategories,
} from '@/mock/nomenclature'
import type { Unit } from '@/types/unit'

// ─── GET ──────────────────────────────────────────────────────────────────────

export async function getNomenclature(
   id: string
): Promise<Nomenclature | undefined> {
   console.log('get Nomenclature by id', id)

   return new Promise((resolve) => {
      const result = mockNomenclatures.find((n) => n.id == id)
      setTimeout(() => resolve(result), 600)
   })
}

export async function getNomenclatures(
   search?: string
): Promise<Nomenclature[]> {
   console.log('get Nomenclatures')

   const res = await supplyApi.get<Nomenclature[]>(`/nomenclature`)
   return res.data
}

export async function getWarehouseCategory(
   search?: string
): Promise<WarehouseCategory[]> {
   console.log('get WarehouseCategory', mockWarehouseCategories)

   const res = await supplyApi.get<WarehouseCategory[]>(`/warehouse-categories`)
   return res.data
}

export async function getUnits(search?: string): Promise<Unit[]> {
   console.log('get units')
   // const res = await magApi.get<Unit[]>(`/units`)
   // return res.data

   return new Promise((resolve) => {
      setTimeout(() => resolve(mockUnits), 600)
   })
}

// ─── CREATE ───────────────────────────────────────────────────────────────────

export async function createNomenclature(
   data: CreateNomenclatureRequest
): Promise<Nomenclature> {
   console.log('create nomenclature', data)

   // await magApi.post('/nomenclatures', data)

   return new Promise((resolve) => {
      const created: Nomenclature = {
         id: crypto.randomUUID(),
         name: data.name,
         article: null,
         created_at: '',
         created_by: '',
         description: '',
         height: null,
         length: null,
         weight: null,
         width: null,
         unit: { id: '', name: '' },
         unit_id: '',
         warehouse_category: { id: '', name: '', parent_id: null },
         warehouse_category_id: '',
      }

      mockNomenclatures.push(created)

      setTimeout(() => resolve(created), 600)
   })
}

// export async function createWarehouseCategory(
//    data: WarehouseCategoryCreate
// ): Promise<void> {
//    console.log('create categories', data)
//    await magApi.post('/categories', data)
// }

// ─── UPDATE ───────────────────────────────────────────────────────────────────

// export interface NomenclatureUpdate {
//    warehouse_category_id?: string
//    name?: string
//    description?: string | null
//    article?: string | null
//    unit_id?: string
//    length?: number | null
//    width?: number | null
//    height?: number | null
//    weight?: number | null
// }

// export async function updateNomenclature(
//    id: string,
//    data: NomenclatureUpdate
// ): Promise<Nomenclature | undefined> {
//    console.log('update nomenclature', id, data)

//    return new Promise((resolve) => {})
// }

// export interface NomenclaturePricesUpdate {
//    purchasePrice: number
//    wholesalePrice: number
//    retailPrice: number
// }

// export async function updateNomenclaturePrices(
//    id: string,
//    data: NomenclaturePricesUpdate
// ): Promise<void> {
//    console.log('create categories', data)
//    await magApi.put(`/nomenclatures/${id}`, data)
// }
