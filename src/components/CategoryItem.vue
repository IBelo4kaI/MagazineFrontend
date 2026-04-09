<template>
   <div
      class="category"
      ref="cardRef"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
   >
      <div class="category__img">
         <img v-if="imgUrl" :src="imgUrl" alt="" />
         <EmptyImgCategoryIcon :loading="imgUrl != undefined" />
      </div>
      <div class="category__title">{{ title }}</div>
   </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'
import { useTemplateRef } from 'vue'
import EmptyImgCategoryIcon from './icons/EmptyImgCategoryIcon.vue'

interface Props {
   title: string
   imgUrl?: string
}

const props = defineProps<Props>()

const cardRef = useTemplateRef<HTMLDivElement>('cardRef')

function onEnter() {
   gsap.to(cardRef.value, {
      borderColor: 'var(--accent)',
      y: -4,
      duration: 0.3,
      ease: 'power2.out',
   })
}

function onLeave() {
   gsap.to(cardRef.value, {
      borderColor: 'var(--border-color)',
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
   })
}
</script>

<style scoped>
.category {
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
   min-width: 14rem;
   max-width: 20rem;
   background: var(--foreground);
   padding: var(--padding-primary);
   border-radius: var(--border-radius);
   border: 0.07rem solid var(--border-color);
}
.category:hover {
   cursor: pointer;
}
.category__img {
   /* flex: 1; */
   height: 8rem;
}
.category__title {
   font-size: 1.2rem;
   font-weight: 600;
   flex: 1;
   text-wrap-mode: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}
</style>
