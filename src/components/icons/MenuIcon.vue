<template>
   <button
      type="button"
      :aria-label="isOpen ? 'Закрыть меню' : 'Открыть меню'"
      :aria-expanded="isOpen"
      @click="toggle"
   >
      <svg
         ref="svgRef"
         xmlns="http://www.w3.org/2000/svg"
         width="32"
         height="32"
         viewBox="0 0 32 32"
         fill="none"
         style="display: block"
      >
         <path
            ref="pathRef"
            :d="currentPath"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
         />
      </svg>
   </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(MorphSVGPlugin)

const burgerPath = 'M4,9 L28,9 M4,16 L28,16 M4,23 L28,23'
const closePath = 'M6,6 L26,26 M26,6 L6,26 M16,16 L16,16'

const isOpen = defineModel<boolean>({ default: false })

const emit = defineEmits<{
   toggle: [isOpen: boolean]
}>()

const pathRef = ref<SVGPathElement | null>(null)
const svgRef = ref<SVGSVGElement | null>(null)

const currentPath = computed(() => (isOpen.value ? closePath : burgerPath))

let isAnimating = false

const toggle = (): void => {
   if (isAnimating || !pathRef.value) return
   isAnimating = true

   const toClose = !isOpen.value

   const tl = gsap.timeline({
      onComplete: () => {
         isAnimating = false
      },
   })

   // tl.to(svgRef.value, {
   //    scale: 0.8,
   //    rotation: toClose ? 90 : -90,
   //    duration: 0.1,
   //    ease: 'power2.in',
   //    transformOrigin: '50% 50%',
   // })

   tl.to(pathRef.value, {
      morphSVG: toClose ? closePath : burgerPath,
      duration: 0.2,
      ease: 'power3.inOut',
   })

   // tl.to(
   //    svgRef.value,
   //    {
   //       scale: 1,
   //       rotation: toClose ? 180 : 0,
   //       duration: 0.2,
   //       ease: 'back.out(1.8)',
   //       transformOrigin: '50% 50%',
   //    },
   //    '<0.1'
   // )

   tl.call(() => {
      isOpen.value = !isOpen.value
      emit('toggle', isOpen.value)
   })
}
</script>
