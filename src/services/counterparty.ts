import type { CounterpartyForm } from '@/forms/counterparty/schema'
import type {
   Counterparty,
   CounterpartyDetails,
   CounterpartyUpdate,
   IPDetails,
   IPDetailsCreate,
   LLCDetails,
   LLCDetailsCreate,
   PhysDetails,
   PhysicDetailsCreate,
} from '@/types/counterparty'

// ─── Mock data ────────────────────────────────────────────────────────────────

const mockCounterparties: Counterparty[] = [
   {
      id: 'cnt-001',
      type: 'LLC',
      short_name: 'ООО «Ромашка»',
      full_name: 'Общество с ограниченной ответственностью «Ромашка»',
      is_internal: false,
      contract_prefix: 'РМШ',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z',
   },
   {
      id: 'cnt-002',
      type: 'IP',
      short_name: 'ИП Петрова М.С.',
      full_name: 'Индивидуальный предприниматель Петрова Мария Сергеевна',
      is_internal: false,
      contract_prefix: 'ПТР',
      created_at: '2024-02-20T12:00:00Z',
      updated_at: '2024-02-20T12:00:00Z',
   },
   {
      id: 'cnt-003',
      type: 'PHYSIC',
      short_name: 'Сидоров А.Н.',
      full_name: 'Сидоров Алексей Николаевич',
      is_internal: true,
      contract_prefix: null,
      created_at: '2024-03-05T09:30:00Z',
      updated_at: '2024-03-05T09:30:00Z',
   },
]

const mockLLCDetails: Record<string, LLCDetails> = {
   'cnt-001': {
      id: 1,
      counterparties_id: 'cnt-001',
      inn: '7701234567',
      kpp: '770101001',
      ogrn: '1027700132195',
      okpo: '12345678',
      okogu: '4210014',
      okato: '45286560000',
      oktmo: '45386000',
      okfs: '16',
      okopf: '12300',
      tax_system: 'УСН',
      okved: '62.01',
      legal_address: '125009, г. Москва, ул. Тверская, д. 1',
      actual_address: '125009, г. Москва, ул. Тверская, д. 1',
      postal_address: '125009, г. Москва, ул. Тверская, д. 1',
      director_person_id: 'psn-001',
      director_basis: 'Устав',
      date_register: '2010-03-15',
   },
}

const mockIPDetails: Record<string, IPDetails> = {
   'cnt-002': {
      id: 2,
      counterparty_id: 'cnt-002',
      inn: '771234567890',
      ogrnip: '312774600123456',
      okpo: '87654321',
      okved: '62.02',
      okopf: '50102',
      okfs: '16',
      okogu: null,
      okato: '45286560000',
      oktmo: '45386000',
      person_id: 'psn-002',
      date_register: '2015-07-22',
   },
}

const mockPhysDetails: Record<string, PhysDetails> = {
   'cnt-003': {
      counterparty_id: 'cnt-003',
      person_id: 'psn-003',
      passport_series: '4512',
      passport_number: '654321',
      passport_issued_by: 'ОУФМС России по г. Москве по району Тверской',
      passport_date_issued: '2015-06-10',
      passport_date: '2015-06-10',
      department_code: '770-001',
      inn: '771234567890',
      address_registration: '125009, г. Москва, ул. Тверская, д. 5, кв. 10',
      address_living: '125009, г. Москва, ул. Тверская, д. 5, кв. 10',
   },
}

// ─── GET ──────────────────────────────────────────────────────────────────────

export async function getCounterparties(
   query?: string
): Promise<Counterparty[]> {
   console.log('get counterparties', query)

   return new Promise((resolve) => {
      setTimeout(() => {
         const result = query
            ? mockCounterparties.filter((c) =>
                 c.short_name.toLowerCase().includes(query.toLowerCase())
              )
            : mockCounterparties
         resolve(result)
      }, 300)
   })
}

export async function getCounterpartyById(
   id: string
): Promise<Counterparty | undefined> {
   console.log('get counterparty by id', id)

   return new Promise((resolve) => {
      setTimeout(
         () => resolve(mockCounterparties.find((c) => c.id === id)),
         300
      )
   })
}

// ─── GET details ──────────────────────────────────────────────────────────────

export async function getLLCDetails(
   counterpartyId: string
): Promise<LLCDetails | undefined> {
   console.log('get LLC details', counterpartyId)

   // GET /api/ref/counterparties/{counterparty_id}/details/llc
   return new Promise((resolve) => {
      setTimeout(() => resolve(mockLLCDetails[counterpartyId]), 300)
   })
}

export async function getIPDetails(
   counterpartyId: string
): Promise<IPDetails | undefined> {
   console.log('get IP details', counterpartyId)

   // GET /api/ref/counterparties/{counterparty_id}/details/ip
   return new Promise((resolve) => {
      setTimeout(() => resolve(mockIPDetails[counterpartyId]), 300)
   })
}

export async function getPhysDetails(
   counterpartyId: string
): Promise<PhysDetails | undefined> {
   console.log('get Phys details', counterpartyId)

   // GET /api/ref/counterparties/{counterparty_id}/details/phys
   return new Promise((resolve) => {
      setTimeout(() => resolve(mockPhysDetails[counterpartyId]), 300)
   })
}

export async function getCounterpartyDetails(
   counterparty: Pick<Counterparty, 'id' | 'type'>
): Promise<CounterpartyDetails | undefined> {
   switch (counterparty.type) {
      case 'LLC': {
         const data = await getLLCDetails(counterparty.id)
         return data ? { type: 'LLC', data } : undefined
      }
      case 'IP': {
         const data = await getIPDetails(counterparty.id)
         return data ? { type: 'IP', data } : undefined
      }
      case 'PHYSIC': {
         const data = await getPhysDetails(counterparty.id)
         return data ? { type: 'PHYSIC', data } : undefined
      }
   }
}

// ─── CREATE ───────────────────────────────────────────────────────────────────

export async function createCounterparty(
   data: CounterpartyForm
): Promise<Counterparty> {
   console.log('create counterparty', data)

   return new Promise((resolve) => {
      const created: Counterparty = {
         id: `${crypto.randomUUID()}`,
         type: data.type,
         short_name: data.short_name,
         full_name: data.full_name,
         is_internal: data.is_internal,
         contract_prefix: data.contract_prefix,
         created_at: new Date().toISOString(),
         updated_at: new Date().toISOString(),
      }

      mockCounterparties.push(created)
      setTimeout(() => resolve(created), 400)
   })
}

export async function createLLCDetails(data: LLCDetailsCreate): Promise<void> {
   console.log('create LLC details', data)
   return new Promise((resolve) => setTimeout(() => resolve(), 400))
}

export async function createIPDetails(data: IPDetailsCreate): Promise<void> {
   console.log('create IP details', data)
   return new Promise((resolve) => setTimeout(() => resolve(), 400))
}

export async function createPhysicDetails(
   data: PhysicDetailsCreate
): Promise<void> {
   console.log('create Physic details', data)
   return new Promise((resolve) => setTimeout(() => resolve(), 400))
}

// ─── UPDATE ───────────────────────────────────────────────────────────────────

export async function updateCounterparty(
   id: string,
   data: CounterpartyUpdate
): Promise<Counterparty | undefined> {
   console.log('update counterparty', id, data)

   return new Promise((resolve) => {
      const index = mockCounterparties.findIndex((c) => c.id === id)
      if (index === -1) return resolve(undefined)

      const current = mockCounterparties[index]
      if (!current) return resolve(undefined)

      const updated: Counterparty = {
         ...current,
         ...data,
         updated_at: new Date().toISOString(),
      }
      mockCounterparties[index] = updated
      setTimeout(() => resolve(updated), 400)
   })
}
