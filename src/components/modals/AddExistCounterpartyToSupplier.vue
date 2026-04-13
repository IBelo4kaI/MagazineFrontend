<template>
   <ModalLayoutBody
      title="Добавить контрагент в поставщиков"
      confirm-text="Добавить"
      @confirm="submit"
      @close="emit('close')"
   >
      <div class="card">
         <!-- Header -->
         <div class="card-header">
            <div class="type-badge">{{ props.counterparty.type }}</div>
            <div class="card-names">
               <span class="short-name">{{ props.counterparty.short_name }}</span>
               <span class="full-name">{{ props.counterparty.full_name }}</span>
            </div>
         </div>

         <template v-if="details">
            <!-- ООО -->
            <template v-if="details.type === 'LLC'">
               <div class="subgroup">
                  <p class="label">
                     <i class="fa-regular fa-file-lines" />
                     Реквизиты
                  </p>
                  <div class="info-grid">
                     <div class="info-item">
                        <span class="info-label">ИНН</span>
                        <span class="info-value">{{ details.data.inn }}</span>
                     </div>
                     <div class="info-item">
                        <span class="info-label">КПП</span>
                        <span class="info-value">{{ details.data.kpp }}</span>
                     </div>
                     <div class="info-item">
                        <span class="info-label">ОГРН</span>
                        <span class="info-value">{{ details.data.ogrn }}</span>
                     </div>
                     <div v-if="details.data.date_register" class="info-item">
                        <span class="info-label">Дата регистрации</span>
                        <span class="info-value">{{ details.data.date_register }}</span>
                     </div>
                  </div>
               </div>

               <div class="subgroup">
                  <p class="label">
                     <i class="fa-regular fa-location-dot" />
                     Адреса
                  </p>
                  <div class="info-grid info-grid--col1">
                     <div class="info-item">
                        <span class="info-label">Юридический адрес</span>
                        <span class="info-value">{{ details.data.legal_address }}</span>
                     </div>
                     <div class="info-item">
                        <span class="info-label">Фактический адрес</span>
                        <span class="info-value">{{ details.data.actual_address }}</span>
                     </div>
                     <div class="info-item">
                        <span class="info-label">Почтовый адрес</span>
                        <span class="info-value">{{ details.data.postal_address }}</span>
                     </div>
                  </div>
               </div>
            </template>

            <!-- ИП -->
            <template v-else-if="details.type === 'IP'">
               <div class="subgroup">
                  <p class="label">
                     <i class="fa-regular fa-file-lines" />
                     Реквизиты
                  </p>
                  <div class="info-grid">
                     <div class="info-item">
                        <span class="info-label">ИНН</span>
                        <span class="info-value">{{ details.data.inn }}</span>
                     </div>
                     <div v-if="details.data.ogrnip" class="info-item">
                        <span class="info-label">ОГРНИП</span>
                        <span class="info-value">{{ details.data.ogrnip }}</span>
                     </div>
                     <div v-if="details.data.okved" class="info-item">
                        <span class="info-label">ОКВЭД</span>
                        <span class="info-value">{{ details.data.okved }}</span>
                     </div>
                     <div v-if="details.data.date_register" class="info-item">
                        <span class="info-label">Дата регистрации</span>
                        <span class="info-value">{{ details.data.date_register }}</span>
                     </div>
                  </div>
               </div>
            </template>

            <!-- Физ. лицо -->
            <template v-else-if="details.type === 'PHYSIC'">
               <div class="subgroup">
                  <p class="label">
                     <i class="fa-regular fa-id-card" />
                     Паспортные данные
                  </p>
                  <div class="info-grid">
                     <div class="info-item">
                        <span class="info-label">Серия</span>
                        <span class="info-value">{{ details.data.passport_series }}</span>
                     </div>
                     <div class="info-item">
                        <span class="info-label">Номер</span>
                        <span class="info-value">{{ details.data.passport_number }}</span>
                     </div>
                     <div class="info-item">
                        <span class="info-label">Код подразделения</span>
                        <span class="info-value">{{ details.data.department_code }}</span>
                     </div>
                     <div class="info-item">
                        <span class="info-label">Дата выдачи</span>
                        <span class="info-value">{{ details.data.passport_date_issued }}</span>
                     </div>
                  </div>
                  <div class="info-grid info-grid--col1">
                     <div class="info-item">
                        <span class="info-label">Кем выдан</span>
                        <span class="info-value">{{ details.data.passport_issued_by }}</span>
                     </div>
                  </div>
               </div>

               <div class="subgroup">
                  <p class="label">
                     <i class="fa-regular fa-location-dot" />
                     Адреса и ИНН
                  </p>
                  <div class="info-grid">
                     <div v-if="details.data.inn" class="info-item">
                        <span class="info-label">ИНН</span>
                        <span class="info-value">{{ details.data.inn }}</span>
                     </div>
                  </div>
                  <div class="info-grid info-grid--col1">
                     <div class="info-item">
                        <span class="info-label">Адрес регистрации</span>
                        <span class="info-value">{{ details.data.address_registration }}</span>
                     </div>
                     <div class="info-item">
                        <span class="info-label">Адрес проживания</span>
                        <span class="info-value">{{ details.data.address_living }}</span>
                     </div>
                  </div>
               </div>
            </template>
         </template>

         <div v-else class="loading-state">
            <i class="fa-regular fa-circle-notch fa-spin" />
         </div>
      </div>
   </ModalLayoutBody>
</template>

<script lang="ts" setup>
import ModalLayoutBody from '@/layouts/ModalLayoutBody.vue'
import { getCounterpartyDetails } from '@/services/counterparty'
import type { Counterparty, CounterpartyDetails } from '@/types/counterparty'
import { onMounted, ref } from 'vue'

const props = defineProps<{ counterparty: Counterparty }>()

const details = ref<CounterpartyDetails>()

const emit = defineEmits<{ close: [result?: unknown] }>()

const submit = async () => {
   // await store.submit()
   // if (store.isValid) emit('close', store.createdId)
}

onMounted(async () => {
   details.value = await getCounterpartyDetails(props.counterparty)
})
</script>

<style scoped>
.card {
   display: flex;
   flex-direction: column;
   gap: 0.7rem;
}

.card-header {
   display: flex;
   align-items: center;
   gap: 0.75rem;
   padding: 0.75rem;
   background: var(--muted-foreground);
   border: 1.5px solid var(--border-color);
   border-radius: var(--border-radius);
}

.type-badge {
   flex-shrink: 0;
   padding: 0.25rem 0.6rem;
   background: var(--muted-accent);
   color: var(--on-muted-accent);
   border-radius: calc(var(--border-radius) * 0.6);
   font-size: 0.72rem;
   font-weight: 700;
   letter-spacing: 0.05em;
   text-transform: uppercase;
}

.card-names {
   display: flex;
   flex-direction: column;
   gap: 0.1rem;
   min-width: 0;
}

.short-name {
   font-size: 0.9rem;
   font-weight: 600;
   color: var(--text);
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}

.full-name {
   font-size: 0.75rem;
   color: var(--muted-text);
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}

.subgroup {
   display: flex;
   flex-direction: column;
   gap: 0.45rem;
   padding: var(--padding-secondary);
   background: var(--muted-foreground);
   border: 1.5px solid var(--border-color);
   border-radius: var(--border-radius);
}

.label {
   display: flex;
   align-items: center;
   gap: 0.4rem;
   margin: 0;
   font-size: 0.72rem;
   font-weight: 600;
   letter-spacing: 0.05em;
   text-transform: uppercase;
   color: var(--muted-text);
}

.info-grid {
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   gap: 0.4rem;
}

.info-grid--col1 {
   grid-template-columns: 1fr;
}

.info-item {
   display: flex;
   flex-direction: column;
   gap: 0.1rem;
   padding: 0.45rem 0.6rem;
   background: var(--foreground);
   border: 1.5px solid var(--border-color);
   border-radius: calc(var(--border-radius) * 0.6);
}

.info-label {
   font-size: 0.68rem;
   font-weight: 500;
   color: var(--muted-text);
   text-transform: uppercase;
   letter-spacing: 0.04em;
}

.info-value {
   font-size: 0.85rem;
   font-weight: 500;
   color: var(--text);
}

.loading-state {
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 2rem;
   color: var(--muted-text);
   font-size: 1.4rem;
}
</style>
