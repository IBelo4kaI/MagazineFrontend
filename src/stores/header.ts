import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHeaderStore = defineStore('header', () => {
   const title = ref<string | null>('Заголовок')
   const description = ref<string | null>('Описание')

   function setTitle(newTitle: string | null, newDecs: string | null) {
      if (newTitle != '' && newTitle != ' ') title.value = newTitle
      if (newDecs != '' && newDecs != ' ') description.value = newDecs
   }

   return {
      title,
      description,
      setTitle,
   }
})
