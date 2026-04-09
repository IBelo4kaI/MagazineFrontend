<template>
   <svg
      width="100%"
      height="100%"
      viewBox="14 10 252 188"
      xmlns="http://www.w3.org/2000/svg"
   >
      <g>
         <path
            d="M 20 40 L 20 24 Q 20 16 28 16 L 44 16"
            class="stroke-muted"
            stroke-width="2"
            stroke-linecap="round"
            fill="none"
         />
         <path
            d="M 236 16 L 252 16 Q 260 16 260 24 L 260 40"
            class="stroke-muted"
            stroke-width="2"
            stroke-linecap="round"
            fill="none"
         />
         <path
            d="M 20 160 L 20 176 Q 20 184 28 184 L 44 184"
            class="stroke-muted"
            stroke-width="2"
            stroke-linecap="round"
            fill="none"
         />
         <path
            d="M 236 184 L 252 184 Q 260 184 260 176 L 260 160"
            class="stroke-muted"
            stroke-width="2"
            stroke-linecap="round"
            fill="none"
         />
         <circle cx="70" cy="60" r="18" class="fill-muted" />
         <polyline
            points="40,155 95,80 140,140 175,105 240,155"
            class="stroke-muted"
            stroke-width="2"
            stroke-linejoin="round"
            fill="none"
         />
      </g>

      <!-- loader -->
      <g v-if="loading">
         <circle
            ref="loader"
            cx="140"
            cy="160"
            r="10"
            class="loader"
            stroke-width="2"
            fill="none"
         />
         <text x="140" y="190" text-anchor="middle" class="label">
            Загрузка
         </text>
      </g>

      <!-- empty -->
      <text v-else x="140" y="190" text-anchor="middle" class="label">
         Нет изображения
      </text>
   </svg>
</template>

<script setup lang="ts">
import { watch, onUnmounted, nextTick, useTemplateRef, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{
   loading?: boolean
}>()

const loader = useTemplateRef<SVGCircleElement>('loader')

let tween: gsap.core.Tween | null = null

function startSpin() {
   if (!loader.value) return

   const circumference = 2 * Math.PI * 10 // 62.8

   gsap.set(loader.value, {
      attr: {
         'stroke-dasharray': circumference,
         'stroke-dashoffset': circumference, // полностью скрыт
      },
   })

   const tl = gsap.timeline({ repeat: -1 })

   // 1. Круг появляется — dashoffset от circumference до 0
   tl.to(loader.value, {
      attr: { 'stroke-dashoffset': 0 },
      duration: 1,
      ease: 'power1.inOut',
   })
      // 2. Круг скрывается в том же направлении — вращаем + снова прячем
      .to(loader.value, {
         attr: { 'stroke-dashoffset': -circumference },
         duration: 1,
         ease: 'power1.inOut',
      })

   tween = tl as unknown as gsap.core.Tween
}

function stopSpin() {
   tween?.kill()
   tween = null
}

watch(
   () => props.loading,
   async (v) => {
      if (v) {
         await nextTick() // ждём пока v-if отрендерит circle
         startSpin()
      } else {
         stopSpin()
      }
   }
)

onMounted(async () => {
   if (props.loading) {
      await nextTick()
      startSpin()
   }
})

onUnmounted(() => stopSpin())
</script>

<style scoped>
.stroke-muted {
   stroke: var(--accent);
}
.fill-muted {
   fill: var(--accent);
}
.label {
   fill: var(--accent);
   font-size: 1.5rem;
   font-family: system-ui, sans-serif;
   opacity: 0.8;
}
.loader {
   stroke: var(--accent);
}
</style>
