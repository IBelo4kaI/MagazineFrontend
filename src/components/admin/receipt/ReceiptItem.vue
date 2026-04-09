<template>
   <div class="receipt-item" :class="{ 'receipt-item--compact': compact }">
      <div class="receipt-item__loading" v-if="isLoading">
         <i class="fa-regular fa-spin fa-loader" />
      </div>
      <template v-else-if="nomenclature">
         <!-- Compact -->
         <template v-if="compact">
            <div class="receipt-item__row">
               <div class="receipt-item__info">
                  <span class="receipt-item__name">
                     {{ nomenclature.name }}
                  </span>
                  <span
                     v-if="nomenclature.article"
                     class="receipt-item__article"
                  >
                     {{ nomenclature.article }}
                  </span>
                  <span class="badge">
                     <i class="fa-regular fa-tag" />
                     {{ nomenclature.warehouse_category.name }}
                  </span>
                  <span class="badge">
                     <i class="fa-regular fa-ruler" />
                     {{ nomenclature.unit.name }}
                  </span>
               </div>

               <ButtonUI
                  icon="fa-regular fa-trash"
                  type="inline"
                  @click="emits('onDelete', nomenclature.id)"
               />
            </div>

            <div class="receipt-item__bottom">
               <div v-if="product" class="receipt-item__prices">
                  <div
                     v-for="p in priceOptions"
                     :key="p.key"
                     class="price"
                     :class="{
                        'price--active': unitPrice === product[p.key],
                        'price--disabled': !allowPriceSelect,
                     }"
                     @click="allowPriceSelect && selectPrice(product[p.key])"
                     :title="p.label"
                  >
                     <span class="price__label">{{ p.label }}</span>
                     <span class="price__value">{{ fmt(product[p.key]) }}</span>
                  </div>
               </div>

               <div class="receipt-item__qty">
                  <InputUi
                     type="number"
                     placeholder="Кол-во"
                     :model-value="props.receipt.quantity"
                     @update:model-value="onQuantityChange"
                  />
                  <span class="receipt-item__total">
                     {{
                        props.receipt.price != null
                           ? fmt(props.receipt.price)
                           : '—'
                     }}
                  </span>
               </div>
            </div>
         </template>

         <!-- Default -->
         <template v-else>
            <div class="receipt-item__main">
               <div class="receipt-item__title-row">
                  <span class="receipt-item__name">
                     {{ nomenclature.name }}
                  </span>
                  <span
                     v-if="nomenclature.article"
                     class="receipt-item__article"
                  >
                     {{ nomenclature.article }}
                  </span>
               </div>
               <div
                  v-if="nomenclature.description"
                  class="receipt-item__description"
               >
                  {{ nomenclature.description }}
               </div>
               <div class="receipt-item__actions">
                  <ButtonUI
                     icon="fa-regular fa-trash"
                     type="inline"
                     @click="emits('onDelete', nomenclature.id)"
                  />
               </div>
            </div>

            <div class="receipt-item__meta">
               <div class="receipt-item__badges">
                  <span class="badge">
                     <i class="fa-regular fa-tag" />
                     {{ nomenclature.warehouse_category.name }}
                  </span>
                  <span class="badge">
                     <i class="fa-regular fa-ruler" />
                     {{ nomenclature.unit.name }}
                  </span>
               </div>

               <div
                  v-if="product"
                  class="receipt-item__prices receipt-item__prices--grid"
               >
                  <div
                     v-for="p in priceOptions"
                     :key="p.key"
                     class="price"
                     :class="{
                        'price--active': unitPrice === product[p.key],
                        'price--disabled': !allowPriceSelect,
                     }"
                     @click="allowPriceSelect && selectPrice(product[p.key])"
                  >
                     <span class="price__label">{{ p.label }}</span>
                     <span class="price__value">{{ fmt(product[p.key]) }}</span>
                  </div>
               </div>

               <div class="receipt-item__props">
                  <div class="prop">
                     <span class="prop__label">Количество</span>
                     <InputUi
                        type="number"
                        :model-value="props.receipt.quantity"
                        @update:model-value="onQuantityChange"
                     />
                  </div>
                  <div class="prop prop--total">
                     <span class="prop__label">Итого</span>
                     <span class="prop__total">
                        {{
                           props.receipt.price != null
                              ? fmt(props.receipt.price)
                              : '—'
                        }}
                     </span>
                  </div>
               </div>
            </div>
         </template>
      </template>
   </div>
</template>

<script lang="ts" setup>
import ButtonUI from '@/components/ButtonUI.vue'
import InputUi from '@/components/InputUi.vue'
import type { ReceiptItem as ReceiptItemType } from '@/forms/receipt/schema'
import { getNomenclature } from '@/services/nomenclature'
import type { Nomenclature } from '@/types/nomenclature'
import type { Product } from '@/types/products'
import { onMounted, ref, watch } from 'vue'

type PriceKey = 'purchase_price' | 'wholesale_price' | 'retail_price'

interface Props {
   receipt: ReceiptItemType
   defaultPriceKey?: PriceKey
   allowPriceSelect?: boolean
   compact?: boolean
}

const props = defineProps<Props>()

const emits = defineEmits<{ onDelete: [string] }>()

const isLoading = ref(false)
const nomenclature = ref<Nomenclature | undefined>(undefined)
const product = ref<Product | undefined>(undefined)
const unitPrice = ref<number | undefined>(undefined)

const priceOptions: { key: PriceKey; label: string }[] = [
   { key: 'purchase_price', label: 'Закупочная' },
   { key: 'wholesale_price', label: 'Оптовая' },
   { key: 'retail_price', label: 'Розничная' },
]

const fmt = (value: number): string =>
   value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })

function recalculate(): void {
   const qty = props.receipt.quantity
   if (qty != null && unitPrice.value != null) {
      props.receipt.price = qty * unitPrice.value
   }
}

function selectPrice(price: number): void {
   unitPrice.value = price
   recalculate()
}

function onQuantityChange(v: string | number | null | undefined): void {
   const parsed = v == null ? null : Number(v)
   props.receipt.quantity = isNaN(parsed as number) ? null : (parsed as number)
   recalculate()
}

async function load(): Promise<void> {
   isLoading.value = true
   const [nomenclatureData, productData] = await Promise.all([
      getNomenclature(props.receipt.nomenclature_id),
      // getProductByNomenclatureId(props.receipt.nomenclature_id),
      null,
   ])
   if (nomenclatureData) nomenclature.value = nomenclatureData
   if (productData) {
      product.value = productData
      const key: PriceKey = props.defaultPriceKey ?? 'purchase_price'
      selectPrice(productData[key])
   }
   isLoading.value = false
}

watch(
   () => props.receipt.nomenclature_id,
   async () => await load()
)
onMounted(async () => await load())
</script>

<style scoped>
.receipt-item {
   width: 100%;
   padding: var(--padding-secondary);
   border: 1.5px solid var(--border-color);
   border-radius: var(--border-radius);
   background: var(--foreground);
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
}

/* ─── Loading ─────────────────────────────────────── */

.receipt-item__loading {
   display: flex;
   justify-content: center;
   padding: var(--padding-primary) 0;
   color: var(--muted-text);
}

/* ─── Compact ─────────────────────────────────────── */

.receipt-item--compact {
   padding: 0.5rem 0.75rem;
   gap: 0.5rem;
}

.receipt-item__row {
   display: flex;
   align-items: center;
   gap: 0.75rem;
}

.receipt-item__info {
   display: flex;
   align-items: center;
   gap: 0.5rem;
   flex-wrap: wrap;
   flex: 1;
   min-width: 0;
}

.receipt-item__bottom {
   display: flex;
   align-items: center;
   gap: 0.5rem;
   flex-wrap: wrap;
}

.receipt-item__qty {
   display: flex;
   align-items: center;
   gap: 0.5rem;
}

.receipt-item__qty :deep(.custom-input) {
   width: 6rem;
}

.receipt-item__total {
   font-size: 0.9rem;
   font-weight: 700;
   color: var(--accent);
   white-space: nowrap;
   min-width: 5rem;
   text-align: right;
}

/* ─── Default ─────────────────────────────────────── */

.receipt-item__main {
   display: grid;
   grid-template-areas:
      'title-row actions'
      'description actions';
   grid-template-columns: 1fr auto;
   gap: 0.25rem;
}

.receipt-item__title-row {
   grid-area: title-row;
   display: flex;
   align-items: baseline;
   gap: 0.6rem;
   flex-wrap: wrap;
}

.receipt-item__name {
   font-size: 0.9rem;
   font-weight: 700;
   color: var(--text);
   overflow: hidden;
   text-overflow: ellipsis;
}

.receipt-item__article {
   font-size: 0.72rem;
   color: var(--muted-text);
   font-family: monospace;
   white-space: nowrap;
}

.receipt-item__description {
   grid-area: description;
   font-size: 0.8rem;
   color: var(--muted-text);
   line-height: 1.4;
}

.receipt-item__actions {
   grid-area: actions;
   display: flex;
   align-items: center;
}

.receipt-item__meta {
   display: flex;
   flex-direction: column;
   gap: 0.6rem;
   padding-top: var(--gap-primary);
   border-top: 1.5px solid var(--border-color);
}

.receipt-item__badges {
   display: flex;
   gap: 0.4rem;
   flex-wrap: wrap;
}

/* ─── Shared ──────────────────────────────────────── */



.receipt-item__prices {
   display: flex;
   gap: 0.3rem;
   flex-wrap: wrap;
}

.receipt-item__prices--grid {
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: var(--gap-primary);
}

.price {
   display: flex;
   flex-direction: column;
   gap: 0.1rem;
   padding: 0.25rem 0.5rem;
   border: 1.5px solid var(--border-color);
   border-radius: var(--border-radius);
   background: var(--muted-foreground);
   cursor: pointer;
   transition:
      border-color 0.15s,
      background 0.15s;
   white-space: nowrap;
}

.receipt-item__prices--grid .price {
   padding: var(--padding-secondary);
}

.price:hover {
   border-color: var(--accent);
}

.price--active {
   border-color: var(--accent);
   background: var(--muted-accent);
}

.price--disabled {
   pointer-events: none;
}

.price__label {
   font-size: 0.6rem;
   font-weight: 600;
   letter-spacing: 0.04em;
   text-transform: uppercase;
   color: var(--muted-text);
}

.price--active .price__label {
   color: var(--on-muted-accent);
}

.price__value {
   font-size: 0.8rem;
   font-weight: 700;
   color: var(--text);
}

.receipt-item__prices--grid .price__value {
   font-size: 0.9rem;
}

.price--active .price__value {
   color: var(--accent);
}

.receipt-item__props {
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap: var(--gap-primary);
   align-items: end;
}

.prop {
   display: flex;
   flex-direction: column;
   gap: 0.3rem;
}

.prop__label {
   font-size: 0.68rem;
   font-weight: 600;
   letter-spacing: 0.05em;
   text-transform: uppercase;
   color: var(--muted-text);
}

.prop--total {
   padding: var(--padding-secondary);
   background: var(--muted-foreground);
   border: 1.5px solid var(--border-color);
   border-radius: var(--border-radius);
}

.prop__total {
   font-size: 1rem;
   font-weight: 700;
   color: var(--accent);
}

/* ─── Mobile ──────────────────────────────────────── */

@media (max-width: 600px) {
   /* Compact на мобиле — цены и qty переносятся на новую строку */
   .receipt-item--compact .receipt-item__bottom {
      flex-direction: column;
      align-items: stretch;
   }

   .receipt-item--compact .receipt-item__prices {
      width: 100%;
      justify-content: space-between;
   }

   .receipt-item--compact .receipt-item__qty {
      margin-left: 0;
      justify-content: space-between;
   }

   .receipt-item--compact .receipt-item__qty :deep(.custom-input) {
      flex: 1;
   }

   .receipt-item--compact .receipt-item__total {
      min-width: unset;
      text-align: left;
   }

   /* Default на мобиле */
   .receipt-item__main {
      grid-template-areas:
         'title-row'
         'description'
         'actions';
      grid-template-columns: 1fr;
   }

   .receipt-item__actions {
      justify-content: flex-end;
   }

   .receipt-item__prices--grid {
      grid-template-columns: 1fr 1fr;
   }

   .receipt-item__props {
      grid-template-columns: 1fr;
   }

   .prop--total {
      margin-top: 0.25rem;
   }
}

@media (max-width: 360px) {
   .receipt-item__prices--grid {
      grid-template-columns: 1fr;
   }

   .receipt-item--compact .receipt-item__prices {
      flex-direction: column;
   }

   .receipt-item--compact .price {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
   }
}
</style>
