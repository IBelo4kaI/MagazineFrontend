<template>
   <ContentLayout max-width="70rem">
      <div class="page-header">
         <ButtonUi
            type="inline"
            icon="fa-regular fa-chevron-left"
            @click="goBack"
         >
            Назад
         </ButtonUi>
         <div class="page-header__title">
            <span class="label-muted">Создание поставщика</span>
            <h1>Новый поставщик</h1>
         </div>
      </div>

      <AddSupplierComponent :submit="onSuccess" :on-cancel="goBack" />
   </ContentLayout>
</template>

<script lang="ts" setup>
import AddSupplierComponent from '@/components/admin/suppplier/AddSupplierComponent.vue'
import ButtonUi from '@/components/ButtonUI.vue'
import ContentLayout from '@/layouts/ContentLayout.vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

async function goBack() {
   const redirect = route.query.redirect as string | undefined
   if (redirect) {
      router.push(redirect)
   } else {
      router.push({ name: 'admin-counterparties' })
   }
}

async function onSuccess() {
   goBack()
}
</script>

<style scoped></style>
