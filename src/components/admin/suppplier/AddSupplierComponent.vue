<template>
   <div class="form">
      <div class="loading" v-if="store.isLoading">
         <i class="fa-regular fa-spin fa-address-card"></i>
      </div>

      <!-- Тип контрагента -->
      <section class="section">
         <div class="head">
            <span class="icon">
               <i class="fa-regular fa-address-card" />
            </span>
            <div>
               <h2>Контрагент</h2>
               <p>Основные сведения и тип организации</p>
            </div>
         </div>
         <div class="fields">
            <div class="type-tabs">
               <button
                  v-for="tab in typeOptions"
                  :key="tab.value"
                  class="type-tab"
                  :class="{ active: store.values.type === tab.value }"
                  @click="store.setType(tab.value)"
                  type="button"
               >
                  <i :class="tab.icon" />
                  {{ tab.label }}
               </button>
            </div>

            <div class="grid" style="--cols: 2">
               <InputUi
                  label="Короткое наименование"
                  :model-value="store.values.short_name"
                  :error="err('short_name')"
                  @update:model-value="(v) => field('short_name', v)"
                  @blur="store.touch('short_name')"
               />
               <InputUi
                  label="Полное наименование"
                  :model-value="store.values.full_name"
                  :error="err('full_name')"
                  @update:model-value="(v) => field('full_name', v)"
                  @blur="store.touch('full_name')"
               />
            </div>
            <div class="grid" style="--cols: 2">
               <InputUi
                  label="Префикс договора"
                  :model-value="store.values.contract_prefix"
                  @update:model-value="(v) => field('contract_prefix', v)"
               />
               <div class="checkbox-field">
                  <label class="checkbox-label">
                     <input
                        type="checkbox"
                        class="checkbox"
                        :checked="store.values.is_internal"
                        @change="
                           (e: Event) =>
                              field(
                                 'is_internal',
                                 (e.target as HTMLInputElement).checked
                              )
                        "
                     />
                     <span class="checkbox-text">
                        <span class="checkbox-title">
                           Внутренний контрагент
                        </span>
                        <span class="checkbox-hint">
                           Входит в структуру компании
                        </span>
                     </span>
                  </label>
               </div>
            </div>
         </div>
      </section>

      <IPFormComponent v-if="store.values.type === 'IP'" />
      <LLCFormComponent v-if="store.values.type === 'LLC'" />
      <PHYSICFormComponent v-if="store.values.type === 'PHYSIC'" />

      <!-- Действия -->
      <div class="section">
         <div class="grid" style="--cols: 2">
            <ButtonUI type="muted" @click="onCancel">Отмена</ButtonUI>
            <ButtonUI
               type="accent"
               icon="fa-regular fa-plus"
               @click="onSubmit"
               :disabled="store.isSubmitting"
            >
               Добавить поставщика
            </ButtonUI>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import ButtonUI from '@/components/ButtonUI.vue'
import InputUi from '@/components/InputUi.vue'
import type { CounterpartyForm } from '@/forms/counterparty/schema'
import { useCreateCounterpartyStore } from '@/stores/admin/addCounterparty'
import { onMounted } from 'vue'
import IPFormComponent from './IPFormComponent.vue'
import LLCFormComponent from './LLCFormComponent.vue'
import PHYSICFormComponent from './PHYSICFormComponent.vue'

const props = withDefaults(
   defineProps<{
      short?: boolean
      onSubmit?: (val: CounterpartyForm) => Promise<void>
      onCancel?: () => Promise<void>
   }>(),
   { short: false }
)

const store = useCreateCounterpartyStore()

const typeOptions = [
   { value: 'LLC' as const, label: 'ООО', icon: 'fa-regular fa-building' },
   { value: 'IP' as const, label: 'ИП', icon: 'fa-regular fa-briefcase' },
   { value: 'PHYSIC' as const, label: 'Физ. лицо', icon: 'fa-regular fa-user' },
]

const err = (key: keyof CounterpartyForm) => store.errors[key] ?? undefined

function field<K extends keyof CounterpartyForm>(key: K, v: unknown) {
   store.set(key, v as CounterpartyForm[K])
}

const onSubmit = async () => {
   await store.submit()
   store.touchAll()
   if (!store.isValid) return
   if (props.onSubmit) await props.onSubmit(store.values)
   store.reset()
}

const onCancel = async () => {
   if (props.onCancel) await props.onCancel()
   store.reset()
}

onMounted(async () => await store.load())
</script>

<style scoped></style>
