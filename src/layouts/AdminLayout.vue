<template>
   <div class="main-layout">
      <div class="main-layout__header">
         <div class="header__logo">
            <LogoIcon />
         </div>
         <div class="header__content">
            <div class="header__menu">
               <AppMenu />
            </div>
            <!-- <div class="header__page-desc">
               <div class="page-desc__title">{{ headerStore.title }}</div>
               <div class="page-desc-description">
                  {{ headerStore.description }}
               </div>
            </div> -->
            <div class="header__actions">
               <RouterLink :to="{ name: 'main' }">
                  <FontIcon
                     icon="fa-regular fa-shop"
                     type="hover"
                     size="1rem"
                  />
               </RouterLink>
               <FontIcon icon="fa-regular fa-user" size="1rem" />
               <ToggleTheme />
            </div>
         </div>
      </div>
      <div class="main-layout__menu">
         <div class="menu__list">
            <NavItem
               v-for="item in adminRoutes"
               :icon="String(item.meta?.icon)"
               :title="String(item.meta?.title)"
               :to="String(item.name)"
               :meta="item.meta"
            />
         </div>
      </div>
      <div class="main-layout__content">
         <RouterView />
      </div>
   </div>
</template>

<script lang="ts" setup>
import AppMenu from '@/components/AppMenu.vue'
import FontIcon from '@/components/icons/FontIcon.vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import NavItem from '@/components/NavItem.vue'
import ToggleTheme from '@/components/ToggleTheme.vue'
import { adminRoutes } from '@/router'
// import { routes } from '@/router'
import { useHeaderStore } from '@/stores/header'
import { useMenuStore } from '@/stores/menuStore'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

const headerStore = useHeaderStore()

const menuStore = useMenuStore()

onMounted(() => {
   menuStore.mode = 'admin'
   menuStore.load()
})
</script>

<style scoped>
.main-layout {
   min-height: 100vh;
   max-height: 100vh;

   display: grid;
   grid-template-areas:
      'header header'
      'sidebar content';

   grid-template-columns: var(--width-sidebar) 1fr;
   grid-template-rows: var(--height-header) 1fr;
}

.main-layout__header {
   grid-area: header;
   display: flex;
   height: var(--height-header);
   border-bottom: 0.1rem solid var(--border-color);
   background-color: var(--foreground);
   overflow: hidden;
}

.header__logo {
   padding: var(--padding-secondary);
   width: var(--width-sidebar);
   height: var(--height-header);
   border-right: 0.1rem solid var(--border-color);
   background-color: var(--foreground);
}

.header__menu {
   display: none;
}

.header__content {
   flex: 1;
   display: flex;
   align-items: center;
   /* justify-content: space-between; */
   justify-content: flex-end;
   padding: var(--padding-secondary);
}

.header__actions {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: var(--gap-secondary);
}

.page-desc__title {
   font-weight: 600;
   font-size: 1rem;
}

.page-desc-description {
   font-weight: 400;
   font-size: 0.7rem;
   color: var(--muted-text);
}

.main-layout__menu {
   grid-area: sidebar;
   height: 100%;
   border-right: 0.1rem solid var(--border-color);
   background-color: var(--foreground);
   padding: var(--padding-secondary);
}

.menu__list {
   display: flex;
   flex-direction: column;
   gap: var(--gap-secondary);
}

.main-layout__content {
   grid-area: content;
   overflow: auto;
}

@media (min-width: 768px) {
   .main-layout {
      grid-template-areas:
         'header header'
         'content content';
   }

   .main-layout__header {
      overflow: visible;
   }

   .header__logo {
      display: none;
   }

   .header__menu {
      display: block;
   }
   .header__content {
      justify-content: space-between;
   }
   .main-layout__menu {
      display: none;
   }
}
</style>
