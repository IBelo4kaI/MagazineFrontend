import { validators } from '@/composables/useForm'
import type { FormSchema } from '@/composables/useForm'

export interface EmployeeForm {
   person_id: string
   counterparty_id: string
   position: string
   role_type: string
}

export const physicDetailSchema: FormSchema<EmployeeForm> = {
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
   role_type: {
      initial: 'owner',
   },
}
