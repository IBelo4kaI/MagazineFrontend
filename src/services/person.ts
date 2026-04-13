import type { Person } from '@/types/counterparty'
import { refApi, supplyApi } from './api'

export interface PersonCreate {
   name: string
   last_naem: string
   middle_name: string | null
   phone_personal: string | null
   email_personal: string | null
   birth_date: string | null
}

// ─── GET ──────────────────────────────────────────────────────────────────────

export async function getPersons(search?: string): Promise<Person[]> {
   const res = await refApi.get<Person[]>('/persons', {
      params: { search: search },
   })
   console.log('get persons', res.data)
   return res.data
}

export async function getPersonById(
   personId: string
): Promise<Person | undefined> {
   const res = await refApi.get<Person>(`/persons/${personId}`)
   console.log('get person by id', res.data)
   return res.data
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createPerson(data: PersonCreate): Promise<Person> {
   const res = await refApi.post<Person>('/persons', data)
   console.log('create person', res.data)
   return res.data
}
