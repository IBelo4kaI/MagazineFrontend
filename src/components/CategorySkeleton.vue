<!-- CategorySkeleton.vue -->
<template>
   <div class="skeleton">
      <div class="skeleton__img" />
      <div class="skeleton__title" />
   </div>
</template>

<style scoped>
.skeleton {
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
   min-width: 14rem;
   background: var(--foreground);
   padding: var(--padding-primary);
   border-radius: var(--border-radius);
   border: 0.07rem solid var(--border-color);
}

.skeleton__img {
   width: 100%;
   aspect-ratio: 16 / 9;
   border-radius: calc(var(--border-radius) / 2);
   background: linear-gradient(
      90deg,
      var(--border-color) 25%,
      var(--muted-foreground) 50%,
      var(--border-color) 75%
   );
   background-size: 200% 100%;
   animation: shimmer 1.6s ease-in-out infinite;
}

.skeleton__title {
   height: 1.4rem;
   width: 70%;
   border-radius: calc(var(--border-radius) / 2);
   background: linear-gradient(
      90deg,
      var(--border-color) 25%,
      var(--muted-foreground) 50%,
      var(--border-color) 75%
   );
   background-size: 200% 100%;
   animation: shimmer 1.6s ease-in-out infinite;
   animation-delay: 0.15s;
}

@keyframes shimmer {
   0% {
      background-position: 200% 0;
   }
   100% {
      background-position: -200% 0;
   }
}
</style>
