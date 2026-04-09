<template>
   <div class="form">
      <div class="loading" v-if="store.isLoading">
         <i class="fa-regular fa-spin fa-user"></i>
      </div>

      <!-- ФИО -->
      <section class="section">
         <div class="head">
            <span class="icon">
               <i class="fa-regular fa-user" />
            </span>
            <div>
               <h2>Физическое лицо</h2>
               <p>Основные данные персоны</p>
            </div>
         </div>
         <div class="fields">
            <div class="grid" style="--cols: 3">
               <InputUi
                  label="Фамилия"
                  :model-value="store.values.last_naem"
                  :error="err('last_naem')"
                  @update:model-value="(v) => field('last_naem', v)"
                  @blur="store.touch('last_naem')"
               />
               <InputUi
                  label="Имя"
                  :model-value="store.values.name"
                  :error="err('name')"
                  @update:model-value="(v) => field('name', v)"
                  @blur="store.touch('name')"
               />
               <InputUi
                  label="Отчество"
                  :model-value="store.values.middle_name"
                  @update:model-value="(v) => field('middle_name', v)"
               />
            </div>
         </div>
      </section>

      <hr />

      <!-- Контакты -->
      <section class="section">
         <div class="head">
            <span class="icon icon--accent">
               <i class="fa-regular fa-address-book" />
            </span>
            <div>
               <h2>Контактные данные</h2>
               <p>Телефон, email и дата рождения</p>
            </div>
         </div>
         <div class="fields">
            <div class="grid" style="--cols: 3">
               <InputUi
                  label="Телефон"
                  :model-value="store.values.phone_personal"
                  @update:model-value="(v) => field('phone_personal', v)"
               />
               <InputUi
                  label="Email"
                  :model-value="store.values.email_personal"
                  @update:model-value="(v) => field('email_personal', v)"
               />
               <InputUi
                  label="Дата рождения"
                  type="date"
                  :model-value="store.values.birth_date"
                  @update:model-value="(v) => field('birth_date', v)"
               />
            </div>
         </div>
      </section>

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
               Добавить физ. лицо
            </ButtonUI>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import ButtonUI from '@/components/ButtonUI.vue'
import InputUi from '@/components/InputUi.vue'
import type { PersonForm } from '@/forms/person/schema'
import { useCreatePersonStore } from '@/stores/admin/addPerson'

const props = withDefaults(
   defineProps<{
      onSubmit?: (val: PersonForm) => Promise<void>
      onCancel?: () => Promise<void>
   }>(),
   {}
)

const store = useCreatePersonStore()

const err = (key: keyof PersonForm): string | undefined =>
   store.errors[key] ?? undefined

function field<K extends keyof PersonForm>(key: K, v: unknown) {
   store.set(key, v as PersonForm[K])
}

const onSubmit = async () => {
   store.touchAll()
   if (!store.isValid) return
   await store.submit()
   if (props.onSubmit) await props.onSubmit(store.values)
   store.reset()
}

const onCancel = async () => {
   if (props.onCancel) await props.onCancel()
   store.reset()
}
</script>

<style scoped>
/* Common form styles are imported from assets/form-styles.css */
</style>
