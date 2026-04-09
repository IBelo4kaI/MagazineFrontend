<template>
   <div class="product-skeleton">
      <div class="skeleton-img" />
      <div class="skeleton-title" />
      <div class="skeleton-rating">
         <div class="skeleton-stars" />
         <div class="skeleton-reviews" />
      </div>
      <div class="skeleton-price" />
      <div class="skeleton-actions">
         <div class="skeleton-button" />
         <div class="skeleton-bookmark" />
      </div>
   </div>
</template>

<style scoped>
@keyframes shimmer {
   0% {
      background-position: 200% 0;
   }
   100% {
      background-position: -200% 0;
   }
}

.product-skeleton {
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
   min-width: 14rem;
   max-width: 20rem;
   min-height: 14rem;
   justify-content: space-between;
   background: var(--foreground);
   padding: var(--padding-secondary);
   border-radius: var(--border-radius);
   border: 0.07rem solid var(--border-color);
}

.skeleton-img,
.skeleton-title,
.skeleton-stars,
.skeleton-reviews,
.skeleton-price,
.skeleton-button,
.skeleton-bookmark {
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

.skeleton-img {
   width: 100%;
   aspect-ratio: 16 / 9;
   animation-delay: 0s;
}
.skeleton-title {
   height: 1rem;
   width: 80%;
   animation-delay: 0.1s;
}
.skeleton-rating {
   display: flex;
   align-items: center;
   gap: var(--gap-secondary);
}
.skeleton-stars {
   width: 6rem;
   height: 0.8rem;
   animation-delay: 0.15s;
}
.skeleton-reviews {
   width: 4rem;
   height: 0.8rem;
   animation-delay: 0.2s;
}
.skeleton-price {
   height: 1.4rem;
   width: 5rem;
   animation-delay: 0.25s;
}
.skeleton-actions {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: var(--gap-secondary);
}
.skeleton-button {
   flex: 1;
   height: 2.2rem;
   animation-delay: 0.3s;
}
.skeleton-bookmark {
   width: 1.5rem;
   height: 1.5rem;
   animation-delay: 0.35s;
}
</style>
