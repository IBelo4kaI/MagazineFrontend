<template>
   <svg
      class="bookmark"
      :class="{ check: isCheck }"
      width="1.5rem"
      height="1.5rem"
      version="1.1"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         class="bookmark__path"
         d="m6.4 1.6v28.8l9.6-8 9.6 8v-28.8z"
         stroke-linecap="round"
         stroke-linejoin="round"
         stroke-width="2"
      />
   </svg>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ isCheck?: boolean }>(), { isCheck: false })
</script>

<style scoped>
.bookmark {
   cursor: pointer;
}
.check .bookmark__path {
   fill: var(--accent);
}
.bookmark__path {
   fill: var(--foreground);
   stroke: var(--accent);
   transition: all 0.3s ease;
}
.bookmark:hover .bookmark__path {
   fill: var(--accent);
}
</style>
