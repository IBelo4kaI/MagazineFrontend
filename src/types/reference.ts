// ─── Objects ─────────────────────────────────────────────────────────────────

export interface RefObject {
   id: string
   name: string
   address: string | null
   created_at: string
   updated_at: string
}

export interface ObjectLevel {
   id: string
   object_id: string
   name: string
   level: number
   parent_id: string | null
}

export interface ObjectStructure {
   id: string
   name: string
   levels: ObjectLevel[]
}

// ─── Employees ───────────────────────────────────────────────────────────────

export interface Employee {
   id: string
   person_id: string
   counterparty_id: string | null
   position: string | null
   department: string | null
   created_at: string
   updated_at: string
}

export interface Department {
   id: string
   name: string
}

// ─── Contracts ───────────────────────────────────────────────────────────────

export interface Contract {
   id: string
   number: string
   date: string
   counterparty_id: string
   object_id: string | null
   type: string | null
   status: string | null
   created_at: string
   updated_at: string
}

// ─── Work Types ──────────────────────────────────────────────────────────────

export interface WorkType {
   id: string
   name: string
   description: string | null
}

// ─── Bank Accounts ───────────────────────────────────────────────────────────

export interface BankAccount {
   id: string
   counterparty_id: string
   bank_name: string
   bik: string
   account_number: string
   correspondent_account: string | null
}

// ─── Counterparty extras ─────────────────────────────────────────────────────

export interface CounterpartySummary {
   id: string
   type: string
   short_name: string
   full_name: string
   is_internal: boolean
}

export interface CounterpartyFullProfile {
   id: string
   type: string
   short_name: string
   full_name: string
   is_internal: boolean
   contract_prefix: string | null
   details: Record<string, unknown>
   employees: Employee[]
   bank_accounts: BankAccount[]
}

export interface AdditionalOkved {
   id: string
   counterparty_id: string
   code: string
   name: string | null
}
