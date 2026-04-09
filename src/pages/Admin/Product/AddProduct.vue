<template>
   <ContentLayout max-width="70rem">
      <div class="page-header">
         <ButtonUI
            type="inline"
            icon="fa-regular fa-chevron-left"
            @click="router.back()"
         >
            Назад
         </ButtonUI>
         <div class="page-header__title">
            <span class="label-muted">Создание товара</span>
            <h1>Новый товар</h1>
         </div>
      </div>

      <AddProductComponent :on-submit="onSuccess" :on-cancel="goBack" />
   </ContentLayout>
</template>

<script lang="ts" setup>
import AddProductComponent from '@/components/admin/AddProductComponent.vue'
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
