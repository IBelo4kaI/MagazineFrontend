<template>
   <ContentLayout>
      <AppTable
         :clickable="true"
         :headers="headers"
         :rows="rows"
         :loading="store.isLoading"
         @row-click="handleClick"
      >
         <template #toolbar>
            <span style="font-weight: 600; font-size: 0.95rem; flex: 1">
               Поступления
            </span>
            <ButtonUI icon="fa-regular fa-plus" @click="handleCreate">
               Добавить
            </ButtonUI>
            <ButtonUI
               type="icon"
               :icon="`fa-regular fa-arrows-rotate ${store.isLoading && 'fa-spin'}`"
               @click.stop="store.load"
            ></ButtonUI>
         </template>
         <template #actions="{ row }">
            <div class="row-actions">
               <ButtonUI
                  type="icon--danger"
                  icon="fa-regular fa-trash"
                  @click.stop="handleDelete(row)"
               ></ButtonUI>
            </div>
         </template>
      </AppTable>
   </ContentLayout>
</template>

<script lang="ts" setup>
import AppTable, { type TableHeader } from '@/components/AppTable.vue'
import ButtonUI from '@/components/ButtonUI.vue'
import ContentLayout from '@/layouts/ContentLayout.vue'
import { useReceiptsStore } from '@/stores/admin/receipts'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useReceiptsStore()

const rows = computed(() => store.items as unknown as Record<string, unknown>[])

const headers: TableHeader[] = [
   { valueKey: 'num', title: 'Номер', align: 'left' },
   { valueKey: 'from_name', title: 'Поставщик' },
   { valueKey: 'date_arrival', title: 'Дата поступления' },
   { valueKey: 'status_name', title: 'Статус' },
   { valueKey: 'items.length', title: 'Поступило товаров', align: 'right' },
]

function handleClick(row: Record<string, unknown>) {
   console.log('Click', row)
   router.push({ name: 'admin-new-receipts', params: { id: row.id as string } })
}

async function handleCreate() {
   const receipt = await store.create()
   router.push({ name: 'admin-new-receipts', params: { id: receipt.id } })
}

async function handleDelete(row: Record<string, unknown>) {
   console.log('edit', row)
   await store.remove(row.id as string)
}

onMounted(async () => {
   await store.load()
})
</script>

<style scoped></style>
