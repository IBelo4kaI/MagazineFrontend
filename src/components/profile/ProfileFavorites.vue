<template>
   <div class="page-title">Избранное</div>
   <div class="favorites-grid">
      <div v-for="item in favorites" :key="item.id" class="favorite-card">
         <div class="favorite-card__img">
            <EmptyImgCategoryIcon />
         </div>
         <div class="favorite-card__title">{{ item.title }}</div>
         <div class="favorite-card__price">{{ item.price }} ₽</div>
         <ButtonUI type="muted-accent" style="width: 100%">В корзину</ButtonUI>
      </div>
   </div>
</template>

<script lang="ts" setup>
import ButtonUI from '@/components/ButtonUI.vue'
import EmptyImgCategoryIcon from '@/components/icons/EmptyImgCategoryIcon.vue'

const favorites = [
   { id: '1', title: 'Дрель аккумуляторная Bosch', price: 4200 },
   { id: '2', title: 'Набор отвёрток 12 шт.', price: 890 },
   { id: '3', title: 'Перфоратор Makita HR2470', price: 12500 },
   { id: '4', title: 'Уровень строительный 60 см', price: 650 },
]
</script>

<style scoped>
.page-title {
   font-size: 1.4rem;
   font-weight: 700;
}
.favorites-grid {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
   gap: var(--gap-primary);
}
.favorite-card {
   display: flex;
   flex-direction: column;
   gap: var(--gap-secondary);
   border: 0.07rem solid var(--border-color);
   border-radius: var(--border-radius);
   padding: var(--padding-secondary);
   background: var(--foreground);
}
.favorite-card__img {
   width: 100%;
   aspect-ratio: 16 / 9;
   border-radius: calc(var(--border-radius) / 2);
   overflow: hidden;
}
.favorite-card__title {
   font-size: 0.9rem;
   font-weight: 500;
}
.favorite-card__price {
   font-size: 1.1rem;
   font-weight: 700;
}
</style>
