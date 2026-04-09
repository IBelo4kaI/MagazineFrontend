<template>
   <li class="menu-item" :class="{ 'menu-item--has-children': hasChildren }">
      <!-- Ссылка -->
      <RouterLink
         v-if="item.to"
         :to="item.to"
         class="menu-item__link"
         @click="emit('navigate')"
      >
         {{ item.label }}
      </RouterLink>

      <!-- Кнопка с подменю -->
      <button
         v-else
         type="button"
         class="menu-item__link menu-item__trigger"
         :aria-expanded="isExpanded"
         @click="isExpanded = !isExpanded"
      >
         {{ item.label }}
         <svg
            class="menu-item__chevron"
            :class="{ 'menu-item__chevron--open': isExpanded }"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
         >
            <path
               d="M4 6L8 10L12 6"
               stroke="currentColor"
               stroke-width="1.5"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
         </svg>
      </button>

      <!-- Вложенные пункты (рекурсия) -->
      <Transition name="submenu">
         <ul v-if="hasChildren && isExpanded" class="menu-item__submenu">
            <MenuItemNode
               v-for="child in item.children"
               :key="child.id"
               :item="child"
               @navigate="emit('navigate')"
            />
         </ul>
      </Transition>
   </li>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/stores/menuStore'
import { ref, computed } from 'vue'

const props = defineProps<{
   item: MenuItem
}>()

const emit = defineEmits<{
   navigate: []
}>()

const isExpanded = ref<boolean>(false)
const hasChildren = computed(() => !!props.item.children?.length)
</script>

<style scoped>
.menu-item {
   list-style: none;
}

.menu-item__link {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 8px;
   width: 100%;
   padding: 8px 12px;
   font-size: 0.9rem;
   color: var(--text);
   text-decoration: none;
   border-radius: calc(var(--border-radius, 8px) - 2px);
   transition: background 0.15s;
   cursor: pointer;
   background: none;
   border: none;
   text-align: left;
}

.menu-item__link:hover {
   background: var(--foreground);
}

.menu-item__link.router-link-active {
   color: var(--accent);
   font-weight: 500;
}

.menu-item__chevron {
   flex-shrink: 0;
   transition: transform 0.2s ease;
   color: var(--muted-text);
}

.menu-item__chevron--open {
   transform: rotate(180deg);
}

.menu-item__submenu {
   list-style: none;
   margin: 0;
   padding: 0 0 0 12px;
}

.submenu-enter-active,
.submenu-leave-active {
   transition:
      opacity 0.2s ease,
      transform 0.2s ease;
}

.submenu-enter-from,
.submenu-leave-to {
   opacity: 0;
   transform: translateY(-4px);
}
</style>
