import type { FormSchema } from '@/composables/useForm'

export interface WarehouseCategoryForm {
   name: string
   parent_id: string
}

// ─── Schema ───────────────────────────────────────────────────────────────────

export const warehouseCategoryFormSchema: FormSchema<WarehouseCategoryForm> = {
   name: { initial: '' },
   parent_id: { initial: '' },
}
