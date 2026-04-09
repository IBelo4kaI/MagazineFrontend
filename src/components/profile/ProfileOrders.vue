<template>
   <div class="page-title">Мои заказы</div>

   <div class="orders-list">
      <div
         v-for="order in orders"
         :key="order.id"
         class="order-card"
         :class="{ expanded: expandedId === order.id }"
      >
         <!-- Шапка заказа -->
         <div class="order-card__header" @click="toggle(order.id)">
            <div class="order-card__main">
               <div class="order-card__top">
                  <span class="order-card__number">Заказ № {{ order.id }}</span>
                  <span class="order-card__status" :class="order.status">
                     {{ statusLabel[order.status] }}
                  </span>
               </div>
               <div class="order-card__meta">
                  <span>{{ order.date }}</span>
                  <span>{{ order.items.length }} товара</span>
                  <span class="order-card__price">{{ order.total }} ₽</span>
               </div>
            </div>
            <i
               class="fa-regular fa-chevron-down order-card__chevron"
               :class="{ rotated: expandedId === order.id }"
            />
         </div>

         <!-- Разворачивающийся список товаров -->
         <div class="order-card__body" :ref="(el) => setRef(order.id, el)">
            <div class="order-items">
               <div
                  v-for="item in order.items"
                  :key="item.id"
                  class="order-item"
               >
                  <div class="order-item__img">
                     <EmptyImgCategoryIcon />
                  </div>
                  <div class="order-item__info">
                     <div class="order-item__title">{{ item.title }}</div>
                     <div class="order-item__qty">
                        {{ item.qty }} шт. × {{ item.price }} ₽
                     </div>
                  </div>
                  <div class="order-item__total">
                     {{ item.qty * item.price }} ₽
                  </div>
               </div>
            </div>

            <!-- Действия -->
            <div class="order-card__actions">
               <ButtonUI
                  v-if="order.status === 'delivered'"
                  type="muted-accent"
                  @click.stop="openReview(order.id)"
               >
                  <i class="fa-regular fa-star"></i>
                  Оценить заказ
               </ButtonUI>
            </div>
         </div>
      </div>
   </div>

   <!-- Модалка отзыва -->
   <Transition @enter="onModalEnter" @leave="onModalLeave" :css="false">
      <div
         v-if="reviewOrderId"
         class="modal-overlay"
         @click.self="reviewOrderId = null"
      >
         <div class="modal">
            <div class="modal__title">Оценить заказ № {{ reviewOrderId }}</div>
            <div class="modal__rating">
               <div class="modal__rating-label">Ваша оценка</div>
               <Rating
                  v-model:value="reviewRating"
                  :max="5"
                  width="10rem"
                  interactive
               />
            </div>
            <InputUi v-model="reviewText" label="Комментарий к заказу" />
            <div class="modal__actions">
               <ButtonUI type="muted-accent" @click="submitReview">
                  Отправить
               </ButtonUI>
               <ButtonUI type="inline" @click="reviewOrderId = null">
                  Отмена
               </ButtonUI>
            </div>
         </div>
      </div>
   </Transition>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import ButtonUI from '@/components/ButtonUI.vue'
import InputUi from '@/components/InputUi.vue'
import EmptyImgCategoryIcon from '@/components/icons/EmptyImgCategoryIcon.vue'
import Rating from '@/components/Rating.vue'

type OrderStatus = 'pending' | 'delivered' | 'cancelled'

interface OrderItem {
   id: string
   title: string
   qty: number
   price: number
}

interface Order {
   id: string
   date: string
   status: OrderStatus
   total: number
   items: OrderItem[]
}

const statusLabel: Record<OrderStatus, string> = {
   pending: 'В обработке',
   delivered: 'Доставлен',
   cancelled: 'Отменён',
}

const orders: Order[] = [
   {
      id: '10421',
      date: '12.03.2026',
      status: 'delivered',
      total: 4800,
      items: [
         { id: '1', title: 'Дрель аккумуляторная Bosch', qty: 1, price: 4200 },
         { id: '2', title: 'Набор отвёрток 12 шт.', qty: 1, price: 600 },
      ],
   },
   {
      id: '10398',
      date: '01.03.2026',
      status: 'pending',
      total: 1200,
      items: [
         { id: '3', title: 'Рулетка 5м', qty: 2, price: 310 },
         { id: '4', title: 'Уровень строительный 60 см', qty: 1, price: 580 },
      ],
   },
   {
      id: '10301',
      date: '14.02.2026',
      status: 'cancelled',
      total: 9200,
      items: [
         { id: '5', title: 'Перфоратор Makita HR2470', qty: 1, price: 9200 },
      ],
   },
]

// ─── Разворачивание ──────────────────────────────────────
const expandedId = ref<string | null>(null)
const formRefs = new Map<string, HTMLElement>()

function setRef(id: string, el: unknown) {
   if (el) formRefs.set(id, el as HTMLElement)
   else formRefs.delete(id)
}

async function toggle(id: string) {
   const isOpen = expandedId.value === id

   if (expandedId.value) {
      const el = formRefs.get(expandedId.value)
      if (el) {
         await new Promise<void>((resolve) => {
            gsap.to(el, {
               height: 0,
               opacity: 0,
               duration: 0.3,
               ease: 'power2.inOut',
               onComplete: resolve,
            })
         })
      }
   }

   expandedId.value = isOpen ? null : id

   if (!isOpen) {
      await nextTick()
      const el = formRefs.get(id)
      if (el) {
         gsap.fromTo(
            el,
            { height: 0, opacity: 0 },
            {
               height: el.scrollHeight,
               opacity: 1,
               duration: 0.35,
               ease: 'power2.out',
               onComplete: () => {
                  gsap.set(el, { height: 'auto' })
               },
            }
         )
      }
   }
}

// ─── Отзыв ──────────────────────────────────────────────
const reviewOrderId = ref<string | null>(null)
const reviewRating = ref(0)
const reviewText = ref('')

function openReview(id: string) {
   reviewOrderId.value = id
   reviewRating.value = 0
   reviewText.value = ''
}

function submitReview() {
   // TODO: отправить на сервер
   reviewOrderId.value = null
}

function onModalEnter(el: Element, done: () => void) {
   gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 })
   gsap.fromTo(
      (el as HTMLElement).querySelector('.modal')!,
      { opacity: 0, y: -20, scale: 0.97 },
      {
         opacity: 1,
         y: 0,
         scale: 1,
         duration: 0.3,
         ease: 'power2.out',
         onComplete: done,
      }
   )
}

function onModalLeave(el: Element, done: () => void) {
   gsap.to(el, { opacity: 0, duration: 0.2, onComplete: done })
}
</script>

<style scoped>
.page-title {
   font-size: 1.4rem;
   font-weight: 700;
}

.orders-list {
   display: flex;
   flex-direction: column;
   gap: var(--gap-secondary);
   max-width: 48rem;
}

/* ─── Card ───────────────────────────────── */
.order-card {
   border: 0.07rem solid var(--border-color);
   border-radius: var(--border-radius);
   background: var(--foreground);
   overflow: hidden;
   transition: border-color 0.2s ease;
}

.order-card.expanded {
   border-color: var(--accent);
}

.order-card__header {
   display: flex;
   align-items: center;
   gap: var(--gap-primary);
   padding: var(--padding-secondary) var(--padding-primary);
   cursor: pointer;
   user-select: none;
}

.order-card__main {
   flex: 1;
}

.order-card__top {
   display: flex;
   align-items: center;
   gap: var(--gap-secondary);
   margin-bottom: var(--gap-secondary);
}

.order-card__number {
   font-weight: 600;
}

.order-card__status {
   font-size: 0.8rem;
   font-weight: 600;
   padding: 0.2rem 0.6rem;
   border-radius: calc(var(--border-radius) / 2);
}

.order-card__status.delivered {
   background: var(--muted-success);
   color: var(--on-muted-accent);
}
.order-card__status.pending {
   background: var(--muted-warn);
   color: var(--warn);
}
.order-card__status.cancelled {
   background: var(--muted-destructive);
   color: var(--destructive);
}

.order-card__meta {
   display: flex;
   gap: var(--gap-primary);
   font-size: 0.85rem;
   color: var(--muted-text);
}

.order-card__price {
   font-weight: 700;
   color: var(--text);
}

.order-card__chevron {
   color: var(--muted-text);
   font-size: 0.85rem;
   transition: transform 0.3s ease;
   flex-shrink: 0;
}
.order-card__chevron.rotated {
   transform: rotate(180deg);
}

/* ─── Body ───────────────────────────────── */
.order-card__body {
   height: 0;
   opacity: 0;
   overflow: hidden;
}

.order-card.expanded .order-card__body {
   padding-bottom: var(--padding-secondary);
}

.order-items {
   display: flex;
   flex-direction: column;
   border-top: 0.07rem solid var(--border-color);
}

/* ─── Item ───────────────────────────────── */
.order-item {
   display: flex;
   align-items: center;
   gap: var(--gap-primary);
   padding: var(--padding-secondary) var(--padding-primary);
   border-bottom: 0.07rem solid var(--border-color);
}

.order-item__img {
   width: 3.5rem;
   height: 3.5rem;
   flex-shrink: 0;
   border-radius: calc(var(--border-radius) / 2);
   overflow: hidden;
}

.order-item__info {
   flex: 1;
}
.order-item__title {
   font-size: 0.9rem;
   font-weight: 500;
}
.order-item__qty {
   font-size: 0.8rem;
   color: var(--muted-text);
   margin-top: 0.2rem;
}

.order-item__total {
   font-weight: 700;
   font-size: 0.95rem;
   flex-shrink: 0;
}

/* ─── Actions ────────────────────────────── */
.order-card__actions {
   display: flex;
   gap: var(--gap-secondary);
   padding: var(--padding-secondary) var(--padding-primary) 0;
}

/* ─── Modal ──────────────────────────────── */
.modal-overlay {
   position: fixed;
   inset: 0;
   background: rgba(0, 0, 0, 0.4);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 1000;
}

.modal {
   background: var(--foreground);
   border: 0.07rem solid var(--border-color);
   border-radius: var(--border-radius);
   padding: var(--padding-primary);
   width: min(32rem, 90vw);
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
}

.modal__title {
   font-size: 1.1rem;
   font-weight: 700;
}

.modal__rating-label {
   font-size: 0.8rem;
   color: var(--muted-text);
   margin-bottom: var(--gap-secondary);
}

.modal__actions {
   display: flex;
   gap: var(--gap-secondary);
}
</style>
