<template>
   <div class="form">
      <div class="loading" v-if="store.isLoading">
         <i class="fa-regular fa-spin fa-user"></i>
      </div>

      <section class="section">
         <div class="head">
            <span class="icon">
               <i class="fa-regular fa-user" />
            </span>
            <div>
               <h2>Категория</h2>
               <p>Основные данные категории</p>
            </div>
         </div>
         <div class="fields">
            <div class="grid" style="--cols: 2">
               <InputUi
                  label="Название"
                  :model-value="store.values.name"
                  :error="err('name')"
                  @update:model-value="(v) => field('name', v)"
                  @blur="store.touch('name')"
               />
               <Autocomplete
                  label="Родительская категория"
                  :options="store.categoriesOptions"
                  :model-value="store.values.parent_id"
                  label-key="name"
                  value-key="id"
                  :error="err('name')"
                  :loading="store.categoriesLoading"
                  :is-show-create-button="false"
                  @update:model-value="(v) => field('parent_id', v)"
                  @blur="store.touch('name')"
                  @focus="async () => await store.searchCategories()"
               />
            </div>
         </div>
      </section>

      <hr />

      <!-- Действия -->
      <div class="section">
         <div class="grid" style="--cols: 2">
            <ButtonUI type="muted" @click="onCancel">Отмена</ButtonUI>
            <ButtonUI
               type="accent"
               icon="fa-regular fa-plus"
               @click="onSubmit"
               :disabled="store.isSubmitting"
            >
               Добавить категорию
            </ButtonUI>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import ButtonUI from '@/components/ButtonUI.vue'
import InputUi from '@/components/InputUi.vue'
import type { WarehouseCategoryForm } from '@/forms/warehouseCategory/schema'
import { useAddCategoryStore } from '@/stores/admin/addCategory'
import Autocomplete from '../Autocomplete.vue'

const props = withDefaults(
   defineProps<{
      onSubmit?: (val: WarehouseCategoryForm) => Promise<void>
      onCancel?: () => Promise<void>
   }>(),
   {}
)

const store = useAddCategoryStore()

const err = (key: keyof WarehouseCategoryForm): string | undefined =>
   store.errors[key] ?? undefined

function field<K extends keyof WarehouseCategoryForm>(key: K, v: unknown) {
   store.set(key, v as WarehouseCategoryForm[K])
}

const onSubmit = async () => {
   store.touchAll()
   if (!store.isValid) return
   await store.submit()
   if (props.onSubmit) await props.onSubmit(store.values)
   store.reset()
}

const onCancel = async () => {
   if (props.onCancel) await props.onCancel()
   store.reset()
}
</script>

<style scoped>
/* Common form styles are imported from assets/form-styles.css */
</style>
