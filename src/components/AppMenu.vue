<template>
   <nav class="app-menu">
      <MenuIcon ref="iconRef" v-model="menuStore.isOpen" />

      <Transition name="dropdown">
         <div v-if="menuStore.isOpen" class="dropdown" ref="dropdownRef">
            <div v-if="menuStore.isLoading" class="dropdown__state">
               Загрузка...
            </div>
            <div
               v-else-if="menuStore.error"
               class="dropdown__state dropdown__state--error"
            >
               {{ menuStore.error }}
            </div>
            <ul v-else class="dropdown__list">
               <MenuItemNode
                  v-for="item in menuStore.items"
                  :key="item.id"
                  :item="item"
                  @navigate="menuStore.close()"
               />
            </ul>
         </div>
      </Transition>
   </nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import MenuIcon from './icons/MenuIcon.vue'
import MenuItemNode from './MenuItemNode.vue'
import { useMenuStore } from '@/stores/menuStore'

const menuStore = useMenuStore()
const dropdownRef = ref<HTMLElement | null>(null)
const iconRef = ref<InstanceType<typeof MenuIcon> | null>(null)

const onClickOutside = (e: MouseEvent): void => {
   const target = e.target as Node

   // игнорируем клики на саму иконку
   if (iconRef.value?.$el.contains(target)) return

   if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
      menuStore.close()
   }
}

const onKeydown = (e: KeyboardEvent): void => {
   if (e.key === 'Escape') menuStore.close()
}

watch(
   () => menuStore.isOpen,
   (val) => {
      if (val) {
         document.addEventListener('mousedown', onClickOutside)
         document.addEventListener('keydown', onKeydown)
      } else {
         document.removeEventListener('mousedown', onClickOutside)
         document.removeEventListener('keydown', onKeydown)
      }
   }
)

onBeforeUnmount(() => {
   document.removeEventListener('mousedown', onClickOutside)
   document.removeEventListener('keydown', onKeydown)
})

onMounted(() => menuStore.load())
</script>

<style scoped>
.app-menu {
   position: relative;
   display: flex;
   align-items: center; /* ← выравнивает по высоте родителя */
   align-self: stretch; /* ← растягивается на всю высоту header */
}

.dropdown {
   position: absolute;
   top: calc(100% + 8px);
   left: 0;
   min-width: 220px;
   background: var(--foreground, #fff);
   border: 1px solid var(--border-color, #e2e8f0);
   border-radius: var(--border-radius, 8px);
   box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
   z-index: 100;
   overflow: hidden;
}

.dropdown__state {
   padding: 16px;
   font-size: 0.875rem;
   color: var(--muted-text);
}

.dropdown__state--error {
   color: var(--destructive);
}

.dropdown__list {
   list-style: none;
   margin: 0;
   padding: 4px;
}

.dropdown-enter-active,
.dropdown-leave-active {
   transition:
      opacity 0.2s ease,
      transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
   opacity: 0;
   transform: translateY(-6px);
}
</style>
