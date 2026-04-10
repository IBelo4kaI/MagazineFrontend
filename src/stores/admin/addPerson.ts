import { useForm } from '@/composables/useForm'
import { personFormSchema } from '@/forms/person/schema'
import { createPerson } from '@/services/person'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
