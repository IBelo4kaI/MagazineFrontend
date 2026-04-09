<template>
   <aside class="sidebar">
      <div class="sidebar__avatar">
         <i class="fa-regular fa-user"></i>
      </div>
      <div class="sidebar__name">Иван Иванов</div>
      <div class="sidebar__email">{{ userStore.user.email }}</div>

      <nav class="sidebar__nav">
         <button
            v-for="tab in tabs"
            :key="tab.id"
            class="sidebar__nav-item"
            :class="{ active: modelValue === tab.id }"
            @click="emit('update:modelValue', tab.id)"
         >
            <i :class="tab.icon"></i>
            {{ tab.label }}
         </button>
      </nav>

      <button class="sidebar__logout">
         <i class="fa-regular fa-arrow-right-from-bracket"></i>
         Выйти
      </button>
   </aside>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'

defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const userStore = useUserStore()

const tabs = [
   { id: 'info', label: 'Личные данные', icon: 'fa-regular fa-id-card' },
   { id: 'profiles', label: 'Профили', icon: 'fa-regular fa-users' },
   { id: 'orders', label: 'Заказы', icon: 'fa-regular fa-box' },
   { id: 'favorites', label: 'Избранное', icon: 'fa-regular fa-bookmark' },
]
</script>

<style scoped>
.sidebar {
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: var(--padding-primary);
   background: var(--foreground);
   border: 0.07rem solid var(--border-color);
   border-radius: var(--border-radius);
   gap: var(--gap-secondary);
}
.sidebar__avatar {
   margin-top: var(--padding-primary);
   width: 5rem;
   height: 5rem;
   border-radius: 50%;
   background: var(--muted-accent);
   color: var(--accent);
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 2rem;
}
.sidebar__name {
   font-size: 1rem;
   font-weight: 700;
   text-align: center;
}
.sidebar__email {
   font-size: 0.8rem;
   color: var(--muted-text);
   text-align: center;
   margin-bottom: var(--gap-primary);
}
.sidebar__nav {
   display: flex;
   flex-direction: column;
   gap: var(--gap-secondary);
   width: 100%;
   flex: 1;
}
.sidebar__nav-item {
   display: flex;
   align-items: center;
   gap: var(--gap-secondary);
   padding: var(--padding-secondary) var(--padding-primary);
   border-radius: var(--border-radius);
   border: none;
   background: none;
   color: var(--muted-text);
   font-size: 0.9rem;
   font-weight: 600;
   cursor: pointer;
   width: 100%;
   transition:
      background-color 0.2s ease,
      color 0.2s ease;
}
.sidebar__nav-item i {
   width: 1.2rem;
   text-align: center;
}
.sidebar__nav-item:hover:not(.active) {
   background: var(--muted-foreground);
}
.sidebar__nav-item.active {
   background: var(--muted-accent);
   color: var(--accent);
}
.sidebar__logout {
   display: flex;
   align-items: center;
   gap: var(--gap-secondary);
   padding: var(--padding-secondary) var(--padding-primary);
   border-radius: var(--border-radius);
   border: none;
   background: none;
   color: var(--muted-text);
   font-size: 0.9rem;
   font-weight: 600;
   cursor: pointer;
   width: 100%;
   transition: color 0.2s ease;
   margin-bottom: var(--padding-primary);
}
.sidebar__logout:hover {
   color: var(--destructive);
}
</style>
