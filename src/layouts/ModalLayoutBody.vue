<template>
   <div class="modal-header">
      <span class="modal-title">{{ title }}</span>
      <button class="modal-close-btn" @click="emit('close')">
         <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
               d="M1 1L13 13M13 1L1 13"
               stroke="currentColor"
               stroke-width="1.6"
               stroke-linecap="round"
            />
         </svg>
      </button>
   </div>

   <div class="modal-body">
      <slot />
   </div>

   <div v-if="!hideFooter" class="modal-footer">
      <slot name="footer">
         <ButtonUI class="btn" @click="emit('close')">
            {{ cancelText }}
         </ButtonUI>
         <ButtonUI
            class="btn btn-primary"
            :disabled="loading"
            @click="emit('confirm')"
         >
            <span v-if="loading" class="loading-dots">
               <span class="loading-dot" />
               <span class="loading-dot" />
               <span class="loading-dot" />
            </span>
            <span v-else>{{ confirmText }}</span>
         </ButtonUI>
      </slot>
   </div>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/ButtonUI.vue'

interface Props {
   title: string
   confirmText?: string
   cancelText?: string
   loading?: boolean
   hideFooter?: boolean
}

withDefaults(defineProps<Props>(), {
   confirmText: 'Создать',
   cancelText: 'Отмена',
   loading: false,
   hideFooter: false,
})

const emit = defineEmits<{
   close: []
   confirm: []
}>()
</script>

<style scoped>
.modal-header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 1rem 1.2rem;
   border-bottom: 0.07rem solid var(--border-color);
}

.modal-title {
   font-size: 0.9rem;
   font-weight: 500;
   color: var(--text);
}

.modal-body {
   padding: 1.2rem;
   display: flex;
   flex-direction: column;
   gap: 1rem;
}

.modal-footer {
   display: flex;
   justify-content: flex-end;
   gap: 0.6rem;
   padding: 1rem 1.2rem;
   border-top: 0.07rem solid var(--border-color);
}

.loading-dots {
   display: flex;
   align-items: center;
   gap: 0.25rem;
}

.loading-dot {
   width: 5px;
   height: 5px;
   border-radius: 50%;
   background: #fff;
   animation: pulse 1.2s ease-in-out infinite;
}

.loading-dot:nth-child(2) {
   animation-delay: 0.2s;
}
.loading-dot:nth-child(3) {
   animation-delay: 0.4s;
}

@keyframes pulse {
   0%,
   80%,
   100% {
      opacity: 0.3;
      transform: scale(0.85);
   }
   40% {
      opacity: 1;
      transform: scale(1);
   }
}
</style>
