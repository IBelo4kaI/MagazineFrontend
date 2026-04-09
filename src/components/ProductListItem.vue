<template>
   <div class="product-item" :class="{ rowType: isRowType }">
      <div class="product-item__img">
         <EmptyImgCategoryIcon />
      </div>
      <div class="product-item__title">
         {{ title }}
      </div>
      <div class="product-item__rating">
         <Rating :value="rating" width="6rem" />
         <span>{{ reviewCount }} отзыва</span>
      </div>
      <div class="product-item__price">{{ price }} ₽</div>
      <div class="product-item__actions">
         <ButtonUI>В корзину</ButtonUI>
         <BookmarkIcon />
      </div>
   </div>
</template>

<script lang="ts" setup>
import ButtonUI from './ButtonUI.vue'
import BookmarkIcon from './icons/BookmarkIcon.vue'
import EmptyImgCategoryIcon from './icons/EmptyImgCategoryIcon.vue'
import Rating from './Rating.vue'

withDefaults(
   defineProps<{
      title: string
      price: number
      rating: number
      reviewCount: number
      imgUrl?: string
      isRowType?: boolean
   }>(),
   {
      isRowType: false,
   }
)
</script>

<style scoped>
.product-item {
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
   min-width: 14rem;
   max-width: 20rem;
   min-height: 14rem;
   /* max-height: 20rem; */
   justify-content: space-between;
   border: 0.07rem solid var(--border-color);

   background: var(--foreground);

   padding: var(--padding-secondary);
   border-radius: var(--border-radius);
   border: 0.07rem solid var(--border-color);
}
.rowType {
   max-width: 100%;
   display: grid;
}
.product-item__img {
   /* height: 50%; */
}
.product-item__title {
   font-size: 0.9rem;
   font-weight: 500;
}
.product-item__rating {
   display: flex;
   align-items: center;
   gap: var(--gap-secondary);
}
.product-item__rating span {
   font-size: 0.8rem;
   color: var(--muted-text);
}
.product-item__price {
   font-size: 1.4rem;
   font-weight: 700;
}
.product-item__actions {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: var(--gap-secondary);
}
</style>
