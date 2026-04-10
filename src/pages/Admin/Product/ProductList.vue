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

         <template #cell-children="{ value }">
            <div class="reservation-list">
               <div
                  class="reservation-item"
                  v-for="item in value as StockItem[]"
               >
                  <span>{{ item.project_name }}</span>
                  —
                  <span>{{ item.quantity }}</span>
               </div>
            </div>
         </template>

         <template #cell-free="{ row }">
            {{
               (row as unknown as GroupedStockItem).total_quantity -
               (row as unknown as GroupedStockItem).children.reduce(
                  (sum, c) => sum + c.quantity,
                  0
               )
            }}
         </template>

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
import { getWarehouseNomenclatures } from '@/services/warehouse'
import type {
   GroupedStockItem,
   StockItem,
   WarehouseStockResponse,
} from '@/types/warehouse'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nomenclatures = ref<WarehouseStockResponse>()

const isLoading = ref(false)

const items = computed<Record<string, unknown>[]>(() => {
   if (!nomenclatures.value) return []

   const map = new Map<string, GroupedStockItem>()

   for (const item of nomenclatures.value.items) {
      const existing = map.get(item.nomenclature_id)

      if (existing) {
         existing.children.push({
            object_id: item.object_id,
            project_name: item.project_name,
            quantity: item.quantity,
         })
      } else {
         map.set(item.nomenclature_id, {
            ...item,
            children: [],
         })
      }
   }

   return [...map.values()] as unknown as Record<string, unknown>[]
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
   // { valueKey: 'article', title: 'Артикул' },
   { valueKey: 'nomenclature_name', title: 'Наименование' },
   // { valueKey: 'warehouseCategory.name', title: 'Категория' },
   { valueKey: 'unit_name', title: 'Ед. изм.', align: 'center' },
   { valueKey: 'total_quantity', title: 'Кол-во', align: 'center' },
   { valueKey: 'children', title: 'Зарезервировано', align: 'center' },
   { valueKey: 'free', title: 'Свободно', align: 'center' },

   // {
   //    valueKey: 'prices.purchasePrice',
   //    title: 'Закупочная',
   //    align: 'right',
   // },
   // {
   //    valueKey: 'prices.wholesalePrice',
   //    title: 'Оптовая',
   //    align: 'right',
   // },
   // {
   //    valueKey: 'prices.retailPrice',
   //    title: 'Розничная',
   //    align: 'right',
   // },
   // { valueKey: 'status', title: 'Статус', align: 'center' },
]

function handleEdit(row: Record<string, unknown>) {
   console.log('edit', row)
   router.push({ name: 'admin-development' })
}

async function load() {
   isLoading.value = true
   nomenclatures.value = await getWarehouseNomenclatures()
   isLoading.value = false
}

onMounted(async () => {
   await load()
})
</script>

<style scoped>
.reservation-list {
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: var(--gap-secondary);
}
.reservation-item {
   display: flex;
   gap: var(--gap-secondary);
   justify-content: center;
   align-items: center;
   width: 10rem;
   padding: 0.2rem var(--padding-secondary);
   background: var(--muted-accent);
   border: 0.07rem solid var(--border-color);
   border-radius: var(--border-radius);
}
.reservation-item span:nth-child(1) {
   font-weight: 500;
}
.reservation-item span:nth-child(2) {
   font-weight: 700;
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
