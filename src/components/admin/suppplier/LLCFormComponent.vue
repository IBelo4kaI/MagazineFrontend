<template>
   <!-- ООО -->
   <section class="section">
      <div class="fields">
         <div class="grid" style="--cols: 3">
            <InputUi
               label="ИНН"
               :model-value="store.llcDetails.inn"
               :error="store.llcErrors.inn"
               @update:model-value="(v) => store.setDetail('inn', v)"
               @blur="store.touchDetail('inn')"
            />
            <InputUi
               label="КПП"
               :model-value="store.llcDetails.kpp"
               :error="store.llcErrors.kpp"
               @update:model-value="(v) => store.setDetail('kpp', v)"
               @blur="store.touchDetail('kpp')"
            />
            <InputUi
               label="ОГРН"
               :model-value="store.llcDetails.ogrn"
               :error="store.llcErrors.ogrn"
               @update:model-value="(v) => store.setDetail('ogrn', v)"
               @blur="store.touchDetail('ogrn')"
            />
            <InputUi
               label="Дата регистрации"
               type="date"
               :model-value="store.llcDetails.date_register"
               @update:model-value="(v) => store.setDetail('date_register', v)"
            />
         </div>

         <div class="subgroup" v-if="!props.short">
            <p class="label">
               <i class="fa-regular fa-code-branch" />
               Коды и классификаторы
            </p>
            <div class="grid" style="--cols: 3">
               <InputUi
                  label="ОКПО"
                  :model-value="store.llcDetails.okpo"
                  @update:model-value="(v) => store.setDetail('okpo', v)"
               />
               <InputUi
                  label="ОКОГУ"
                  :model-value="store.llcDetails.okogu"
                  @update:model-value="(v) => store.setDetail('okogu', v)"
               />
               <InputUi
                  label="ОКАТО"
                  :model-value="store.llcDetails.okato"
                  @update:model-value="(v) => store.setDetail('okato', v)"
               />
               <InputUi
                  label="ОКТМО"
                  :model-value="store.llcDetails.oktmo"
                  @update:model-value="(v) => store.setDetail('oktmo', v)"
               />
               <InputUi
                  label="ОКФС"
                  :model-value="store.llcDetails.okfs"
                  @update:model-value="(v) => store.setDetail('okfs', v)"
               />
               <InputUi
                  label="ОКОПФ"
                  :model-value="store.llcDetails.okopf"
                  @update:model-value="(v) => store.setDetail('okopf', v)"
               />
            </div>
            <div class="grid" style="--cols: 2">
               <InputUi
                  label="ОКВЭД"
                  :model-value="store.llcDetails.okved"
                  @update:model-value="(v) => store.setDetail('okved', v)"
               />
               <InputUi
                  label="Система налогообложения"
                  :model-value="store.llcDetails.tax_system"
                  @update:model-value="(v) => store.setDetail('tax_system', v)"
               />
            </div>
         </div>

         <div class="subgroup">
            <p class="label">
               <i class="fa-regular fa-location-dot" />
               Адреса
            </p>
            <InputUi
               label="Юридический адрес"
               :model-value="store.llcDetails.legal_address"
               :error="store.llcErrors.legal_address"
               @update:model-value="(v) => store.setDetail('legal_address', v)"
               @blur="store.touchDetail('legal_address')"
            />
            <InputUi
               label="Фактический адрес"
               :model-value="store.llcDetails.actual_address"
               :error="store.llcErrors.actual_address"
               @update:model-value="(v) => store.setDetail('actual_address', v)"
               @blur="store.touchDetail('actual_address')"
            />
            <InputUi
               label="Почтовый адрес"
               :model-value="store.llcDetails.postal_address"
               :error="store.llcErrors.postal_address"
               @update:model-value="(v) => store.setDetail('postal_address', v)"
               @blur="store.touchDetail('postal_address')"
            />
         </div>

         <div class="subgroup">
            <p class="label">
               <i class="fa-regular fa-user-tie" />
               Руководитель
            </p>
            <div class="grid" style="--cols: 2">
               <Autocomplete
                  label="Директор"
                  :options="store.personsOptions"
                  :model-value="store.llcDetails.director_person_id"
                  label-key="full_name"
                  value-key="id"
                  :error="store.llcErrors.director_person_id"
                  :loading="store.personsLoading"
                  @update:model-value="
                     (v) => store.setDetail('director_person_id', v)
                  "
                  @blur="store.touchDetail('director_person_id')"
                  @focus="async () => await store.searchPersons()"
                  @create="createPerson"
               />
               <InputUi
                  label="Основание полномочий"
                  :model-value="store.llcDetails.director_basis"
                  @update:model-value="
                     (v) => store.setDetail('director_basis', v)
                  "
               />
            </div>
         </div>
      </div>
   </section>
</template>

<script lang="ts" setup>
import Autocomplete from '@/components/Autocomplete.vue'
import InputUi from '@/components/InputUi.vue'
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

function createPerson() {
   router.push({
      name: 'admin-add-person',
      query: { redirect: route.fullPath },
   })
}
</script>

<style scoped></style>
