<template>
   <ContentLayout>
      <AppTable
         :headers="headers"
         :rows="items"
         :loading="isLoading"
         :pagination="false"
         row-key="id"
      >
         <template #toolbar>
            <span style="font-weight: 600; font-size: 0.95rem; flex: 1">
               Товары
            </span>
            <!-- <InputUi
               v-model="search"
               placeholder="Поиск..."
               style="width: 12rem"
            /> -->
            <RouterLink :to="{ name: 'admin-add-product' }">
               <ButtonUI icon="fa-regular fa-plus">Добавить</ButtonUI>
            </RouterLink>
         </template>

         <!-- <template #cell-status="{ value }">
            <span class="status-badge" :class="value as string">
               {{ statusLabel[value as ProductStatus] }}
            </span>
         </template> -->

         <template #cell-prices.retailPrice="{ value }">
            {{ formatPrice(value as number) }}
         </template>

         <template #cell-prices.wholesalePrice="{ value }">
            {{ formatPrice(value as number) }}
         </template>

         <template #cell-prices.purchasePrice="{ value }">
            {{ formatPrice(value as number) }}
         </template>

         <template #actions="{ row }">
            <div class="row-actions">
               <button class="action-btn" @click.stop="handleEdit(row)">
                  <i class="fa-regular fa-pen" />
               </button>
            </div>
         </template>
      </AppTable>
   </ContentLayout>
</template>

<script lang="ts" setup>
import AppTable, { type TableHeader } from '@/components/AppTable.vue'
import ButtonUI from '@/components/ButtonUI.vue'
import ContentLayout from '@/layouts/ContentLayout.vue'
import { getNomenclatures } from '@/services/nomenclature'
import type { Nomenclature } from '@/types/nomenclature'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nomenclatures = ref<Nomenclature[]>([])

const isLoading = ref(false)

const items = computed<Record<string, unknown>[]>(() => {
   if (nomenclatures.value) {
      return nomenclatures.value.flatMap((p) => {
         return {
            ...p,
         }
      }) as Record<string, unknown>[]
   }
   return [] as Record<string, unknown>[]
})

// const statusLabel: Record<ProductStatus, string> = {
//    approved: 'Одобрен',
//    pending: 'На проверке',
// }

function formatPrice(value: number): string {
   if (value)
      return value.toLocaleString('ru-RU', {
         style: 'currency',
         currency: 'RUB',
         maximumFractionDigits: 2,
      })

   return '—'
}

const headers: TableHeader[] = [
   { valueKey: 'article', title: 'Артикул' },
   { valueKey: 'name', title: 'Наименование' },
   { valueKey: 'warehouseCategory.name', title: 'Категория' },
   { valueKey: 'unit.name', title: 'Ед. изм.', align: 'center' },
   {
      valueKey: 'prices.purchasePrice',
      title: 'Закупочная',
      align: 'right',
   },
   {
      valueKey: 'prices.wholesalePrice',
      title: 'Оптовая',
      align: 'right',
   },
   {
      valueKey: 'prices.retailPrice',
      title: 'Розничная',
      align: 'right',
   },
   // { valueKey: 'status', title: 'Статус', align: 'center' },
]

function handleEdit(row: Record<string, unknown>) {
   console.log('edit', row)
   router.push({ name: 'admin-development' })
}

async function load() {
   isLoading.value = true
   nomenclatures.value = await getNomenclatures()
   isLoading.value = false
}

onMounted(async () => {
   await load()
})
</script>

<style scoped>
.nomenclatures-page {
   padding: var(--padding-primary);
}

.status-badge {
   display: inline-flex;
   align-items: center;
   padding: 0.2rem 0.6rem;
   border-radius: calc(var(--border-radius) / 2);
   font-size: 0.78rem;
   font-weight: 600;
}

.status-badge.approved {
   background: var(--muted-success);
   color: var(--on-muted-accent);
}

.status-badge.pending {
   background: var(--muted-warn);
   color: var(--warn);
}

.row-actions {
   display: flex;
   align-items: center;
   gap: var(--gap-secondary);
}

.action-btn {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 2rem;
   height: 2rem;
   border: none;
   border-radius: calc(var(--border-radius) / 2);
   background: var(--muted-foreground);
   color: var(--muted-text);
   cursor: pointer;
   transition:
      background 0.15s,
      color 0.15s;
}

.action-btn:hover {
   background: var(--muted-accent);
   color: var(--accent);
}

.action-btn--danger:hover {
   background: var(--muted-destructive);
   color: var(--destructive);
}
</style>
