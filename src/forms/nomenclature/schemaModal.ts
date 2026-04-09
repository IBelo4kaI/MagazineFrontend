import { validators } from '@/composables/useForm'
import type { FormSchema } from '@/composables/useForm'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NomenclatureModalForm {
   // nomenclature
   name: string
   warehouseCategoryId: string
   unitId: string
}

// ─── Schema ───────────────────────────────────────────────────────────────────

export const nomenclatureFormModalSchema: FormSchema<NomenclatureModalForm> = {
   name: {
      initial: '',
      validators: [validators.required('Укажите наименование')],
   },
   warehouseCategoryId: {
      initial: '',
      validators: [validators.required('Выберите категорию')],
   },
   unitId: {
      initial: '',
      validators: [validators.required('Выберите единицу измерения')],
   },
}
