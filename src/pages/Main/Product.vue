<template>
   <div class="product-page">
      <!-- Хлебные крошки -->
      <nav class="breadcrumbs">
         <span>Каталог</span>
         <span class="breadcrumbs__sep">/</span>
         <span>Инструменты</span>
         <span class="breadcrumbs__sep">/</span>
         <span class="breadcrumbs__current">Дрель аккумуляторная Bosch</span>
      </nav>

      <!-- Основной блок -->
      <div class="product-main">
         <!-- Галерея -->
         <div class="product-gallery">
            <div class="product-gallery__main">
               <EmptyImgCategoryIcon />
            </div>
            <div class="product-gallery__thumbs">
               <div class="product-gallery__thumb" v-for="n in 4" :key="n" />
            </div>
         </div>

         <!-- Инфо -->
         <div class="product-info">
            <div class="product-info__badges">
               <span class="badge badge--new">Новинка</span>
               <span class="badge badge--sale">−15%</span>
            </div>

            <h1 class="product-info__title">
               Дрель аккумуляторная Bosch GSR 18V-55
            </h1>

            <div class="product-info__rating">
               <Rating :value="4.5" width="7rem" />
               <span class="product-info__reviews-count">38 отзывов</span>
            </div>

            <div class="product-info__price-block">
               <span class="product-info__price">4 200 ₽</span>
               <span class="product-info__price-old">4 950 ₽</span>
            </div>

            <p class="product-info__desc">
               Аккумуляторная дрель-шуруповёрт с бесщёточным двигателем.
               Мощность 55 Нм, два скоростных режима, встроенный светодиодный
               фонарь. Подходит для работ по дереву, металлу и пластику.
            </p>

            <div class="product-info__attrs">
               <div class="product-info__attr">
                  <span class="product-info__attr-label">Мощность</span>
                  <span class="product-info__attr-dots" />
                  <span class="product-info__attr-value">55 Нм</span>
               </div>
               <div class="product-info__attr">
                  <span class="product-info__attr-label">Напряжение</span>
                  <span class="product-info__attr-dots" />
                  <span class="product-info__attr-value">18 В</span>
               </div>
               <div class="product-info__attr">
                  <span class="product-info__attr-label">Вес</span>
                  <span class="product-info__attr-dots" />
                  <span class="product-info__attr-value">1.4 кг</span>
               </div>
               <div class="product-info__attr">
                  <span class="product-info__attr-label">Гарантия</span>
                  <span class="product-info__attr-dots" />
                  <span class="product-info__attr-value">2 года</span>
               </div>
            </div>

            <div class="product-info__quantity">
               <button class="qty-btn" @click="qty > 1 && qty--">−</button>
               <span class="qty-value">{{ qty }}</span>
               <button class="qty-btn" @click="qty++">+</button>
            </div>

            <div class="product-info__actions">
               <ButtonUI style="flex: 1" type="muted-accent">
                  <i class="fa-regular fa-cart-shopping" />
                  В корзину
               </ButtonUI>
               <ButtonUI style="flex: 1">Купить сейчас</ButtonUI>
               <BookmarkIcon />
            </div>

            <div class="product-info__delivery">
               <div class="delivery-item">
                  <i class="fa-regular fa-truck" />
                  <span>Доставка от 1 дня</span>
               </div>
               <div class="delivery-item">
                  <i class="fa-regular fa-rotate-left" />
                  <span>Возврат 14 дней</span>
               </div>
            </div>
         </div>
      </div>

      <!-- Отзывы -->
      <div class="product-reviews">
         <div class="product-reviews__header">
            <h2 class="product-reviews__title">Отзывы</h2>
            <ButtonUI type="muted-accent">Написать отзыв</ButtonUI>
         </div>

         <div class="product-reviews__summary">
            <div class="reviews-summary__score">4.5</div>
            <div class="reviews-summary__right">
               <Rating :value="4.5" width="8rem" />
               <span class="reviews-summary__count">38 отзывов</span>
               <div class="reviews-summary__bars">
                  <div class="bar-row" v-for="(val, i) in bars" :key="i">
                     <span class="bar-row__label">{{ 5 - i }} ★</span>
                     <div class="bar-row__track">
                        <div
                           class="bar-row__fill"
                           :style="{ width: val + '%' }"
                        />
                     </div>
                     <span class="bar-row__pct">{{ val }}%</span>
                  </div>
               </div>
            </div>
         </div>

         <div class="product-reviews__list">
            <div class="review" v-for="review in reviews" :key="review.id">
               <div class="review__header">
                  <div class="review__avatar">{{ review.name[0] }}</div>
                  <div class="review__meta">
                     <span class="review__name">{{ review.name }}</span>
                     <span class="review__date">{{ review.date }}</span>
                  </div>
                  <Rating :value="review.rating" width="5rem" />
               </div>
               <p class="review__text">{{ review.text }}</p>
               <div class="review__helpful">
                  <span>Полезно?</span>
                  <button class="helpful-btn">👍 {{ review.likes }}</button>
                  <button class="helpful-btn">👎</button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ButtonUI from '@/components/ButtonUI.vue'
import BookmarkIcon from '@/components/icons/BookmarkIcon.vue'
import EmptyImgCategoryIcon from '@/components/icons/EmptyImgCategoryIcon.vue'
import Rating from '@/components/Rating.vue'

const qty = ref(1)

const bars = [62, 20, 10, 5, 3]

const reviews = [
   {
      id: 1,
      name: 'Алексей К.',
      date: '12 февраля 2025',
      rating: 5,
      text: 'Отличная дрель, работает тихо, держит заряд долго. Уже второй месяц пользуюсь каждый день — никаких нареканий.',
      likes: 12,
   },
   {
      id: 2,
      name: 'Марина В.',
      date: '3 января 2025',
      rating: 4,
      text: 'Хорошее качество сборки, удобно лежит в руке. Немного жаль что в комплекте только один аккумулятор.',
      likes: 7,
   },
   {
      id: 3,
      name: 'Дмитрий П.',
      date: '18 декабря 2024',
      rating: 5,
      text: 'Брал для ремонта квартиры. Справилась со всем — и гипсокартон, и плитка, и металл. Рекомендую.',
      likes: 19,
   },
]
</script>

<style scoped>
.product-page {
   display: flex;
   flex-direction: column;
   gap: calc(var(--gap-primary) * 2);
   /* max-width: 72rem; */
   padding: var(--padding-primary) 0;
}

/* Хлебные крошки */
.breadcrumbs {
   display: flex;
   align-items: center;
   gap: var(--gap-secondary);
   font-size: 0.85rem;
   color: var(--muted-text);
}
.breadcrumbs__sep {
   opacity: 0.4;
}
.breadcrumbs__current {
   color: var(--text);
}

/* Основной блок */
.product-main {
   display: grid;
   grid-template-columns: 1fr 2fr;
   gap: calc(var(--gap-primary) * 2);
}

/* Галерея */
.product-gallery {
   display: flex;
   flex-direction: column;
   gap: var(--gap-secondary);
}
.product-gallery__main {
   width: 100%;
   aspect-ratio: 1;
   background: var(--foreground);
   border-radius: var(--border-radius);
   border: 0.07rem solid var(--border-color);
   display: flex;
   align-items: center;
   justify-content: center;
   overflow: hidden;
}
.product-gallery__thumbs {
   display: flex;
   gap: var(--gap-secondary);
}
.product-gallery__thumb {
   width: 4rem;
   height: 4rem;
   border-radius: calc(var(--border-radius) / 2);
   border: 0.07rem solid var(--border-color);
   background: var(--foreground);
   cursor: pointer;
   transition: border-color 0.2s ease;
}
.product-gallery__thumb:hover {
   border-color: var(--accent);
}

/* Инфо */
.product-info {
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
}
.product-info__badges {
   display: flex;
   gap: var(--gap-secondary);
}
.badge {
   font-size: 0.75rem;
   font-weight: 600;
   padding: 0.2rem 0.6rem;
   border-radius: 2rem;
}
.badge--new {
   background: var(--muted-accent);
   color: var(--on-muted-accent);
}
.badge--sale {
   background: var(--muted-destructive);
   color: var(--destructive);
}
.product-info__title {
   font-size: 1.4rem;
   font-weight: 700;
   line-height: 1.3;
   margin: 0;
}
.product-info__rating {
   display: flex;
   align-items: center;
   gap: var(--gap-secondary);
}
.product-info__reviews-count {
   font-size: 0.85rem;
   color: var(--muted-text);
}
.product-info__price-block {
   display: flex;
   align-items: baseline;
   gap: var(--gap-primary);
}
.product-info__price {
   font-size: 2rem;
   font-weight: 700;
   color: var(--text);
}
.product-info__price-old {
   font-size: 1rem;
   color: var(--muted-text);
   text-decoration: line-through;
}
.product-info__desc {
   font-size: 0.9rem;
   line-height: 1.6;
   color: var(--muted-text);
   margin: 0;
}

/* Атрибуты */
.product-info__attrs {
   display: flex;
   flex-direction: column;
   gap: var(--gap-secondary);
   padding: var(--padding-secondary);
   background: var(--muted-foreground);
   border-radius: var(--border-radius);
}
.product-info__attr {
   display: flex;
   align-items: baseline;
   gap: var(--gap-secondary);
   font-size: 0.875rem;
}
.product-info__attr-label {
   color: var(--muted-text);
   white-space: nowrap;
}
.product-info__attr-dots {
   flex: 1;
   border-bottom: 0.07rem dashed var(--border-color);
   margin-bottom: 0.2rem;
}
.product-info__attr-value {
   font-weight: 600;
   white-space: nowrap;
}

/* Количество */
.product-info__quantity {
   display: flex;
   align-items: center;
   gap: var(--gap-primary);
}
.qty-btn {
   width: 2rem;
   height: 2rem;
   border-radius: calc(var(--border-radius) / 2);
   border: 0.07rem solid var(--border-color);
   background: var(--foreground);
   color: var(--text);
   font-size: 1.1rem;
   cursor: pointer;
   transition:
      border-color 0.2s ease,
      background 0.2s ease;
}
.qty-btn:hover {
   border-color: var(--accent);
   background: var(--muted-accent);
}
.qty-value {
   font-size: 1rem;
   font-weight: 600;
   min-width: 1.5rem;
   text-align: center;
}

/* Кнопки */
.product-info__actions {
   display: flex;
   align-items: center;
   gap: var(--gap-secondary);
}

/* Доставка */
.product-info__delivery {
   display: flex;
   gap: var(--gap-primary);
   padding: var(--padding-secondary);
   border-radius: var(--border-radius);
   border: 0.07rem solid var(--border-color);
}
.delivery-item {
   display: flex;
   align-items: center;
   gap: var(--gap-secondary);
   font-size: 0.85rem;
   color: var(--muted-text);
   flex: 1;
}
.delivery-item i {
   color: var(--accent);
}

/* Отзывы */
.product-reviews {
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
}
.product-reviews__header {
   display: flex;
   align-items: center;
   justify-content: space-between;
}
.product-reviews__title {
   font-size: 1.2rem;
   font-weight: 700;
   margin: 0;
}
.product-reviews__summary {
   display: flex;
   align-items: center;
   gap: calc(var(--gap-primary) * 2);
   padding: var(--padding-primary);
   background: var(--foreground);
   border-radius: var(--border-radius);
   border: 0.07rem solid var(--border-color);
}
.reviews-summary__score {
   font-size: 3.5rem;
   font-weight: 700;
   line-height: 1;
   color: var(--accent);
}
.reviews-summary__right {
   display: flex;
   flex-direction: column;
   gap: var(--gap-secondary);
   flex: 1;
}
.reviews-summary__count {
   font-size: 0.85rem;
   color: var(--muted-text);
}
.reviews-summary__bars {
   display: flex;
   flex-direction: column;
   gap: 0.3rem;
}
.bar-row {
   display: flex;
   align-items: center;
   gap: var(--gap-secondary);
   font-size: 0.8rem;
}
.bar-row__label {
   color: var(--muted-text);
   width: 2rem;
}
.bar-row__track {
   flex: 1;
   height: 0.4rem;
   background: var(--border-color);
   border-radius: 2rem;
   overflow: hidden;
}
.bar-row__fill {
   height: 100%;
   background: var(--accent);
   border-radius: 2rem;
   transition: width 0.4s ease;
}
.bar-row__pct {
   color: var(--muted-text);
   width: 2.5rem;
   text-align: right;
}

/* Карточки отзывов */
.product-reviews__list {
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
}
.review {
   display: flex;
   flex-direction: column;
   gap: var(--gap-secondary);
   padding: var(--padding-primary);
   background: var(--foreground);
   border-radius: var(--border-radius);
   border: 0.07rem solid var(--border-color);
}
.review__header {
   display: flex;
   align-items: center;
   gap: var(--gap-primary);
}
.review__avatar {
   width: 2.4rem;
   height: 2.4rem;
   border-radius: 50%;
   background: var(--muted-accent);
   color: var(--on-muted-accent);
   display: flex;
   align-items: center;
   justify-content: center;
   font-weight: 700;
   font-size: 1rem;
   flex-shrink: 0;
}
.review__meta {
   display: flex;
   flex-direction: column;
   gap: 0.1rem;
   flex: 1;
}
.review__name {
   font-weight: 600;
   font-size: 0.9rem;
}
.review__date {
   font-size: 0.8rem;
   color: var(--muted-text);
}
.review__text {
   font-size: 0.9rem;
   line-height: 1.6;
   color: var(--text);
   margin: 0;
}
.review__helpful {
   display: flex;
   align-items: center;
   gap: var(--gap-secondary);
   font-size: 0.8rem;
   color: var(--muted-text);
}
.helpful-btn {
   background: none;
   border: 0.07rem solid var(--border-color);
   border-radius: 2rem;
   padding: 0.15rem 0.6rem;
   cursor: pointer;
   font-size: 0.8rem;
   color: var(--muted-text);
   transition: border-color 0.2s ease;
}
.helpful-btn:hover {
   border-color: var(--accent);
}

@media (max-width: 48rem) {
   .product-main {
      grid-template-columns: 1fr;
   }
}
</style>
