<template>
   <ContentLayout>
      <AppTable :rows="items" :headers="headers" :loading="isLoading">
         <template #toolbar>
            <span style="font-weight: 600; font-size: 0.95rem; flex: 1">
               Категории
            </span>
            <!-- <InputUi
               v-model="search"
               placeholder="Поиск..."
               style="width: 12rem"
            /> -->
            <RouterLink :to="{ name: 'admin-add-category' }">
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
import { getWarehouseCategory } from '@/services/nomenclature'
import type { WarehouseCategory } from '@/types/warehouseCategory'
import { computed, onMounted, ref } from 'vue'

const categories = ref<WarehouseCategory[]>([])

const isLoading = ref(false)

const headers: TableHeader[] = [
   { valueKey: 'name', title: 'Название' },
   { valueKey: 'parentName', title: 'Родительская категория' },
]

const items = computed<Record<string, unknown>[]>(() => {
   if (categories.value) {
      return categories.value.flatMap((p) => {
         return {
            ...p,
            parentName: categories.value.find((c) => c.id == p.parent_id)?.name,
         }
      }) as Record<string, unknown>[]
   }
   return [] as Record<string, unknown>[]
})

async function load() {
   isLoading.value = true
   categories.value = await getWarehouseCategory()
   isLoading.value = false
}

onMounted(async () => {
   await load()
})
</script>

<style scoped></style>
