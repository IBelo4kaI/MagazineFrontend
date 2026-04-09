<template>
   <div class="form">
      <div class="loading" v-if="store.isLoading">
         <i class="fa-regular fa-spin fa-boxes"></i>
      </div>
      <section class="section">
         <div class="head">
            <span class="icon">
               <i class="fa-regular fa-boxes-stacked" />
            </span>
            <div>
               <h2>Номенклатура</h2>
               <p>Основные характеристики товара</p>
            </div>
         </div>
         <div class="fields">
            <Autocomplete
               label="Наименование"
               :options="store.nomenclatureOptions"
               :model-value="store.values.name"
               label-key="name"
               value-key="name"
               :error="err('name')"
               :loading="store.nomenclatureLoading"
               @update:model-value="(v) => field('name', v)"
               @select="store.selectNomenclature"
               @blur="store.touch('name')"
               @focus="async () => await store.searchNomenclatures()"
            />
            <div class="grid" style="--cols: 2">
               <Autocomplete
                  label="Категория"
                  :options="store.categoriesOptions"
                  :model-value="store.values.warehouseCategoryId"
                  label-key="name"
                  value-key="id"
                  :error="err('warehouseCategoryId')"
                  :loading="store.categoriesLoading"
                  @update:model-value="(v) => field('warehouseCategoryId', v)"
                  @blur="store.touch('warehouseCategoryId')"
                  @focus="async () => await store.searchCategories()"
                  @create="createCategory"
               />
               <Autocomplete
                  label="Единица измерения"
                  :options="store.unitsOptions"
                  :model-value="store.values.unitId"
                  label-key="name"
                  value-key="id"
                  :error="err('unitId')"
                  :loading="store.unitsLoading"
                  :is-show-create-button="false"
                  @update:model-value="(v) => field('unitId', v)"
                  @blur="store.touch('unitId')"
                  @focus="async () => await store.searchUnits()"
               />
            </div>
            <div class="grid" style="--cols: 2">
               <InputUi
                  label="Артикул"
                  :model-value="store.values.article"
                  @update:model-value="(v) => field('article', v)"
               />
               <InputUi
                  label="Описание"
                  :model-value="store.values.description"
                  @update:model-value="(v) => field('description', v)"
               />
            </div>
            <div class="subgroup">
               <p class="label">
                  <i class="fa-regular fa-ruler-combined" />
                  Габариты и вес
               </p>
               <div class="grid" style="--cols: 4">
                  <InputUi
                     label="Длина, мм"
                     type="number"
                     :model-value="store.values.length"
                     @update:model-value="(v) => field('length', v)"
                  />
                  <InputUi
                     label="Ширина, мм"
                     type="number"
                     :model-value="store.values.width"
                     @update:model-value="(v) => field('width', v)"
                  />
                  <InputUi
                     label="Высота, мм"
                     type="number"
                     :model-value="store.values.height"
                     @update:model-value="(v) => field('height', v)"
                  />
                  <InputUi
                     label="Вес, г"
                     type="number"
                     :model-value="store.values.weight"
                     @update:model-value="(v) => field('weight', v)"
                  />
               </div>
            </div>
         </div>
      </section>

      <hr />

      <section class="section">
         <div class="head">
            <span class="icon icon--accent">
               <i class="fa-regular fa-circle-dollar" />
            </span>
            <div>
               <h2>Ценообразование</h2>
               <p>Стоимость для разных сегментов</p>
            </div>
         </div>
         <div class="fields">
            <div class="grid" style="--cols: 3">
               <div
                  v-for="card in priceCards"
                  :key="card.key"
                  class="price-card"
                  :data-variant="card.key"
               >
                  <p class="label">
                     <i :class="card.icon" />
                     {{ card.label }}
                  </p>
                  <InputUi
                     label="Стоимость"
                     type="number"
                     :model-value="store.values[card.field]"
                     :error="err(card.field)"
                     @update:model-value="(v) => field(card.field, v)"
                     @blur="store.touch(card.field)"
                  />
               </div>
            </div>
         </div>
      </section>
      <div class="section">
         <div class="grid" style="--cols: 3">
            <ButtonUI type="muted" @click="onCancel">Отмена</ButtonUI>
            <ButtonUI type="muted" @click="store.reset">Сбросить</ButtonUI>
            <ButtonUI
               type="accent"
               icon="fa-regular fa-plus"
               @click="onSubmit"
               :disabled="store.isSubmitting"
            >
               Добавить товар
            </ButtonUI>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import Autocomplete from '@/components/Autocomplete.vue'
import InputUi from '@/components/InputUi.vue'
import ButtonUI from '@/components/ButtonUI.vue'
import { useAddProductStore } from '@/stores/admin/addProduct'
import { onMounted, onUnmounted } from 'vue'
import type { NomenclatureForm } from '@/forms/product/schema'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = withDefaults(
   defineProps<{
      mode?: 'create' | 'add'
      onSubmit?: (val: string) => Promise<void>
      onCancel?: () => Promise<void>
   }>(),
   {
      mode: 'create',
   }
)

const store = useAddProductStore()

const err = (key: keyof NomenclatureForm): string | undefined =>
   store.errors[key] ?? undefined

function field<K extends keyof NomenclatureForm>(key: K, v: unknown) {
   store.set(key, v as NomenclatureForm[K])
}

function createCategory() {
   router.push({
      name: 'admin-add-category',
      query: { redirect: route.fullPath, short: 'true' },
   })
}

const priceCards: {
   key: string
   label: string
   field: keyof NomenclatureForm
   icon: string
}[] = [
   {
      key: 'purchase',
      label: 'Закупочная',
      field: 'purchasePrice',
      icon: 'fa-regular fa-cart-arrow-down',
   },
   {
      key: 'wholesale',
      label: 'Оптовая',
      field: 'wholesalePrice',
      icon: 'fa-regular fa-boxes',
   },
   {
      key: 'retail',
      label: 'Розничная',
      field: 'retailPrice',
      icon: 'fa-regular fa-store',
   },
]

const onSubmit = async () => {
   store.touchAll()
   if (!store.isValid) return
   await store.submit()
   if (props.onSubmit) await props.onSubmit(store.nomenclatureIdCreated!)
   store.reset()
}

const onCancel = async () => {
   if (props.onCancel) await props.onCancel()
   store.reset()
}

onMounted(async () => await store.load())
</script>

<style scoped>
/* Common form styles are imported from assets/form-styles.css */
</style>
