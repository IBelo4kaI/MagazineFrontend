<template>
   <div class="products">
      <div class="title">Все товары</div>
      <div class="products__orders">
         <Tabs
            :tabs="[
               { id: 1, label: '', icon: 'fa-regular fa-grid' },
               { id: 2, label: '', icon: 'fa-regular fa-grip-lines' },
            ]"
            type="default"
            v-model="viewMode"
         />
      </div>
      <div
         ref="listRef"
         class="products__list"
         :class="{ 'one-column': viewMode == 2 }"
      >
         <template v-if="productsStore.isLoading">
            <ProductSkeleton v-for="n in SKELETON_COUNT" :key="n" />
         </template>
         <template v-else>
            <ProductListItem
               v-for="product in productsStore.items"
               :key="product.id"
               :title="product.title"
               :price="product.price"
               :rating="product.rating"
               :review-count="product.reviewCount"
               :img-url="product.imgUrl"
               :is-row-type="viewMode == 2"
            />
         </template>
      </div>
   </div>
</template>

<script lang="ts" setup>
import Tabs from '@/components/Tabs.vue'
import ProductListItem from '@/components/ProductListItem.vue'
import ProductSkeleton from '@/components/ProductListItemSkeleton.vue'
import { useProductsStore } from '@/stores/products'
import { gsap } from 'gsap'
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'

const SKELETON_COUNT = 10

const viewMode = ref(1)
const productsStore = useProductsStore()
const listRef = useTemplateRef<HTMLDivElement>('listRef')

watch(
   () => productsStore.isLoading,
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
   await productsStore.load()
})
</script>

<style scoped>
.products {
   display: grid;
   /* grid-template-areas:
      'title title'
      'filters orders'
      'filters grid'; */
   grid-template-areas:
      'title'
      'orders'
      'grid';

   /* grid-template-columns: auto 1fr; */
   grid-template-columns: auto;
   gap: var(--gap-primary);
}
.products__title {
   grid-area: title;
   font-size: 1.6rem;
   font-weight: 600;
   text-transform: uppercase;
}
.products__filter {
   grid-area: filters;
   width: 16rem;
}
.products__orders {
   grid-area: orders;
}
.products__list {
   grid-area: grid;
   display: grid;
   width: 100%;
   grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
   gap: var(--gap-secondary);
   /* border: 0.07rem solid var(--accent); */
}
.one-column {
   /* grid-template-columns: auto; */
   grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
}
</style>
