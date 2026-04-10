import type { Receipt, ReceiptCreate, ReceiptUpdate } from '@/types/receipt'
import { supplyApi } from './api'

export async function getReceipts(search?: string): Promise<Receipt[]> {
   const res = await supplyApi.get<Receipt[]>(`/warehouse-receipts`)
   console.log('get receipts', res.data)
   return res.data
}

export async function getReceiptById(id: string): Promise<Receipt> {
   const res = await supplyApi.get<Receipt>(`/warehouse-receipts/${id}`)
   console.log('get receipt by id', res.data)
   return res.data
}

export async function createReceipt(data: ReceiptCreate): Promise<Receipt> {
   const res = await supplyApi.post<Receipt>('/warehouse-receipts', data)
   console.log('create receipt', res.data)
   return res.data
}

export async function updateWarehouseReceipt(
   id: string,
   data: ReceiptUpdate
): Promise<Receipt> {
   const res = await supplyApi.patch<Receipt>(`/warehouse-receipts/${id}`, data)
   return res.data
}

export async function deleteReceipt(id: string): Promise<void> {
   console.log('delete receipt')
   await supplyApi.delete(`/warehouse-receipts/${id}`)
}
