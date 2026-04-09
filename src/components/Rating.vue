<template>
   <svg
      :width="width"
      viewBox="0 0 160 32"
      xmlns="http://www.w3.org/2000/svg"
      :style="interactive ? 'cursor: pointer' : ''"
   >
      <defs>
         <mask id="stars-mask-fill">
            <g
               fill="white"
               stroke="white"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round"
            >
               <path
                  d="m16 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
               />
               <path
                  d="m48 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
               />
               <path
                  d="m80 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
               />
               <path
                  d="m112 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
               />
               <path
                  d="m144 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
               />
            </g>
         </mask>
         <mask id="stars-mask-stroke">
            <g
               fill="none"
               stroke="white"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round"
            >
               <path
                  d="m16 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
               />
               <path
                  d="m48 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
               />
               <path
                  d="m80 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
               />
               <path
                  d="m112 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
               />
               <path
                  d="m144 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
               />
            </g>
         </mask>
      </defs>

      <!-- Пустые звёзды — только контур -->
      <g
         fill="none"
         :stroke="emptyColor"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round"
      >
         <path
            d="m16 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
         />
         <path
            d="m48 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
         />
         <path
            d="m80 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
         />
         <path
            d="m112 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
         />
         <path
            d="m144 1.56-4.8 9.64h-9.6l8 6.4-4.8 12.8 11.2-8 11.2 8-4.8-12.8 8-6.4h-9.6z"
         />
      </g>

      <!-- Hover — контур акцентом -->
      <rect
         v-if="interactive && hovered !== null"
         x="0"
         y="0"
         :width="hoverWidth"
         height="32"
         :fill="fillColor"
         mask="url(#stars-mask-stroke)"
      />

      <!-- Выбранные — заливка -->
      <rect
         x="0"
         y="0"
         :width="fillWidth"
         height="32"
         :fill="fillColor"
         mask="url(#stars-mask-fill)"
      />

      <!-- Зоны клика -->
      <template v-if="interactive">
         <rect
            v-for="i in max"
            :key="i"
            :x="(i - 1) * 32"
            y="0"
            width="32"
            height="32"
            fill="transparent"
            @click="handleClick(i)"
            @mouseenter="hovered = i"
            @mouseleave="hovered = null"
         />
      </template>
   </svg>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
   defineProps<{
      value: number
      max?: number
      width?: number | string
      fillColor?: string
      emptyColor?: string
      interactive?: boolean
   }>(),
   {
      max: 5,
      width: 160,
      fillColor: 'var(--accent)',
      emptyColor: 'var(--muted-accent)',
      interactive: false,
   }
)

const emit = defineEmits<{
   'update:value': [value: number]
}>()

const hovered = ref<number | null>(null)

const fillWidth = computed(
   () => Math.min(Math.max(props.value / props.max, 0), 1) * 160
)

const hoverWidth = computed(() =>
   hovered.value !== null ? hovered.value * 32 : 0
)

function handleClick(star: number) {
   emit('update:value', star)
}
</script>
