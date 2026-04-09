<template>
   <div class="profile" ref="pageRef">
      <ProfileSidebar v-model="activeTab" />
      <main class="profile__main" ref="contentRef">
         <ProfileInfo v-if="activeTab === 'info'" />
         <ProfileProfiles v-else-if="activeTab === 'profiles'" />
         <ProfileOrders v-else-if="activeTab === 'orders'" />
         <ProfileFavorites v-else-if="activeTab === 'favorites'" />
      </main>
   </div>
</template>

<script lang="ts" setup>
import ProfileFavorites from '@/components/profile/ProfileFavorites.vue'
import ProfileInfo from '@/components/profile/ProfileInfo.vue'
import ProfileOrders from '@/components/profile/ProfileOrders.vue'
import ProfileProfiles from '@/components/profile/ProfileProfiles.vue'
import ProfileSidebar from '@/components/profile/ProfileSidebar.vue'
import { gsap } from 'gsap'
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'

const activeTab = ref('info')
const pageRef = useTemplateRef<HTMLDivElement>('pageRef')
const contentRef = useTemplateRef<HTMLElement>('contentRef')

async function animateContent() {
   await nextTick()
   if (!contentRef.value) return
   gsap.fromTo(
      contentRef.value.children,
      { opacity: 0, y: 12 },
      {
         opacity: 1,
         y: 0,
         duration: 0.35,
         ease: 'power2.out',
         stagger: { each: 0.05 },
      }
   )
}

watch(activeTab, animateContent)

onMounted(() => {
   if (!pageRef.value) return
   gsap.fromTo(
      pageRef.value.children,
      { opacity: 0, x: -20 },
      {
         opacity: 1,
         x: 0,
         duration: 0.4,
         ease: 'power2.out',
         stagger: { each: 0.1 },
      }
   )
   animateContent()
})
</script>

<style scoped>
.profile {
   display: grid;
   grid-template-columns: 16rem 1fr;
   gap: var(--padding-primary);
   min-height: 100%;
}
.profile__main {
   /* padding: var(--padding-primary); */
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
}
</style>
