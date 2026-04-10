import { useForm } from '@/composables/useForm'
import type {
   CounterpartyType,
   IPDetailForm,
   LLCDetailForm,
   PhysicDetailForm,
} from '@/forms/counterparty/schema'
import {
   counterpartyFormSchema,
   ipDetailSchema,
   llcDetailSchema,
   physicDetailSchema,
} from '@/forms/counterparty/schema'
import type { EmployeeForm } from '@/forms/employee/schema'
import { physicDetailSchema as employeeFormSchema } from '@/forms/employee/schema'
import type { PersonForm } from '@/forms/person/schema'
import { personFormSchema } from '@/forms/person/schema'
import {
   createCounterparty,
   createIPDetails,
   createLLCDetails,
   createPhysicDetails,
   getCounterparties,
   getCounterpartyDetails,
} from '@/services/counterparty'
import { getPersons } from '@/services/person'
import { createSupplier } from '@/services/supplier'
import type { Counterparty, Person } from '@/types/counterparty'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// ─── Helper ────────────────────────────────────────────────────────────────────
//
// FormErrors<T> = Record<keyof T, string | null>
// InputUi / Autocomplete принимают error: string | undefined
// Конвертируем весь объект ошибок один раз при экспорте из стора.

type NullToUndef<T> = { [K in keyof T]: string | undefined }

function nullToUndef<T extends object>(
   errors: Record<keyof T, string | null>
): NullToUndef<T> {
   return Object.fromEntries(
      Object.entries(errors).map(([k, v]) => [k, v ?? undefined])
   ) as NullToUndef<T>
}

// ─── Store ─────────────────────────────────────────────────────────────────────

export const useCreateCounterpartyStore = defineStore(
   'create-counterparty',
   () => {
      // ─── Reference data ────────────────────────────────────────────────────────

      const counterpartyOptions = ref<Counterparty[]>([])
      const counterpartyLoading = ref(false)

      // const ipDetailsOptions = ref<IPDetails[]>([])
      // const ipDetailsLoading = ref(false)

      const personsOptions = ref<Person[]>([])
      const personsLoading = ref(false)
      const isLoading = ref(false)

      async function searchCounterparty(query?: string) {
         counterpartyLoading.value = true
         counterpartyOptions.value = await getCounterparties(query)
         counterpartyLoading.value = false
      }

      // async function searchIpDetails(query?: string) {
      //    ipDetailsLoading.value = true
      //    ipDetailsOptions.value = await getIPDetails()
      //    ipDetailsLoading.value = false
      // }

      async function searchPersons(query?: string) {
         personsLoading.value = true
         personsOptions.value = await getPersons(query)
         personsLoading.value = false
      }

      async function load() {
         isLoading.value = true
         await searchCounterparty()
         await searchPersons()
         isLoading.value = false
      }

      // ─── Forms ─────────────────────────────────────────────────────────────────

      const form = useForm({
         schema: counterpartyFormSchema,
         onSubmit: async () => {},
      })

      const llcForm = useForm({
         schema: llcDetailSchema,
         onSubmit: async () => {},
      })
      const ipForm = useForm({
         schema: ipDetailSchema,
         onSubmit: async () => {},
      })
      const physicForm = useForm({
         schema: physicDetailSchema,
         onSubmit: async () => {},
      })

      const personForm = useForm({
         schema: personFormSchema,
         onSubmit: async () => {},
      })

      const employeeForm = useForm({
         schema: employeeFormSchema,
         onSubmit: async () => {},
      })

      // ─── Typed per-form accessors ──────────────────────────────────────────────

      const llcDetails = computed(() => llcForm.values.value)
      const llcErrors = computed(() =>
         nullToUndef<LLCDetailForm>(llcForm.errors.value)
      )

      const ipDetails = computed(() => ipForm.values.value)
      const ipErrors = computed(() =>
         nullToUndef<IPDetailForm>(ipForm.errors.value)
      )

      const physicDetails = computed(() => physicForm.values.value)
      const physicErrors = computed(() =>
         nullToUndef<PhysicDetailForm>(physicForm.errors.value)
      )

      const personDetails = computed(() => personForm.values.value)
      const personErrors = computed(() =>
         nullToUndef<PersonForm>(personForm.errors.value)
      )

      const employeeDetails = computed(() => employeeForm.values.value)
      const employeeErrors = computed(() =>
         nullToUndef<EmployeeForm>(employeeForm.errors.value)
      )

      // base form errors тоже конвертируем
      const errors = computed(() => nullToUndef(form.errors.value))

      // ─── setDetail / touchDetail ───────────────────────────────────────────────

      function setDetail(key: string, value: unknown): void {
         const t = form.values.value.type
         if (t === 'LLC')
            llcForm.set(key as keyof LLCDetailForm, value as never)
         else if (t === 'IP')
            ipForm.set(key as keyof IPDetailForm, value as never)
         else physicForm.set(key as keyof PhysicDetailForm, value as never)
      }

      function touchDetail(key: string): void {
         const t = form.values.value.type
         if (t === 'LLC') llcForm.touch(key as keyof LLCDetailForm)
         else if (t === 'IP') ipForm.touch(key as keyof IPDetailForm)
         else physicForm.touch(key as keyof PhysicDetailForm)
      }

      // ─── setPerson / touchPerson ───────────────────────────────────────────────

      function setPerson(key: string, value: unknown): void {
         personForm.set(key as keyof PersonForm, value as never)
      }

      function touchPerson(key: string): void {
         personForm.touch(key as keyof PersonForm)
      }

      // ─── setEmployee / touchEmployee ───────────────────────────────────────────

      function setEmployee(key: string, value: unknown): void {
         employeeForm.set(key as keyof EmployeeForm, value as never)
      }

      function touchEmployee(key: string): void {
         employeeForm.touch(key as keyof EmployeeForm)
      }

      // ─── Type switch ───────────────────────────────────────────────────────────

      function setType(type: CounterpartyType) {
         console.log(type)

         form.set('type', type)
      }

      // ─── Combined validity ─────────────────────────────────────────────────────

      const isValid = computed(() => {
         const t = form.values.value.type
         const detailValid =
            t === 'LLC'
               ? llcForm.isValid.value
               : t === 'IP'
                 ? ipForm.isValid.value
                 : physicForm.isValid.value
         return form.isValid.value && detailValid
      })

      const isSubmitting = ref(false)

      // ─── touchAll ─────────────────────────────────────────────────────────────

      function touchAll() {
         form.touchAll()
         const t = form.values.value.type
         if (t === 'LLC') llcForm.touchAll()
         else if (t === 'IP') ipForm.touchAll()
         else physicForm.touchAll()
      }

      // ─── Submit ────────────────────────────────────────────────────────────────

      async function submit() {
         touchAll()
         if (!isValid.value) return

         isLoading.value = true
         isSubmitting.value = true

         try {
            const counterparty = counterpartyOptions.value.find(
               (c) => c.full_name == form.values.value.full_name
            )

            if (counterparty) {
               await createSupplier({ counterpartiesId: counterparty?.id })
            } else {
               const { id } = await createCounterparty(form.values.value)
               const t = form.values.value.type

               if (t === 'LLC') {
                  await createLLCDetails({
                     ...llcForm.values.value,
                     counterparties_id: id,
                  })
               } else if (t === 'IP') {
                  await createIPDetails({
                     ...ipForm.values.value,
                     counterparty_id: id,
                  })
               } else {
                  await createPhysicDetails({
                     ...physicForm.values.value,
                     counterparty_id: id,
                  })
               }
            }
         } finally {
            isLoading.value = false
            isSubmitting.value = false
         }
      }

      // ─── Reset ─────────────────────────────────────────────────────────────────

      function reset() {
         form.reset()
         llcForm.reset()
         ipForm.reset()
         physicForm.reset()
         personForm.reset()
         employeeForm.reset()
      }

      return {
         isLoading,
         isSubmitting,
         counterpartyOptions,
         counterpartyLoading,
         searchCounterparty,
         personsOptions,
         personsLoading,
         searchPersons,
         load,
         // base form
         values: form.values,
         errors,
         set: form.set,
         touch: form.touch,
         // typed detail accessors (string | null → string | undefined)
         llcDetails,
         llcErrors,
         ipDetails,
         ipErrors,
         physicDetails,
         physicErrors,
         // person form
         personDetails,
         personErrors,
         setPerson,
         touchPerson,
         // employee form
         employeeDetails,
         employeeErrors,
         setEmployee,
         touchEmployee,
         // generic routing
         setDetail,
         touchDetail,
         // actions
         setType,
         touchAll,
         submit,
         reset,
         isValid,
      }
   }
)
