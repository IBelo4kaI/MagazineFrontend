import { validators } from '@/composables/useForm'
import type { FormSchema } from '@/composables/useForm'

export interface PhysicDetailForm {
   person_id: string
   counterparty_id: string
   position: string
}

export const physicDetailSchema: FormSchema<PhysicDetailForm> = {
   person_id: {
      initial: '',
      validators: [validators.required('Выберите физическое лицо')],
   },
   counterparty_id: {
      initial: '',
      validators: [validators.required('Выберите физическое лицо')],
   },
   position: {
      initial: '',
   },
}
