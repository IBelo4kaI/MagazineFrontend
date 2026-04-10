import { validators } from '@/composables/useForm'
import type { FormSchema } from '@/composables/useForm'

// ─── Counterparty type ────────────────────────────────────────────────────────

export type CounterpartyType = 'LLC' | 'IP' | 'PHYSIC'

// ─── Base form (общая сущность) ───────────────────────────────────────────────

export interface CounterpartyForm {
   type: CounterpartyType
   short_name: string
   full_name: string
   is_internal: boolean
   contract_prefix: string | null
}

// ─── LLC detail form ──────────────────────────────────────────────────────────

export interface LLCDetailForm {
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

// ─── IP detail form ───────────────────────────────────────────────────────────

export interface IPDetailForm {
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

// ─── Physic detail form ───────────────────────────────────────────────────────

export interface PhysicDetailForm {
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

// ─── Union detail form (используется в сторе) ─────────────────────────────────

export type CounterpartyDetailForm =
   | LLCDetailForm
   | IPDetailForm
   | PhysicDetailForm

// ─── Base schema ──────────────────────────────────────────────────────────────

export const counterpartyFormSchema: FormSchema<CounterpartyForm> = {
   type: {
      initial: 'LLC',
      validators: [validators.required('Выберите тип контрагента')],
   },
   short_name: {
      initial: '',
      validators: [validators.required('Укажите краткое наименование')],
   },
   full_name: {
      initial: '',
      validators: [validators.required('Укажите полное наименование')],
   },
   is_internal: {
      initial: false,
   },
   contract_prefix: {
      initial: null,
   },
}

// ─── LLC schema ───────────────────────────────────────────────────────────────

export const llcDetailSchema: FormSchema<LLCDetailForm> = {
   inn: {
      initial: '',
      validators: [
         validators.required('Укажите ИНН'),
         validators.minLength(10, 'ИНН ООО должен содержать 10 цифр'),
         validators.maxLength(10, 'ИНН ООО должен содержать 10 цифр'),
      ],
   },
   kpp: {
      initial: '',
      validators: [
         validators.required('Укажите КПП'),
         validators.minLength(9, 'КПП должен содержать 9 цифр'),
      ],
   },
   ogrn: {
      initial: '',
      validators: [
         validators.required('Укажите ОГРН'),
         validators.minLength(13, 'ОГРН должен содержать 13 цифр'),
      ],
   },
   okpo: { initial: null },
   okogu: { initial: null },
   okato: { initial: null },
   oktmo: { initial: null },
   okfs: { initial: null },
   okopf: { initial: null },
   tax_system: { initial: null },
   okved: { initial: null },
   legal_address: {
      initial: '',
      validators: [validators.required('Укажите юридический адрес')],
   },
   actual_address: {
      initial: '',
      validators: [validators.required('Укажите фактический адрес')],
   },
   postal_address: {
      initial: '',
      validators: [validators.required('Укажите почтовый адрес')],
   },
   director_person_id: {
      initial: '',
      validators: [validators.required('Выберите директора')],
   },
   director_basis: { initial: null, hidden: true },
   date_register: { initial: null, hidden: true },
}

// ─── IP schema ────────────────────────────────────────────────────────────────

export const ipDetailSchema: FormSchema<IPDetailForm> = {
   inn: {
      initial: '',
      validators: [
         validators.required('Укажите ИНН'),
         validators.minLength(12, 'ИНН ИП должен содержать 12 цифр'),
      ],
   },
   ogrnip: { initial: null },
   okpo: { initial: null },
   okved: { initial: null },
   okopf: { initial: null },
   okfs: { initial: null },
   okogu: { initial: null },
   okato: { initial: null },
   oktmo: { initial: null },
   person_id: {
      initial: '',
      validators: [validators.required('Выберите физическое лицо')],
   },
   date_register: { initial: null },
}

// ─── Physic schema ────────────────────────────────────────────────────────────

export const physicDetailSchema: FormSchema<PhysicDetailForm> = {
   person_id: {
      initial: '',
      validators: [validators.required('Выберите физическое лицо')],
   },
   passport_series: {
      initial: '',
      validators: [validators.required('Укажите серию паспорта')],
   },
   passport_number: {
      initial: '',
      validators: [validators.required('Укажите номер паспорта')],
   },
   passport_issued_by: {
      initial: '',
      validators: [validators.required('Укажите кем выдан паспорт')],
   },
   passport_date_issued: {
      initial: '',
      validators: [validators.required('Укажите дату выдачи паспорта')],
   },
   passport_date: {
      initial: '',
      validators: [validators.required('Укажите дату рождения')],
   },
   department_code: {
      initial: '',
      validators: [validators.required('Укажите код подразделения')],
   },
   inn: { initial: null },
   address_registration: {
      initial: '',
      validators: [validators.required('Укажите адрес регистрации')],
   },
   address_living: {
      initial: '',
      validators: [validators.required('Укажите адрес проживания')],
   },
}
