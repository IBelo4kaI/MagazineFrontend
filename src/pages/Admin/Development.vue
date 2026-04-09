<template>
   <ContentLayout :type="['full-height']">
      <div class="development">Страница в разработке</div>
   </ContentLayout>
</template>

<script lang="ts" setup>
import ContentLayout from '@/layouts/ContentLayout.vue'
</script>

<style scoped>
.development {
   display: flex;
   justify-content: center;
   align-items: center;
   /* width: 100%; */
   height: 100%;
   color: var(--accent);
   font-weight: 700;
   font-size: 2rem;
}
</style>
