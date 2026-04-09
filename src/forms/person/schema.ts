import { validators } from '@/composables/useForm'
import type { FormSchema } from '@/composables/useForm'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PersonForm {
   user_id: string
   name: string
   last_naem: string
   middle_name: string
   phone_personal: string
   email_personal: string
   birth_date: string
}

// ─── Schema ───────────────────────────────────────────────────────────────────

export const personFormSchema: FormSchema<PersonForm> = {
   user_id: {
      initial: '',
   },
   name: {
      initial: '',
      validators: [validators.required('Укажите имя')],
   },
   last_naem: {
      initial: '',
      validators: [validators.required('Укажите фамилию')],
   },
   middle_name: {
      initial: '',
   },
   phone_personal: {
      initial: '',
   },
   email_personal: {
      initial: '',
   },
   birth_date: {
      initial: '',
   },
}
