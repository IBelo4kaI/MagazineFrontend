<template>
   <ModalLayoutBody
      title="Добавить контрагент в поставщиков"
      @confirm="submit"
      @close="emit('close')"
   >
      <div class="form">{{ props.counterparty }}</div>
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

<style scoped></style>
