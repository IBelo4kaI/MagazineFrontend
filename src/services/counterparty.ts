import type { CounterpartyForm } from '@/forms/counterparty/schema'
import type {
   Counterparty,
   CounterpartyDetails,
   CounterpartyUpdate,
   GetDetails,
   IPDetails,
   IPDetailsCreate,
   LLCDetails,
   LLCDetailsCreate,
   PhysDetails,
   PhysicDetailsCreate,
} from '@/types/counterparty'
import { refApi } from './api'

// ─── GET ──────────────────────────────────────────────────────────────────────

export async function getCounterparties(
   query?: string
): Promise<Counterparty[]> {
   console.log('get counterparties', query)

   const res = await refApi.get<Counterparty[]>(`/counterparties`)
   return res.data
}

export async function getCounterpartyByINN(
   inn: string
): Promise<Counterparty[]> {
   console.log('get counterparties', inn)

   const res = await refApi.get<Counterparty[]>(`/counterparties/search`, {
      params: { q: inn },
   })
   return res.data
}

// export async function getCounterpartyById(
//    id: string
// ): Promise<Counterparty | undefined> {
//    console.log('get counterparty by id', id)

//    const res = await supplyApi.get<Counterparty>(`/warehouse-categories`)
//    return res.data
// }

// ─── GET details ──────────────────────────────────────────────────────────────

export async function getLLCDetails(
   counterpartyId: string
): Promise<GetDetails<LLCDetails> | undefined> {
   console.log('get LLC details', counterpartyId)

   // GET /api/ref/counterparties/{counterparty_id}/details/llc
   const res = await refApi.get<GetDetails<LLCDetails>>(
      `/counterparties/llc/${counterpartyId}`
   )
   return res.data
}

export async function getIPDetails(
   counterpartyId: string
): Promise<GetDetails<IPDetails> | undefined> {
   console.log('get IP details', counterpartyId)

   // GET /api/ref/counterparties/{counterparty_id}/details/ip
   const res = await refApi.get<GetDetails<IPDetails>>(
      `/counterparties/ip/${counterpartyId}`
   )
   return res.data
}

export async function getPhysDetails(
   counterpartyId: string
): Promise<GetDetails<PhysDetails> | undefined> {
   console.log('get Phys details', counterpartyId)

   // GET /api/ref/counterparties/{counterparty_id}/details/phys
   const res = await refApi.get<GetDetails<PhysDetails>>(
      `/counterparties/phys/${counterpartyId}`
   )
   return res.data
}

export async function getCounterpartyDetails(
   counterparty: Pick<Counterparty, 'id' | 'type'>
): Promise<CounterpartyDetails | undefined> {
   switch (counterparty.type) {
      case 'LLC': {
         const data = await getLLCDetails(counterparty.id)
         return data ? { type: 'LLC', data: data.details } : undefined
      }
      case 'IP': {
         const data = await getIPDetails(counterparty.id)
         return data ? { type: 'IP', data: data.details } : undefined
      }
      case 'PHYSIC': {
         const data = await getPhysDetails(counterparty.id)
         return data ? { type: 'PHYSIC', data: data.details } : undefined
      }
   }
}

// export async function getCounterpartyFullProfile(
//    counterpartyId: string
// ): Promise<CounterpartyDetails | undefined> {
//    switch (counterparty.type) {
//       case 'LLC': {
//          const data = await getLLCDetails(counterparty.id)
//          return data ? { type: 'LLC', data } : undefined
//       }
//       case 'IP': {
//          const data = await getIPDetails(counterparty.id)
//          return data ? { type: 'IP', data } : undefined
//       }
//       case 'PHYSIC': {
//          const data = await getPhysDetails(counterparty.id)
//          return data ? { type: 'PHYSIC', data } : undefined
//       }
//    }
// }

// ─── CREATE ───────────────────────────────────────────────────────────────────

export async function createCounterparty(
   data: CounterpartyForm
): Promise<Counterparty> {
   const res = await refApi.post<Counterparty>('/counterparties', data)
   console.log('create counterparty', res.data)
   return res.data
}

export async function createLLCDetails(data: LLCDetailsCreate): Promise<void> {
   const res = await refApi.post('/counterparties/llc', data)
   console.log('create counterparty llc', res.data)
   // return res.data
}

export async function createIPDetails(data: IPDetailsCreate): Promise<void> {
   const res = await refApi.post('/counterparties/ip', data)
   console.log('create counterparty ip', res.data)
   // return res.data
}

export async function createPhysicDetails(
   data: PhysicDetailsCreate
): Promise<void> {
   const res = await refApi.post('/counterparties/phys', data)
   console.log('create counterparty phys', res.data)
   // return res.data
}

// ─── UPDATE ───────────────────────────────────────────────────────────────────

export async function updateCounterparty(
   id: string,
   data: CounterpartyUpdate
): Promise<Counterparty | undefined> {
   console.log('update counterparty', id, data)

   return new Promise((resolve) => {})
}
