import { computed, ref, type Ref } from 'vue'

// ─── Types ────────────────────────────────────────────────────────────────────

type ValidatorFn<T, V> = (value: V, state: T) => string | null

export interface FieldSchema<T, V = unknown> {
   initial: V
   validators?: ValidatorFn<T, V>[]
}

export type FormSchema<T> = {
   [K in keyof T]: FieldSchema<T, T[K]>
}

export type FormErrors<T> = Record<keyof T, string | null>

// ─── Built-in validators ──────────────────────────────────────────────────────

export const validators = {
   required:
      (msg = 'Обязательное поле') =>
      (v: unknown) =>
         v === null || v === undefined || v === '' ? msg : null,

   min: (min: number, msg?: string) => (v: number) =>
      v < min ? (msg ?? `Минимум ${min}`) : null,

   max: (max: number, msg?: string) => (v: number) =>
      v > max ? (msg ?? `Максимум ${max}`) : null,

   minLength: (min: number, msg?: string) => (v: string) =>
      v.length < min ? (msg ?? `Минимум ${min} символов`) : null,

   maxLength: (max: number, msg?: string) => (v: string) =>
      v.length > max ? (msg ?? `Максимум ${max} символов`) : null,

   pattern:
      (re: RegExp, msg = 'Неверный формат') =>
      (v: string) =>
         re.test(v) ? null : msg,

   /** Cross-field: значение должно быть <= другому полю */
   lte:
      <T>(otherKey: keyof T, msg: string) =>
      (v: number, state: T) => {
         const other = state[otherKey]
         if (other == null) return null
         return v > (other as number) ? msg : null
      },

   /** Cross-field: значение должно быть >= другому полю */
   gte:
      <T>(otherKey: keyof T, msg: string) =>
      (v: number, state: T) => {
         const other = state[otherKey]
         if (other == null) return null
         return v < (other as number) ? msg : null
      },
}

// ─── useForm ──────────────────────────────────────────────────────────────────

export interface UseFormOptions<T> {
   schema: FormSchema<T>
   onSubmit: (values: T) => Promise<void>
   /** Вызывается после set() — не вызывается при setMany() */
   onAfterSet?: (key: keyof T, value: unknown) => void
}

export function useForm<T extends object>(options: UseFormOptions<T>) {
   const { schema, onSubmit, onAfterSet } = options

   const initialValues = (): T =>
      Object.fromEntries(
         Object.entries(schema).map(([k, f]) => [
            k,
            (f as FieldSchema<T>).initial,
         ])
      ) as T

   const values: Ref<T> = ref(initialValues()) as Ref<T>
   const touched = ref<Partial<Record<keyof T, boolean>>>({})
   const isSubmitting = ref(false)
   const submitError = ref<string | null>(null)
   const isDirty = ref(false)

   function validateField(key: keyof T): string | null {
      const field = schema[key]
      if (!field.validators) return null
      for (const fn of field.validators) {
         const error = (fn as ValidatorFn<T, unknown>)(
            values.value[key],
            values.value
         )
         if (error) return error
      }
      return null
   }

   const errors = computed<FormErrors<T>>(() => {
      const result = {} as FormErrors<T>
      for (const key in schema) {
         result[key] = touched.value[key] ? validateField(key) : null
      }
      return result
   })

   function validateAll(): FormErrors<T> {
      const result = {} as FormErrors<T>
      for (const key in schema) result[key] = validateField(key)
      return result
   }

   const isValid = computed(() => !Object.values(validateAll()).some(Boolean))

   /** Обновить одно поле. Вызывает onAfterSet. */
   function set<K extends keyof T>(key: K, value: T[K]) {
      values.value[key] = value
      isDirty.value = true
      onAfterSet?.(key, value)
   }

   /** Обновить несколько полей без вызова onAfterSet. */
   function setMany(fields: Partial<T>) {
      for (const key in fields) {
         values.value[key as keyof T] = fields[key as keyof T] as T[keyof T]
      }
      isDirty.value = true
   }

   function touch(key: keyof T) {
      touched.value[key] = true
   }

   function touchAll() {
      for (const key in schema) touched.value[key] = true
   }

   function reset() {
      values.value = initialValues()
      touched.value = {}
      isDirty.value = false
      submitError.value = null
   }

   async function submit() {
      touchAll()
      if (!isValid.value) return
      isSubmitting.value = true
      submitError.value = null
      try {
         await onSubmit(values.value)
         isDirty.value = false
      } catch (e) {
         submitError.value =
            e instanceof Error ? e.message : 'Неизвестная ошибка'
      } finally {
         isSubmitting.value = false
      }
   }

   return {
      values,
      errors,
      touched,
      isValid,
      isDirty,
      isSubmitting,
      submitError,
      set,
      setMany,
      touch,
      touchAll,
      reset,
      submit,
   }
}
