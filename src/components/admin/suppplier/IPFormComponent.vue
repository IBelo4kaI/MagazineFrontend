<template>
   <!-- ИП -->
   <section class="section">
      <div class="fields">
         <div class="grid" style="--cols: 3">
            <div class="field">
               <InputUi
                  label="ИНН"
                  :model-value="store.ipDetails.inn"
                  :error="store.ipErrors.inn"
                  @update:model-value="(v) => store.setDetail('inn', v)"
                  @blur="store.touchDetail('inn')"
               />
               <ButtonUI @click="fillInn">Заполнить</ButtonUI>
            </div>
            <InputUi
               label="ОГРНИП"
               :model-value="store.ipDetails.ogrnip"
               @update:model-value="(v) => store.setDetail('ogrnip', v)"
            />
            <InputUi
               label="Дата регистрации"
               type="date"
               :model-value="store.ipDetails.date_register"
               @update:model-value="(v) => store.setDetail('date_register', v)"
            />
         </div>

         <div class="subgroup" v-if="!props.short">
            <p class="label">
               <i class="fa-regular fa-code-branch" />
               Коды классификаторов
            </p>
            <div class="grid" style="--cols: 3">
               <InputUi
                  label="ОКПО"
                  :model-value="store.ipDetails.okpo"
                  @update:model-value="(v) => store.setDetail('okpo', v)"
               />
               <InputUi
                  label="ОКВЭД"
                  :model-value="store.ipDetails.okved"
                  @update:model-value="(v) => store.setDetail('okved', v)"
               />
               <InputUi
                  label="ОКОПФ"
                  :model-value="store.ipDetails.okopf"
                  @update:model-value="(v) => store.setDetail('okopf', v)"
               />
               <InputUi
                  label="ОКФС"
                  :model-value="store.ipDetails.okfs"
                  @update:model-value="(v) => store.setDetail('okfs', v)"
               />
               <InputUi
                  label="ОКОГУ"
                  :model-value="store.ipDetails.okogu"
                  @update:model-value="(v) => store.setDetail('okogu', v)"
               />
               <InputUi
                  label="ОКАТО"
                  :model-value="store.ipDetails.okato"
                  @update:model-value="(v) => store.setDetail('okato', v)"
               />
               <InputUi
                  label="ОКТМО"
                  :model-value="store.ipDetails.oktmo"
                  @update:model-value="(v) => store.setDetail('oktmo', v)"
               />
            </div>
         </div>

         <div class="subgroup">
            <p class="label">
               <i class="fa-regular fa-user" />
               Физическое лицо
            </p>
            <Autocomplete
               label="Связанное физ. лицо"
               :options="store.personsOptions"
               :model-value="store.ipDetails.person_id"
               label-key="full_name"
               value-key="id"
               :error="store.ipErrors.person_id"
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
import { getEntrepreneurByINN } from '@/services/checko'
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

// Checko returns dates as DD.MM.YYYY — convert to YYYY-MM-DD for <input type="date">
function parseCheckoDate(raw: string | null): string | null {
   if (!raw) return null
   const [day, month, year] = raw.split('.')
   if (!day || !month || !year) return null
   return `${year}-${month}-${day}`
}

async function fillInn() {
   if (!store.ipDetails.inn || store.ipErrors['inn']) return

   const res = await getEntrepreneurByINN(store.ipDetails.inn)
   if (res.meta.status !== 'ok') return

   const d = res.data

   const fields: Partial<Record<string, string | null>> = {
      ogrnip: d.ОГРНИП ?? null,
      okpo: d.ОКПО ?? null,
      okved: d.ОКВЭД ? `${d.ОКВЭД.Код} - ${d.ОКВЭД.Наим}` : null,
      okopf: d.ОКОПФ?.Код ?? null,
      okfs: d.ОКФС?.Код ?? null,
      okogu: d.ОКОГУ?.Код ?? null,
      okato: d.ОКАТО?.Код ?? null,
      oktmo: d.ОКТМО?.Код ?? null,
      date_register: parseCheckoDate(d.ДатаРег),
   }

   for (const [key, value] of Object.entries(fields)) {
      if (value !== null) store.setDetail(key, value)
   }

   if (d.ФИО) {
      const shortName = `${d.ТипСокр ?? 'ИП'} ${d.ФИО}`
      const fullName = `${d.Тип ?? 'Индивидуальный предприниматель'} ${d.ФИО}`
      store.set('short_name', shortName)
      store.set('full_name', fullName)
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
