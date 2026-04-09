import { validators } from '@/composables/useForm'
import type { FormSchema } from '@/composables/useForm'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NomenclatureForm {
   // nomenclature
   name: string
   warehouseCategoryId: string
   unitId: string
   article: string | null
   description: string | null
   length: number | null
   width: number | null
   height: number | null
   weight: number | null
   // product
   purchasePrice: number
   wholesalePrice: number
   retailPrice: number
}

// ─── Schema ───────────────────────────────────────────────────────────────────

export const nomenclatureFormSchema: FormSchema<NomenclatureForm> = {
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
   article: { initial: null },
   description: { initial: null },
   length: { initial: null },
   width: { initial: null },
   height: { initial: null },
   weight: { initial: null },
   purchasePrice: {
      initial: 0,
      validators: [validators.min(0, 'Цена не может быть отрицательной')],
   },
   wholesalePrice: {
      initial: 0,
      validators: [
         validators.min(0, 'Цена не может быть отрицательной'),
         validators.gte<NomenclatureForm>(
            'purchasePrice',
            'Оптовая цена ниже закупочной'
         ),
      ],
   },
   retailPrice: {
      initial: 0,
      validators: [
         validators.min(0, 'Цена не может быть отрицательной'),
         validators.gte<NomenclatureForm>(
            'wholesalePrice',
            'Розничная цена ниже оптовой'
         ),
      ],
   },
}
