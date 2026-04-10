import { validators } from '@/composables/useForm'
import type { FormSchema } from '@/composables/useForm'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PersonForm {
   name: string
   last_naem: string
   middle_name: string | null
   phone_personal: string | null
   email_personal: string | null
   birth_date: string | null
}

// ─── Schema ───────────────────────────────────────────────────────────────────

export const personFormSchema: FormSchema<PersonForm> = {
   name: {
      initial: '',
      validators: [validators.required('Укажите имя')],
   },
   last_naem: {
      initial: '',
      validators: [validators.required('Укажите фамилию')],
   },
   middle_name: {
      initial: null,
   },
   phone_personal: {
      initial: null,
   },
   email_personal: {
      initial: null,
   },
   birth_date: {
      initial: null,
   },
}
