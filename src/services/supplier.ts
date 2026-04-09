import { magApi } from '@/services/api'
import type { Supplier } from '@/types/supplier'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SupplierCreate {
   counterpartiesId: string
   siteUrl?: string
   siteLogin?: string
   sitePassword?: string
}

// ─── GET ──────────────────────────────────────────────────────────────────────

export async function getSuppliers(): Promise<Supplier[]> {
   const res = await magApi.get<Supplier[]>('/suppliers')
   return res.data
}

export async function getSupplierById(id: string): Promise<Supplier> {
   const res = await magApi.get<Supplier>(`/suppliers/${id}`)
   return res.data
}

export async function getSupplierByCounterpartyId(
   id: string
): Promise<Supplier> {
   const res = await magApi.get<Supplier>(`/suppliers/by-counterparty/${id}`)
   return res.data
}

// ─── CREATE ───────────────────────────────────────────────────────────────────

export async function createSupplier(data: SupplierCreate): Promise<void> {
   await magApi.post('/suppliers', data)
}
