import type { FormSchema } from '@/composables/useForm'
import { validators } from '@/composables/useForm'
import type { Receipt } from '@/types/receipt'

export const receiptFormSchema: FormSchema<Receipt> = {
   num: {
      initial: 1,
   },
   from: {
      initial: '',
      validators: [validators.required('Укажите поставщика')],
   },
   object_id: {
      initial: null,
   },
   file_id: {
      initial: null,
   },
   date_arrival: {
      initial: new Date().toDateString(),
   },
   date_completed: {
      initial: null,
   },
   warehouse_id: {
      initial: '',
   },
   delivery_id: {
      initial: null,
   },
   status_id: {
      initial: '',
   },

   // --------------------------------------------
   area_name: {
      initial: '',
      hidden: true,
   },
   created_at: {
      initial: '',
      hidden: true,
   },
   document: {
      initial: '',
      hidden: true,
   },
   from_name: {
      initial: '',
      hidden: true,
   },
   id: {
      initial: '',
      hidden: true,
   },
   items: {
      initial: [],
      hidden: true,
   },
   object_name: {
      initial: '',
      hidden: true,
   },
   status_name: {
      initial: '',
      hidden: true,
   },
   to: {
      initial: '',
      hidden: true,
   },

   to_name: {
      initial: '',
      hidden: true,
   },
   type: {
      initial: 1,
      hidden: true,
   },
   warehouse_name: {
      initial: '',
      hidden: true,
   },
}
