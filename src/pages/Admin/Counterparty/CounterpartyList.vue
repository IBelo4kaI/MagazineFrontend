<template>
   <ContentLayout>
      <AppTable
         :clickable="true"
         :headers="headers"
         :rows="items"
         :loading="isLoading"
      >
         <template #toolbar>
            <span style="font-weight: 600; font-size: 0.95rem; flex: 1">
               Поставщики
            </span>
            <RouterLink :to="{ name: 'admin-add-counterparty' }">
               <ButtonUI icon="fa-regular fa-plus">Добавить</ButtonUI>
            </RouterLink>
         </template>
         <template #cell-type="{ value }">
            {{ getType(value as CounterpartyType) }}
         </template>
         <template #cell-is_internal="{ value }">
            {{ value == true ? 'да' : 'нет' }}
         </template>
      </AppTable>
   </ContentLayout>
</template>

<script lang="ts" setup>
import AppTable, { type TableHeader } from '@/components/AppTable.vue'
import ButtonUI from '@/components/ButtonUI.vue'
import ContentLayout from '@/layouts/ContentLayout.vue'
import { getCounterparties } from '@/services/counterparty'
import { getSuppliers } from '@/services/supplier'
import type { Counterparty, CounterpartyType } from '@/types/counterparty'
import type { Supplier } from '@/types/supplier'
import { computed, onMounted, ref } from 'vue'

const counterparties = ref<Counterparty[]>([])
const suppliers = ref<Supplier[]>([])

const isLoading = ref(false)

const items = computed<Record<string, unknown>[]>(() => {
   if (suppliers.value) {
      return suppliers.value.flatMap((s) => {
         return {
            ...s,
            ...counterparties.value.find((c) => c.id == s.counterpartiesId),
         }
      }) as Record<string, unknown>[]
   }
   return [] as Record<string, unknown>[]
})

const headers: TableHeader[] = [
   { valueKey: 'type', title: 'Тип', align: 'left' },
   { valueKey: 'short_name', title: 'Краткое наименование' },
   { valueKey: 'full_name', title: 'Полное наименование' },
   { valueKey: 'is_internal', title: 'Внутренняя компания', align: 'right' },
]

const rows = ref<Counterparty[]>([])

const getType = (type: CounterpartyType) => {
   switch (type) {
      case 'IP':
         return 'ИП'
      case 'LLC':
         return 'ООО'
      case 'PHYSIC':
         return 'Физ. лицо'
   }
}

async function load() {
   isLoading.value = true
   counterparties.value = await getCounterparties()
   suppliers.value = await getSuppliers()
   isLoading.value = false
}

onMounted(async () => {
   isLoading.value = true
   await load()
   isLoading.value = false
})
</script>

<style scoped></style>
