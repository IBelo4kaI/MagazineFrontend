<template>
   <div :class="['tabs-container', type]" role="tablist">
      <div
         v-for="tab in tabs"
         :key="tab.id"
         :class="['tabs-item', { 'tabs-active': activeTab === tab.id }]"
         role="tab"
         :aria-selected="activeTab === tab.id"
         :tabindex="activeTab === tab.id ? 0 : -1"
         @click="handleTabClick(tab.id)"
         @keydown.enter.prevent="handleTabClick(tab.id)"
         @keydown.space.prevent="handleTabClick(tab.id)"
         @keydown.arrow-right.prevent="handleArrowKey(1)"
         @keydown.arrow-left.prevent="handleArrowKey(-1)"
      >
         <i v-if="tab.icon" :class="tab.icon" aria-hidden="true"></i>
         {{ tab.label }}
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

type TabType = 'default' | 'component' | 'accent-no-background' | 'accent'

interface Tab {
   id: string | number
   label: string
   icon?: string
}

interface Props {
   type?: TabType
   tabs: Tab[]
}

const props = withDefaults(defineProps<Props>(), {
   type: 'default',
})

const emit = defineEmits<{
   'update:modelValue': [value: Tab['id']]
   'tab-change': [value: Tab['id']]
}>()

const modelValue = defineModel<Tab['id']>()

const activeTab = ref<Tab['id']>(
   modelValue.value ?? (props.tabs.length > 0 ? props.tabs[0]!.id : '')
)

function handleTabClick(tabId: Tab['id']) {
   if (activeTab.value === tabId) return
   activeTab.value = tabId
   emit('update:modelValue', tabId)
   emit('tab-change', tabId)
}

function handleArrowKey(direction: 1 | -1) {
   const currentIndex = props.tabs.findIndex(
      (tab) => tab.id === activeTab.value
   )
   const nextIndex =
      (currentIndex + direction + props.tabs.length) % props.tabs.length
   handleTabClick(props.tabs[nextIndex]!.id)
}

watch(modelValue, (newValue) => {
   if (newValue !== undefined && newValue !== activeTab.value) {
      activeTab.value = newValue
   }
})
</script>

<style scoped>
/* ─── Base ─────────────────────────────────────────── */
.tabs-container {
   display: inline-flex;
   overflow: hidden;
   align-items: center;
   border-radius: var(--border-radius);
   height: 2.5rem;
}

.tabs-item {
   height: 100%;
   min-width: calc(2.5rem - (var(--padding-secondary) / 3));
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 0.5rem;
   cursor: pointer;
   padding: calc(var(--padding-secondary) / 2);
   border-radius: calc(var(--border-radius) / 2);
   font-weight: 600;
   color: var(--muted-text);
   transition:
      background-color 0.2s ease,
      color 0.2s ease;
}

.tabs-item:hover:not(.tabs-active) {
   background: var(--muted-accent);
}

.tabs-item:focus-visible {
   outline: 0.14rem solid var(--accent);
   outline-offset: 0.14rem;
}

.tabs-active:hover {
   opacity: 0.95;
}

/* ─── Variants ──────────────────────────────────────── */
.default {
   padding: calc(var(--padding-secondary) / 3);
   background: var(--foreground);
   border: 0.07rem solid var(--border-color);
}

.component {
   background: var(--background);
}

.accent-no-background,
.accent {
   border: 0.07rem solid var(--border-color);
}

.accent {
   background: var(--foreground);
}

/* ─── Active states ─────────────────────────────────── */

/* accent active — default, accent-no-background, accent */
.default .tabs-active,
.accent-no-background .tabs-active,
.accent .tabs-active {
   background: var(--accent);
   color: var(--on-accent);
}

/* component active — свой цвет */
.component .tabs-active {
   background: var(--foreground);
   color: var(--text);
}
</style>
