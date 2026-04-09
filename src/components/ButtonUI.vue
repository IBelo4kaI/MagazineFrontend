<template>
   <button :class="[type, { disable: disabled }]" :disabled="disabled">
      <template v-if="iconAlign == 'right'">
         <slot></slot>
         <i v-if="icon" :class="icon"></i>
      </template>
      <template v-else>
         <i v-if="icon" :class="icon"></i>
         <slot></slot>
      </template>
   </button>
</template>

<script setup lang="ts">
type ButtonType =
   | 'accent'
   | 'muted'
   | 'muted-accent'
   | 'success'
   | 'destructive'
   | 'warn'
   | 'disable'
   | 'inline'

interface Props {
   icon?: string
   type?: ButtonType
   iconAlign?: 'left' | 'right'
   disabled?: boolean
}

withDefaults(defineProps<Props>(), {
   type: 'accent',
})
</script>

<style scoped>
button {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   gap: 0.57rem;
   border-radius: var(--border-radius);
   border: 0.07rem solid var(--border-color);
   padding: 0.71rem 1rem;
   cursor: pointer;
   font-size: 1rem;
   font-weight: 500;
   height: 2.5rem;
   transition: all 0.3s ease;
}
.accent {
   background: var(--accent);
   color: var(--on-accent);
}
.accent:hover {
   background: var(--muted-accent);
   color: var(--text);
}
.muted {
   background: var(--foreground);
   color: var(--text);
   border: 0.07rem solid var(--border-color);
}
.muted:hover {
   background: var(--background);
}
.muted-accent {
   color: var(--accent);
}
.muted-accent:hover {
   background: var(--muted-accent);
}
.success {
   color: var(--success);
}
.success:hover {
   background: var(--muted-success);
}
.destructive {
   color: var(--destructive);
}
.destructive:hover {
   background: var(--muted-destructive);
}
.warn {
   color: var(--warn);
}
.warn:hover {
   background: var(--muted-warn);
}
.inline {
   /* display: block; */
   padding: 0;
   border: none;
   height: auto;
   font-weight: 300;
   gap: 0.3rem;
   color: var(--text);
}
.inline:hover {
   color: var(--accent);
}
.disable {
   /* opacity: 0.6; */
   color: var(--muted-text);
   cursor: not-allowed;
}
</style>
