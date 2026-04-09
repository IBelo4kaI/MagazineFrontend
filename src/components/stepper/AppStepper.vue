<template>
   <div class="stepper">
      <div class="stepper__track">
         <div class="stepper__item" v-for="(step, i) in props.steps">
            <div
               class="stepper__label"
               :class="[
                  { stepper__active: currentStep == i },
                  { stepper__clickable: props.clickable },
               ]"
               @click="props.clickable && go(i)"
            >
               <i v-if="step.icon" :class="step.icon"></i>
               {{ step.label }}
            </div>
         </div>
      </div>

      <!-- <hr /> -->

      <div class="stepper__content">
         <slot
            :name="`step-${currentStep}`"
            :step="steps[currentStep]"
            :index="currentStep"
         ></slot>
      </div>

      <!-- <hr /> -->

      <div class="stepper__actions">
         <ButtonUI
            @click="prev"
            icon="fa-regular fa-arrow-left"
            type="inline"
            :disabled="props.blockActions || currentStep == 0"
         >
            Назад
         </ButtonUI>
         <ButtonUI
            @click="next"
            icon-align="right"
            icon="fa-regular fa-arrow-right"
            type="inline"
            :disabled="
               props.blockActions ||
               props.blockNextAction ||
               currentStep == props.steps.length - 1
            "
            v-if="currentStep != props.steps.length - 1"
         >
            Дальше
         </ButtonUI>
         <ButtonUI
            @click="next"
            icon="fa-regular fa-circle-check"
            type="inline"
            :disabled="
               props.blockActions ||
               props.blockNextAction ||
               props.blockCompleteAction
            "
            v-else-if="currentStep == props.steps.length - 1"
         >
            {{ props.completeTextButton }}
         </ButtonUI>
      </div>
   </div>
</template>

<script lang="ts" setup>
import ButtonUI from '../ButtonUI.vue'
import type { Step } from './types'

const props = withDefaults(
   defineProps<{
      steps: Step[]
      completeTextButton?: string
      clickable?: boolean
      blockActions?: boolean
      blockNextAction?: boolean
      blockCompleteAction?: boolean
   }>(),
   { completeTextButton: 'Завершить', clickable: false }
)

const currentStep = defineModel<number>({ default: 0 })

const emits = defineEmits<{
   completed: []
}>()

const go = (i: number) => {
   currentStep.value = i
}

const next = () => {
   if (currentStep.value < props.steps.length - 1) currentStep.value += 1
}

const prev = () => {
   if (currentStep.value > 0) currentStep.value -= 1
}
</script>

<style scoped>
.stepper {
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: var(--padding-primary);
   padding: var(--padding-primary);
   background: var(--foreground);
   border-radius: var(--border-radius);
}
.stepper__track {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   width: 100%;
   gap: var(--gap-primary);
}

.stepper__label {
   display: flex;
   gap: var(--gap-secondary);
   align-items: center;

   color: var(--muted-text);
}
.stepper__active {
   color: var(--accent);
}
.stepper__clickable {
   cursor: pointer;
}
.stepper__content {
   width: 100%;
}
.stepper__actions {
   display: flex;
   gap: var(--padding-primary);
   width: 100%;
   justify-content: space-between;
}
</style>
