import { useForm } from '@/composables/useForm'
import { personFormSchema } from '@/forms/person/schema'
import type { PersonForm } from '@/forms/person/schema'
import { createPerson } from '@/services/person'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// ─── Helper ───────────────────────────────────────────────────────────────────

type NullToUndef<T> = { [K in keyof T]: string | undefined }

function nullToUndef<T extends object>(
   errors: Record<keyof T, string | null>
): NullToUndef<T> {
   return Object.fromEntries(
      Object.entries(errors).map(([k, v]) => [k, v ?? undefined])
   ) as NullToUndef<T>
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCreatePersonStore = defineStore('create-person', () => {
   const isLoading = ref(false)

   // ─── Form ─────────────────────────────────────────────────────────────────

   const form = useForm({
      schema: personFormSchema,
      onSubmit: async () => {
         isLoading.value = true

         try {
            await createPerson(form.values.value)
         } catch (e) {
            throw e
         } finally {
            isLoading.value = false
         }
      },
   })

   return {
      isLoading,
      // form
      ...form,
   }
})
