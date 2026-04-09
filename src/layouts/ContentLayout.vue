<template>
   <div ref="content" class="content-layout" :class="type"><slot></slot></div>
</template>

<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'

type ContentType = 'flex' | 'flex-wrap' | 'flex-col' | 'full-height'

const props = defineProps<{
   type?: ContentType | ContentType[] | (string & {}) | (string[] & [])
   maxWidth?: string | boolean
}>()

const contentRef = useTemplateRef<HTMLDivElement>('content')

onMounted(() => {
   if (props.maxWidth) {
      if (typeof props.maxWidth == 'string')
         contentRef.value?.style.setProperty(
            '--content-max-width',
            String(props.maxWidth)
         )
      contentRef.value?.classList.add('max-width')
   }
})
</script>

<style scoped>
.content-layout {
   padding: var(--padding-primary);
}
.max-width {
   max-width: var(--content-max-width, 65rem);
}
.flex,
.flex-wrap,
.flex-col {
   display: flex;
   gap: var(--gap-primary);
}
.flex-wrap {
   flex-wrap: wrap;
}
.flex-col {
   flex-direction: column;
}

.full-height {
   height: 100%;
}
</style>
