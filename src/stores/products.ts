import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Product {
   id: string
   title: string
   price: number
   rating: number
   reviewCount: number
   imgUrl?: string
}

async function fetchProducts(): Promise<Product[]> {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve([
            {
               id: '1',
               title: 'Дрель аккумуляторная Bosch',
               price: 4200,
               rating: 4.5,
               reviewCount: 38,
            },
            {
               id: '2',
               title: 'Набор отвёрток 12 шт.',
               price: 890,
               rating: 4.2,
               reviewCount: 22,
            },
            {
               id: '3',
               title: 'Уровень строительный 60 см',
               price: 650,
               rating: 3.8,
               reviewCount: 10,
            },
            {
               id: '4',
               title: 'Перфоратор Makita HR2470',
               price: 12500,
               rating: 4.9,
               reviewCount: 74,
            },
            {
               id: '5',
               title: 'Рулетка 5м',
               price: 310,
               rating: 4.0,
               reviewCount: 15,
            },
            {
               id: '6',
               title: 'Шуруповёрт Dewalt 18V',
               price: 7800,
               rating: 4.7,
               reviewCount: 56,
            },
            {
               id: '7',
               title: 'Ножовка по дереву 500мм',
               price: 420,
               rating: 3.5,
               reviewCount: 8,
            },
            {
               id: '8',
               title: 'Набор гаечных ключей 10 шт.',
               price: 1100,
               rating: 4.3,
               reviewCount: 31,
            },
         ])
      }, 1200)
   })
}

export const useProductsStore = defineStore('products', () => {
   const items = ref<Product[]>([])
   const isLoading = ref<boolean>(false)
   const error = ref<string | null>(null)

   const load = async (): Promise<void> => {
      // if (items.value.length) return
      isLoading.value = true
      error.value = null

      try {
         items.value = await fetchProducts()
      } catch {
         error.value = 'Не удалось загрузить товары'
      } finally {
         isLoading.value = false
      }
   }

   return { items, isLoading, error, load }
})
