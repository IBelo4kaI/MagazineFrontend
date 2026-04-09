<template>
   <ModalLayoutBody title="Создание номенклатуры" @confirm="submit">
      <div class="form">
         <InputUi
            label="Наименование"
            v-model="store.values.name"
            :error="err('name')"
         />
         <Autocomplete
            label="Категория"
            :options="store.categoriesOptions"
            v-model="store.values.warehouseCategoryId"
            label-key="name"
            value-key="id"
            :error="err('warehouseCategoryId')"
            :loading="store.categoriesLoading"
            @update:model-value="(v) => field('warehouseCategoryId', v)"
            @blur="store.touch('warehouseCategoryId')"
            @focus="async () => await store.searchCategories()"
         />
         <Autocomplete
            label="Единица измерения"
            :options="store.unitsOptions"
            v-model="store.values.unitId"
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
   </ModalLayoutBody>
</template>

<script lang="ts" setup>
import ModalLayoutBody from '@/layouts/ModalLayoutBody.vue'
import InputUi from '../InputUi.vue'
import { useAddNomenclatureModalStore } from '@/stores/admin/addNomenclatureModal'
import type { NomenclatureModalForm } from '@/forms/nomenclature/schemaModal'
import Autocomplete from '../Autocomplete.vue'

const emit = defineEmits<{ close: [result?: unknown] }>()

const store = useAddNomenclatureModalStore()

const err = (key: keyof NomenclatureModalForm): string | undefined =>
   store.errors[key] ?? undefined

function field<K extends keyof NomenclatureModalForm>(key: K, v: unknown) {
   store.set(key, v as NomenclatureModalForm[K])
}

const submit = async () => {
   await store.submit()
   if (store.isValid) emit('close')
}
</script>

<style scoped></style>
