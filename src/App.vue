<script setup lang="ts">
import ModalLayout from './layouts/ModalLayout.vue'
import { useThemeStore } from './stores/themes'
const themeStore = useThemeStore()
themeStore.initTheme()
</script>

<template>
   <RouterView />
   <ModalLayout />
</template>

<style scoped></style>
