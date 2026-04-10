import type { WarehouseStockResponse } from '@/types/warehouse'
import { supplyApi } from './api'

export async function getWarehouseNomenclatures(
   search?: string
): Promise<WarehouseStockResponse> {
   console.log('get Nomenclatures')

   const res = await supplyApi.get<WarehouseStockResponse>(
      `/warehouses/cb609f27-3319-11f1-a7e3-bc241127d0bd/list`
   )
   return res.data
}
