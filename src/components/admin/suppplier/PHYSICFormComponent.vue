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
import { getPersonByINN } from '@/services/checko'
import { useCreateCounterpartyStore } from '@/stores/admin/addCounterparty'
import { useRoute, useRouter } from 'vue-router'

const store = useCreateCounterpartyStore()

const router = useRouter()
const route = useRoute()

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
   }
}

function createPerson() {
   router.push({
      name: 'admin-add-person',
      query: { redirect: route.fullPath },
   })
}
</script>

<style scoped></style>
