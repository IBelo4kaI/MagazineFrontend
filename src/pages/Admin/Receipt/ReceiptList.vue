<template>
   <ContentLayout>
      <AppTable :clickable="true" :headers="headers" :rows="rows">
         <template #toolbar>
            <span style="font-weight: 600; font-size: 0.95rem; flex: 1">
               Поступления
            </span>
            <RouterLink :to="{ name: 'admin-new-receipts' }">
               <ButtonUI icon="fa-regular fa-plus">Добавить</ButtonUI>
            </RouterLink>
         </template>
      </AppTable>
   </ContentLayout>
</template>

<script lang="ts" setup>
import AppTable, { type TableHeader } from '@/components/AppTable.vue'
import ButtonUI from '@/components/ButtonUI.vue'
import ContentLayout from '@/layouts/ContentLayout.vue'
import { computed } from 'vue'

const headers: TableHeader[] = [
   { valueKey: 'number', title: 'Номер', align: 'left' },
   { valueKey: 'supplier.name', title: 'Поставщик' },
   { valueKey: 'date', title: 'Дата поступления' },
   { valueKey: 'countItems', title: 'Поступило товаров', align: 'right' },
]

const rows = computed(() => [
   {
      number: '98432',
      supplier: {
         name: 'ОЗОН',
      },
      date: '25-03-2026',
      countItems: 19,
   },
   {
      number: '98432',
      supplier: {
         name: 'ОЗОН',
      },
      date: '25-03-2026',
      countItems: 19,
   },
])
</script>

<style scoped></style>
