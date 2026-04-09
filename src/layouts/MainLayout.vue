<template>
   <div class="main-layout">
      <div class="main-layout__header">
         <div class="container header__container">
            <AppMenu />
            <div class="header__logo">
               <LogoIcon />
            </div>
            <div class="header__search">
               <InputUi id="search_main">
                  <template #prefix>
                     <i class="fa-regular fa-magnifying-glass"></i>
                  </template>
               </InputUi>
            </div>
            <div class="header__actions">
               <div class="header__profile">
                  <RouterLink :to="{ name: 'profile' }">
                     <FontIcon
                        width="2.5rem"
                        height="2.5rem"
                        icon="fa-regular fa-user"
                        type="hover"
                        :style="{
                           color: userStore.isAuth
                              ? 'var(--accent)'
                              : 'var(--destructive)',
                        }"
                     />
                  </RouterLink>
               </div>
               <div class="header__favourites">
                  <FontIcon
                     width="2.5rem"
                     height="2.5rem"
                     icon="fa-regular fa-bookmark"
                  />
               </div>
               <div class="header__cart">
                  <FontIcon
                     width="2.5rem"
                     height="2.5rem"
                     icon="fa-regular fa-cart-shopping"
                  />
               </div>
               <ToggleTheme />
            </div>
         </div>
      </div>
      <div class="content container">
         <RouterView />
      </div>
   </div>
</template>

<script lang="ts" setup>
import AppMenu from '@/components/AppMenu.vue'
import FontIcon from '@/components/icons/FontIcon.vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import InputUi from '@/components/InputUi.vue'
import ToggleTheme from '@/components/ToggleTheme.vue'
import { useUserStore } from '@/stores/user'
import { RouterView } from 'vue-router'

const userStore = useUserStore()
</script>

<style scoped>
.main-layout {
   min-height: 100vh;
   display: grid;
   grid-template-areas:
      'header'
      'content';
   grid-template-columns: 1fr;
   grid-template-rows: var(--height-header) 1fr;
}

.main-layout__header {
   position: sticky;
   grid-area: header;
   background-color: var(--foreground);
   top: 0;
   z-index: 100;
   border-bottom: 0.07rem solid var(--border-color);
}
.header__container {
   display: flex;
   height: var(--height-header);
   align-items: center;
   gap: var(--gap-primary);
}
.header__logo {
   /* padding: var(--padding-secondary); */
   width: var(--width-sidebar);
   height: calc(var(--height-header) - var(--padding-secondary) * 2);
}
.header__search {
   flex: 1;
}
.header__actions {
   display: flex;
   gap: var(--gap-primary);
}

.content {
   grid-area: content;
   width: 100%;
}
</style>
