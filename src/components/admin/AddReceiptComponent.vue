<template>
   <div class="form">
      <!-- <div class="loading" v-if="store.isLoading">
            <i class="fa-regular fa-spin fa-boxes"></i>
         </div> -->
      <section class="section">
         <div class="head">
            <span class="icon">
               <i class="fa-regular fa-file-contract" />
            </span>
            <div>
               <h2>Приходная накладная</h2>
               <p>Основные данные</p>
            </div>
         </div>
      </section>
      <section class="section">
         <div class="grid" style="--cols: 2">
            <InputUi
               label="Дата прихода"
               type="date"
               :error="err('date_arrival')"
               v-model="store.values.date_arrival"
               @update:model-value="(v) => field('date_arrival', v)"
            />
            <Autocomplete
               label="Поставщик"
               label-key="short_name"
               value-key="id"
               button-text="Создать поставщика"
               button-position="dropdown-top"
               :options="store.counterpartyOptions"
               :error="store.errors.from ?? undefined"
               :loading="store.counterpartyLoading"
               @focus="async () => await store.searchCounterparty()"
            />
            <InputUi label="Объект" />
         </div>
      </section>

      <div class="section">
         <div class="head">
            <span class="icon icon--accent">
               <i class="fa-regular fa-plus" />
            </span>
            <div>
               <h2>Добавление товара</h2>
               <!-- <p>Добавленные товары</p> -->
            </div>
         </div>
         <div class="fields">
            <div class="grid" style="--cols: 3; align-items: flex-end">
               <Autocomplete
                  label="Поиск номенклатуры"
                  label-key="name"
                  value-key="id"
                  button-text="Создать номенклатуру"
                  button-position="dropdown-top"
                  :options="nomenclaturesStore.nomenclatures"
                  :error="nomenclaturesStore.error ?? undefined"
                  :loading="nomenclaturesStore.isLoading"
                  @clear="selectNomenclature(null)"
                  @select="selectNomenclature"
                  @focus="async () => await nomenclaturesStore.load()"
                  @button-handler="handleCreate"
               >
                  <template #prefix>
                     <i class="fa-regular fa-search"></i>
                  </template>
               </Autocomplete>
               <ButtonUI style="width: 12rem">Добавить</ButtonUI>
            </div>

            <div class="grid" style="--cols: 3" v-if="selectedNomenclature">
               <div class="nomenclature-item">
                  <div class="nomenclature__row">
                     <div class="nomenclature__info">
                        <span class="nomenclature__title">
                           {{ selectedNomenclature.name }}
                        </span>
                     </div>
                  </div>
                  <div class="nomenclature__row">
                     <div class="nomenclature__info">
                        <span class="badge">
                           <i class="fa-regular fa-tag" />
                           {{ selectedNomenclature.warehouse_category.name }}
                        </span>
                        <span class="badge">
                           <i class="fa-regular fa-ruler" />
                           {{ selectedNomenclature.unit.name }}
                        </span>
                     </div>
                  </div>
                  <div
                     class="nomenclature__row"
                     v-if="selectedNomenclature.description"
                  >
                     <div class="nomenclature__info">
                        <span class="nomenclature__desc">
                           {{ selectedNomenclature.description }}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <section class="section">
         <div class="head">
            <span class="icon icon--accent">
               <i class="fa-regular fa-boxes" />
            </span>
            <div>
               <h2>Товары</h2>
               <p>Добавленные товары</p>
            </div>
         </div>
      </section>

      <AppTable :headers="headers" :rows="[{ hed: '12' }]">
         <template #cell-index="{ index, row }">
            {{ index + 1 }} {{ row }}
         </template>
      </AppTable>

      <div class="section">
         <div class="grid" style="--cols: 3">
            <!-- <ButtonUI type="muted" @click="onCancel">Отмена</ButtonUI>
               <ButtonUI type="muted" @click="store.reset">Сбросить</ButtonUI>
               <ButtonUI
                  type="accent"
                  icon="fa-regular fa-plus"
                  @click="onSubmit"
                  :disabled="store.isSubmitting"
               >
                  Добавить товар
               </ButtonUI> -->
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { useModal } from '@/composables/useModal'
import { useNewReceiptStore } from '@/stores/admin/newReceipt'
import { useNomenclaturesStore } from '@/stores/admin/nomenclatures'
import type { Nomenclature } from '@/types/nomenclature'
import { ref } from 'vue'
import AppTable, { type TableHeader } from '../AppTable.vue'
import Autocomplete from '../Autocomplete.vue'
import ButtonUI from '../ButtonUI.vue'
import InputUi from '../InputUi.vue'
import AddNomenclatureModal from '../modals/AddNomenclatureModal.vue'
import type { Receipt, ReceiptUpdate } from '@/types/receipt'
import { updateWarehouseReceipt } from '@/services/receipt'

const nomenclaturesStore = useNomenclaturesStore()
const selectedNomenclature = ref<Nomenclature | null>()

const selectNomenclature = (v: Nomenclature | null) => {
   selectedNomenclature.value = v
}

const props = withDefaults(
   defineProps<{
      onSubmit?: (val: string) => Promise<void>
      onCancel?: () => Promise<void>
   }>(),
   {}
)

const headers: TableHeader[] = [
   {
      title: '№',
      valueKey: 'index',
   },
]

const { open } = useModal()

const handleCreate = async () => {
   const result = await open(AddNomenclatureModal)
   // result придёт когда пользователь нажмёт "Создать" или undefined если закрыл
   if (result) {
      console.log(result)
   }
}

const store = useNewReceiptStore()

async function field<K extends keyof Receipt>(key: K, v: unknown) {
   store.set(key, v as Receipt[K])
   const updateReq: ReceiptUpdate = { [key]: v as Receipt[K] }
   console.log(updateReq)
   const res = await updateWarehouseReceipt(store.values.id, updateReq)
   store.setReceipt(res)
}

const err = (key: keyof Receipt): string | undefined =>
   store.errors[key] ?? undefined

// const onSubmit = async () => {
//    store.touchAll()
//    if (!store.isValid) return
//    await store.submit()
//    if (props.onSubmit) await props.onSubmit(store.nomenclatureIdCreated!)
//    store.reset()
// }

// const onCancel = async () => {
//    if (props.onCancel) await props.onCancel()
//    store.reset()
// }

// onMounted(async () => await store.load())
</script>

<style scoped>
/* Common form styles are imported from assets/form-styles.css */
.nomenclature-item {
   width: 100%;
   padding: var(--padding-secondary);
   border: 1.5px solid var(--border-color);
   border-radius: var(--border-radius);
   background: var(--foreground);
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
}
.nomenclature__row {
   display: flex;
   align-items: center;
   gap: 0.75rem;
}
.nomenclature__info {
   display: flex;
   align-items: center;
   gap: 0.5rem;
   flex-wrap: wrap;
   flex: 1;
   min-width: 0;
}
.nomenclature__title {
   font-size: 0.9rem;
   font-weight: 700;
}
.nomenclature__desc {
   font-size: 0.7rem;
   font-weight: 300;
}
</style>
