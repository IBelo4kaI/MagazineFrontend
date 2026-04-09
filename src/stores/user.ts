import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
   const user = ref<{ email: string }>({ email: 'example.com' })
   const isAuth = ref(false)
   const isEmployee = computed(() => false)

   return {
      user,
      isAuth,
      isEmployee,
   }
})
