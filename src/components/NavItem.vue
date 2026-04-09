<template>
   <RouterLink
      class="link"
      activeClass="active"
      :to="{ name: to }"
      v-if="meta?.existInMenu"
   >
      <FontIcon v-if="icon" :icon="icon" type="inline" />
      <div class="">{{ title }}</div>
   </RouterLink>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import FontIcon from './icons/FontIcon.vue'

const { icon, title, to, meta } = defineProps({
   icon: String,
   to: String,
   title: String,
   meta: Object,
})

onMounted(() => {
   console.log(meta)
})
</script>

<style scoped>
.link {
   display: flex;
   align-items: center;
   gap: 0.8rem;
   padding: var(--padding-secondary);
   border-radius: var(--border-radius);
   color: var(--muted-text);
   transition: all 0.3s ease;
}

.link:not(.active):hover {
   background: var(--background);
   color: var(--text);
}

.active {
   color: var(--on-accent);
   background: var(--accent);
   font-weight: 500;
}
</style>
