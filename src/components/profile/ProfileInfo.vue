<template>
   <div class="page-title">Личные данные</div>
   <div class="info-grid">
      <InputUi v-model="draft.name" label="Фамилия" />
      <InputUi v-model="draft.name" label="Имя" />
      <InputUi v-model="draft.name" label="Отчество" />
      <InputUi v-model="draft.phone" label="Телефон" />
      <InputUi :model-value="userStore.user.email" label="Email" disabled />
      <InputUi v-model="draft.address" label="Адрес" />
   </div>
   <ButtonUI type="muted-accent" style="width: fit-content" @click="save">
      Сохранить изменения
   </ButtonUI>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import InputUi from '@/components/InputUi.vue'
import ButtonUI from '@/components/ButtonUI.vue'
import { useUserStore } from '@/stores/user'
import { useProfileStore } from '@/stores/profile'

const userStore = useUserStore()
const profileStore = useProfileStore()

const draft = reactive({ ...profileStore.personal })

function save() {
   profileStore.updatePersonal({ ...draft })
}
</script>

<style scoped>
.page-title {
   font-size: 1.4rem;
   font-weight: 700;
}
.info-grid {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
   gap: var(--gap-primary);
}
.info-field {
   display: flex;
   flex-direction: column;
}
.info-field__label {
   font-size: 0.8rem;
   color: var(--muted-text);
   margin-bottom: var(--gap-secondary);
}
</style>
