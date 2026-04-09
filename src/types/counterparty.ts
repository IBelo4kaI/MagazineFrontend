import type {
   IPDetailForm,
   LLCDetailForm,
   PhysicDetailForm,
} from '@/forms/counterparty/schema'

export interface PersonCompany {
   company_id: string
   company_name: string
   role: string
   position: string
   phone_work: string
   phone_extra: string
   email_work: string
   email_extra: string
   comment: string
}

export interface Person {
   id: string
   user_id: string | null
   name: string
   last_name: string
   middle_name: string
   full_name: string
   phone: string
   email: string
   birth_date: string
   companies: PersonCompany[]
}

export type CounterpartyType = 'LLC' | 'IP' | 'PHYSIC'

export interface Counterparty {
   id: string
   type: CounterpartyType
   short_name: string
   full_name: string
   is_internal: boolean
   contract_prefix: string | null
   created_at: string | null
   updated_at: string | null
}

// ─── Details ──────────────────────────────────────────────────────────────────

export interface LLCDetails {
   id: number | null
   counterparties_id: string
   inn: string
   kpp: string
   ogrn: string
   okpo: string | null
   okogu: string | null
   okato: string | null
   oktmo: string | null
   okfs: string | null
   okopf: string | null
   tax_system: string | null
   okved: string | null
   legal_address: string
   actual_address: string
   postal_address: string
   director_person_id: string
   director_basis: string | null
   date_register: string | null
}

export interface IPDetails {
   id: number | null
   counterparty_id: string
   inn: string
   ogrnip: string | null
   okpo: string | null
   okved: string | null
   okopf: string | null
   okfs: string | null
   okogu: string | null
   okato: string | null
   oktmo: string | null
   person_id: string
   date_register: string | null
}

export interface PhysDetails {
   counterparty_id: string
   person_id: string
   passport_series: string
   passport_number: string
   passport_issued_by: string
   passport_date_issued: string
   passport_date: string
   department_code: string
   inn: string | null
   address_registration: string
   address_living: string
}

export type CounterpartyDetails =
   | { type: 'LLC'; data: LLCDetails }
   | { type: 'IP'; data: IPDetails }
   | { type: 'PHYSIC'; data: PhysDetails }

// ─── Request / Response ───────────────────────────────────────────────────────

export interface LLCDetailsCreate extends LLCDetailForm {
   counterparties_id: string
}

export interface IPDetailsCreate extends IPDetailForm {
   counterparty_id: string
}

export interface PhysicDetailsCreate extends PhysicDetailForm {
   counterparty_id: string
}

export interface CounterpartyUpdate {
   short_name?: string
   full_name?: string
   is_internal?: boolean
   contract_prefix?: string | null
}
