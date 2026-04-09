<template>
   <div class="catalog">
      <div class="title">Каталог</div>
      <div ref="listRef" class="category__list">
         <template v-if="categoriesStore.isLoading">
            <CategorySkeleton v-for="n in SKELETON_COUNT" :key="n" />
         </template>
         <template v-else>
            <CategoryItem
               v-for="cat in categoriesStore.items"
               :key="cat.id"
               :title="cat.name"
            />
         </template>
      </div>
   </div>
</template>

<script lang="ts" setup>
import CategoryItem from '@/components/CategoryItem.vue'
import CategorySkeleton from '@/components/CategorySkeleton.vue'
import { useCategoriesStore } from '@/stores/categories'
import { gsap } from 'gsap'
import { nextTick, onMounted, useTemplateRef, watch } from 'vue'

const SKELETON_COUNT = 10

const categoriesStore = useCategoriesStore()
const listRef = useTemplateRef<HTMLDivElement>('listRef')

watch(
   () => categoriesStore.isLoading,
   async () => {
      await nextTick()
      if (!listRef.value) return
      gsap.fromTo(
         listRef.value.children,
         { opacity: 0, y: 16 },
         {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger: { each: 0.06, from: 'start' },
         }
      )
   }
)

onMounted(async () => {
   await categoriesStore.load()
})
</script>

<style scoped>
.catalog {
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
}
.category__list {
   display: grid;
   width: 100%;
   grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
   gap: var(--gap-secondary);
}
</style>
