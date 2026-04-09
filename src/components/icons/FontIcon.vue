<template>
   <div
      class="icon-wrapper"
      :class="type"
      :style="{ '--icon-size': size, '--width': width, '--height': height }"
   >
      <i :class="icon"></i>
   </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
   icon: string
   type?: string
   size?: string
   width?: string
   height?: string
}>()
</script>

<style scoped>
.icon-wrapper {
   --icon-size: 1rem;
   --width: calc(var(--padding-secondary) * 2 + var(--icon-size));
   --height: calc(var(--padding-secondary) * 2 + var(--icon-size));

   display: flex;
   align-items: center;
   justify-content: center;
   font-size: var(--icon-size);
   padding: calc(var(--padding-secondary) / 2);
   width: var(--width);
   height: var(--height);
   aspect-ratio: 1 / 1;
   transition:
      border 0.2s,
      background-color 0.3s;

   border: 0.1rem solid var(--border-color);
   border-radius: var(--border-radius);
   background: var(--foreground);
}

.icon-wrapper.active-accent {
   /* background: var(--background); */
   color: var(--accent);
}

.icon-wrapper.hover:hover {
   background: var(--background);
   cursor: pointer;
}

.icon-wrapper.danger:hover {
   background: var(--muted-destructive);
   border-color: var(--muted-destructive);
   color: var(--destructive);
   cursor: pointer;
}

.inline {
   padding: 0;
   width: var(--icon-size);
   height: var(--icon-size);
   border: none;
   border-radius: 0;
   background: inherit;
}
</style>
