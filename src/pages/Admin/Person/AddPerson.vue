<template>
   <ContentLayout>
      <div class="page-header">
         <ButtonUI
            type="inline"
            icon="fa-regular fa-chevron-left"
            @click="router.back()"
         >
            Назад
         </ButtonUI>
         <div class="page-header__title">
            <span class="label-muted">Создание персоны</span>
            <h1>Новое физическое лицо</h1>
         </div>
      </div>

      <AddPersonComponent :on-submit="onSuccess" :on-cancel="goBack" />
   </ContentLayout>
</template>

<script lang="ts" setup>
import AddPersonComponent from '@/components/admin/AddPersonComponent.vue'
import ButtonUI from '@/components/ButtonUI.vue'
import ContentLayout from '@/layouts/ContentLayout.vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

async function goBack() {
   const redirect = route.query.redirect as string | undefined
   if (redirect) {
      router.push(redirect)
   } else {
      router.back()
   }
}

async function onSuccess() {
   goBack()
}
</script>

<style scoped></style>
