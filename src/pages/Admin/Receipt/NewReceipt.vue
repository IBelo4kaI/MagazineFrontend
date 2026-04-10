<template>
   <ContentLayout>
      <div class="page-header">
         <ButtonUI
            type="inline"
            icon="fa-regular fa-chevron-left"
            @click="goBack()"
         >
            Назад
         </ButtonUI>
         <div class="page-header__title">
            <span class="label-muted">Создание поступления</span>
            <h1>Приходная накладная №{{ newReceiptStore.values.num }}</h1>
         </div>
      </div>

      <AddReceiptComponent />
   </ContentLayout>
</template>

<script lang="ts" setup>
import AddReceiptComponent from '@/components/admin/AddReceiptComponent.vue'
import ButtonUI from '@/components/ButtonUI.vue'
import ContentLayout from '@/layouts/ContentLayout.vue'
import { getReceiptById } from '@/services/receipt'
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNewReceiptStore } from '../../../stores/admin/newReceipt'

const router = useRouter()
const route = useRoute()

const newReceiptStore = useNewReceiptStore()

async function goBack() {
   router.push({ name: 'admin-receipts' })
}

async function onSuccess() {
   goBack()
}

onMounted(async () => {
   const id = route.params['id']
   if (id) {
      const receipt = await getReceiptById(id as string)
      newReceiptStore.setReceipt(receipt)
   } else {
   }
})
onUnmounted(() => {
   newReceiptStore.reset()
})
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
