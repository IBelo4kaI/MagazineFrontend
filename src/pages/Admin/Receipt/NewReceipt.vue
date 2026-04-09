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
            <span class="label-muted">Создание поступления</span>
            <h1>Новое поступление</h1>
         </div>
      </div>

      <AddReceiptComponent />
      <!-- <AppStepper
         :steps="[
            { label: 'Основное', icon: 'fa-regular fa-circle-1' },
            { label: 'Товары', icon: 'fa-regular fa-circle-2' },
            { label: 'Проверка', icon: 'fa-regular fa-circle-3' },
         ]"
         clickable
         :block-complete-action="!store.isValid"
         @completed="store.submit"
      >
         <template #step-0><StepSelectSupplier /></template>
         <template #step-1><StepAddProducts /></template>
         <template #step-2><StepInfoLast /></template>
      </AppStepper> -->
      <!-- <div class="form new-receipt">
         <StepSelectSupplier />
         <StepAddProducts />
         <StepInfoLast />
      </div> -->
   </ContentLayout>
</template>

<script lang="ts" setup>
import AddReceiptComponent from '@/components/admin/AddReceiptComponent.vue'
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

<style scoped>
.new-receipt {
   display: flex;
   flex-direction: column;
   gap: var(--padding-primary);
   padding: var(--padding-primary);
   background: var(--foreground);
   border-radius: var(--border-radius);
}
</style>
