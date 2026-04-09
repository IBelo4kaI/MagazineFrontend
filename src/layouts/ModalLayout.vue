<template>
   <Teleport to="body">
      <Transition name="overlay">
         <div
            v-if="stack.length"
            class="modal-overlay"
            @mousedown.self="closeLast()"
         />
      </Transition>

      <div v-if="stack.length" class="modal-stack">
         <Transition
            v-for="(modal, index) in stack"
            :key="modal.id"
            name="modal"
         >
            <div
               class="modal-wrapper"
               :style="getStackStyle(index)"
               @mousedown.self="closeLast()"
            >
               <div class="modal-card" role="dialog" aria-modal="true">
                  <component
                     :is="modal.component"
                     v-bind="modal.props"
                     @close="(result?: unknown) => close(modal.id, result)"
                  />
               </div>
            </div>
         </Transition>
      </div>
   </Teleport>
</template>

<script setup lang="ts">
import { useModal } from '@/composables/useModal'
import type { CSSProperties } from 'vue'

const { stack, close, closeLast } = useModal()

const getStackStyle = (
   index: number
): CSSProperties & Record<string, unknown> => {
   const total = stack.value.length
   const distFromTop = total - 1 - index
   return {
      '--offset': `${distFromTop * 12}px`,
      '--scale': 1 - distFromTop * 0.04,
      '--brightness': 1 - distFromTop * 0.15,
      'z-index': 1000 + index,
      'pointer-events': index === total - 1 ? 'all' : 'none',
   }
}
</script>

<style scoped>
.modal-overlay {
   position: fixed;
   inset: 0;
   background: rgba(0, 0, 0, 0.45);
   z-index: 999;
}

.modal-stack {
   position: fixed;
   inset: 0;
   pointer-events: none;
   z-index: 1000;
}

.modal-wrapper {
   position: fixed;
   inset: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 1rem;
   pointer-events: all;
   transform: translateY(calc(var(--offset) * -1)) scale(var(--scale));
   filter: brightness(var(--brightness));
   transition:
      transform 0.2s ease,
      filter 0.2s ease;
}

.modal-card {
   background: var(--foreground);
   border-radius: var(--border-radius);
   border: 0.07rem solid var(--border-color);
   width: 100%;
   max-width: 520px;
   max-height: calc(100dvh - 2rem);
   overflow-y: auto;
   display: flex;
   flex-direction: column;
}

/* На мобильных — sheet снизу */
@media (max-width: 600px) {
   .modal-wrapper {
      align-items: flex-end;
      padding: 0;
      transform: translateY(calc(var(--offset) * -1)) scale(var(--scale));
   }

   .modal-card {
      max-width: 100%;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      max-height: 92dvh;
   }
}

/* Transitions */
.overlay-enter-active,
.overlay-leave-active {
   transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
   opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
   transition:
      opacity 0.2s ease,
      transform 0.2s ease,
      filter 0.2s ease;
}
.modal-enter-from {
   opacity: 0;
   transform: translateY(calc(var(--offset) * -1 + 20px))
      scale(calc(var(--scale) - 0.02));
}
.modal-leave-to {
   opacity: 0;
   transform: translateY(calc(var(--offset) * -1 + 10px))
      scale(calc(var(--scale) - 0.01));
}

@media (max-width: 600px) {
   .modal-enter-from {
      transform: translateY(100%);
   }
   .modal-leave-to {
      transform: translateY(100%);
   }
}
</style>
