<template>
   <!-- Физ. лицо -->
   <section class="section">
      <div class="fields">
         <div class="subgroup">
            <p class="label">
               <i class="fa-regular fa-id-card" />
               Паспортные данные
            </p>
            <div class="grid" style="--cols: 3">
               <InputUi
                  label="Серия"
                  :model-value="store.physicDetails.passport_series"
                  :error="store.physicErrors.passport_series"
                  @update:model-value="
                     (v) => store.setDetail('passport_series', v)
                  "
                  @blur="store.touchDetail('passport_series')"
               />
               <InputUi
                  label="Номер"
                  :model-value="store.physicDetails.passport_number"
                  :error="store.physicErrors.passport_number"
                  @update:model-value="
                     (v) => store.setDetail('passport_number', v)
                  "
                  @blur="store.touchDetail('passport_number')"
               />
               <InputUi
                  label="Код подразделения"
                  :model-value="store.physicDetails.department_code"
                  :error="store.physicErrors.department_code"
                  @update:model-value="
                     (v) => store.setDetail('department_code', v)
                  "
                  @blur="store.touchDetail('department_code')"
               />
            </div>
            <InputUi
               label="Кем выдан"
               :model-value="store.physicDetails.passport_issued_by"
               :error="store.physicErrors.passport_issued_by"
               @update:model-value="
                  (v) => store.setDetail('passport_issued_by', v)
               "
               @blur="store.touchDetail('passport_issued_by')"
            />
            <div class="grid" style="--cols: 2">
               <InputUi
                  label="Дата выдачи"
                  type="date"
                  :model-value="store.physicDetails.passport_date_issued"
                  :error="store.physicErrors.passport_date_issued"
                  @update:model-value="
                     (v) => store.setDetail('passport_date_issued', v)
                  "
                  @blur="store.touchDetail('passport_date_issued')"
               />
               <InputUi
                  label="Дата рождения"
                  type="date"
                  :model-value="store.physicDetails.passport_date"
                  :error="store.physicErrors.passport_date"
                  @update:model-value="
                     (v) => store.setDetail('passport_date', v)
                  "
                  @blur="store.touchDetail('passport_date')"
               />
            </div>
         </div>

         <div class="subgroup">
            <p class="label">
               <i class="fa-regular fa-location-dot" />
               Адреса и ИНН
            </p>
            <div class="field">
               <InputUi
                  label="ИНН"
                  :model-value="store.physicDetails.inn"
                  @update:model-value="(v) => store.setDetail('inn', v)"
               />
               <ButtonUI @click="fillInn">Заполнить</ButtonUI>
            </div>
            <div class="grid" style="--cols: 2">
               <InputUi
                  label="Адрес регистрации"
                  :model-value="store.physicDetails.address_registration"
                  :error="store.physicErrors.address_registration"
                  @update:model-value="
                     (v) => store.setDetail('address_registration', v)
                  "
                  @blur="store.touchDetail('address_registration')"
               />
               <InputUi
                  label="Адрес проживания"
                  :model-value="store.physicDetails.address_living"
                  :error="store.physicErrors.address_living"
                  @update:model-value="
                     (v) => store.setDetail('address_living', v)
                  "
                  @blur="store.touchDetail('address_living')"
               />
            </div>
         </div>

         <div class="subgroup">
            <p class="label">
               <i class="fa-regular fa-user-circle" />
               Связанное физ. лицо
            </p>
            <Autocomplete
               label="Физическое лицо"
               :options="store.personsOptions"
               :model-value="store.physicDetails.person_id"
               label-key="full_name"
               value-key="id"
               :error="store.physicErrors.person_id"
               :loading="store.personsLoading"
               @update:model-value="(v) => store.setDetail('person_id', v)"
               @blur="store.touchDetail('person_id')"
               @focus="async () => await store.searchPersons()"
               @create="createPerson"
            />
         </div>
      </div>
   </section>
</template>

<script lang="ts" setup>
import Autocomplete from '@/components/Autocomplete.vue'
import ButtonUI from '@/components/ButtonUI.vue'
import InputUi from '@/components/InputUi.vue'
import AddPersonModal from '@/components/modals/AddPersonModal.vue'
import { useModal } from '@/composables/useModal'
import { getPersonByINN } from '@/services/checko'
import { useCreateCounterpartyStore } from '@/stores/admin/addCounterparty'
import { useCreatePersonStore } from '@/stores/admin/addPerson'

const store = useCreateCounterpartyStore()

const props = withDefaults(
   defineProps<{
      short?: boolean
   }>(),
   { short: false }
)

async function fillInn() {
   if (!store.physicDetails.inn) return

   const res = await getPersonByINN(store.physicDetails.inn)
   if (res.meta.status !== 'ok') return

   const d = res.data
   if (d.ФИО) {
      store.set('short_name', d.ФИО)
      store.set('full_name', d.ФИО)

      if (store.personsOptions.length == 0) {
         await store.searchPersons()
      }
      const person = store.personsOptions.find((p) => p.full_name == d.ФИО)
      if (person) {
         store.setDetail('director_person_id', person.id)
      } else {
         const createPersonStore = useCreatePersonStore()
         const last_name = d.ФИО.split(' ')[0]
         const name = d.ФИО.split(' ')[1]
         const middle_name = d.ФИО.split(' ')[2]
         createPersonStore.setMany({
            last_naem: last_name,
            name: name,
            middle_name: middle_name,
         })
         await createPerson()
      }
   }
}

const { open } = useModal()

async function createPerson() {
   const result: string | undefined = await open<string>(AddPersonModal)

   console.log(result)

   if (result) {
      await store.searchPersons()
      store.setDetail('director_person_id', result)
   }
}
</script>

<style scoped></style>
