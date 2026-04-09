export type ProductStatus = 'in-sale' | 'no-sale'

export interface Product {
   id: string
   nomenclature_id: string
   purchase_price: number
   wholesale_price: number
   retail_price: number
   status: ProductStatus
}
