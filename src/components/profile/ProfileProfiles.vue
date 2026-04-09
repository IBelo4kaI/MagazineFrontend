<template>
   <div class="page-title">Юридические лица</div>
   <div class="profiles-list">
      <div
         v-for="legal in profileStore.legalProfiles"
         :key="legal.id"
         class="profile-card"
         :class="{ expanded: expandedId === legal.id }"
      >
         <div class="profile-card__header" @click="toggle(legal.id)">
            <div class="profile-card__icon">
               <i class="fa-regular fa-building"></i>
            </div>
            <div class="profile-card__info">
               <div class="profile-card__type">Юридическое лицо</div>
               <div class="profile-card__name">{{ legal.fullName }}</div>
               <div class="profile-card__meta">ИНН {{ legal.inn }}</div>
            </div>
            <button
               class="profile-card__remove"
               @click.stop="profileStore.removeLegal(legal.id)"
            >
               <i class="fa-regular fa-xmark"></i>
            </button>
            <i
               class="fa-regular fa-chevron-down profile-card__chevron"
               :class="{ rotated: expandedId === legal.id }"
            />
         </div>

         <div
            class="profile-card__form"
            :ref="(el) => setLegalFormRef(legal.id, el)"
         >
            <div class="form-grid">
               <div class="info-field">
                  <div class="info-field__label">Полное наименование</div>
                  <InputUi
                     :model-value="legal.fullName"
                     @update:model-value="
                        (v) =>
                           profileStore.updateLegal(legal.id, { fullName: v })
                     "
                     label="Наименование"
                  />
               </div>
               <div class="info-field">
                  <div class="info-field__label">ИНН</div>
                  <InputUi
                     :model-value="legal.inn"
                     @update:model-value="
                        (v) => profileStore.updateLegal(legal.id, { inn: v })
                     "
                     label="ИНН"
                  />
               </div>
               <div class="info-field">
                  <div class="info-field__label">КПП</div>
                  <InputUi
                     :model-value="legal.kpp"
                     @update:model-value="
                        (v) => profileStore.updateLegal(legal.id, { kpp: v })
                     "
                     label="КПП"
                  />
               </div>
               <div class="info-field">
                  <div class="info-field__label">Юр. адрес</div>
                  <InputUi
                     :model-value="legal.legalAddress"
                     @update:model-value="
                        (v) =>
                           profileStore.updateLegal(legal.id, {
                              legalAddress: v,
                           })
                     "
                     label="Адрес"
                  />
               </div>
               <div class="info-field">
                  <div class="info-field__label">Банк</div>
                  <InputUi
                     :model-value="legal.bankName"
                     @update:model-value="
                        (v) =>
                           profileStore.updateLegal(legal.id, { bankName: v })
                     "
                     label="Банк"
                  />
               </div>
               <div class="info-field">
                  <div class="info-field__label">Расчётный счёт</div>
                  <InputUi
                     :model-value="legal.accountNumber"
                     @update:model-value="
                        (v) =>
                           profileStore.updateLegal(legal.id, {
                              accountNumber: v,
                           })
                     "
                     label="Р/С"
                  />
               </div>
            </div>
         </div>
      </div>

      <!-- Пустое состояние -->
      <div v-if="profileStore.legalProfiles.length === 0" class="empty">
         <i class="fa-regular fa-building"></i>
         <span>Юридические лица не добавлены</span>
      </div>

      <button class="profile-card--add" @click="showModal = true">
         <i class="fa-regular fa-plus"></i>
         Добавить юридическое лицо
      </button>
   </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import InputUi from '@/components/InputUi.vue'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()
const showModal = ref(false)
const expandedId = ref<string | null>(null)

const legalFormRefs = new Map<string, HTMLElement>()

function setLegalFormRef(id: string, el: unknown) {
   if (el) legalFormRefs.set(id, el as HTMLElement)
   else legalFormRefs.delete(id)
}

async function toggle(id: string) {
   const isOpen = expandedId.value === id

   if (expandedId.value) {
      const el = legalFormRefs.get(expandedId.value)
      if (el) {
         await new Promise<void>((resolve) => {
            gsap.to(el, {
               height: 0,
               opacity: 0,
               duration: 0.3,
               ease: 'power2.inOut',
               onComplete: resolve,
            })
         })
      }
   }

   expandedId.value = isOpen ? null : id

   if (!isOpen) {
      await nextTick()
      const el = legalFormRefs.get(id)
      if (el) {
         gsap.fromTo(
            el,
            { height: 0, opacity: 0 },
            {
               height: el.scrollHeight,
               opacity: 1,
               duration: 0.35,
               ease: 'power2.out',
               onComplete: () => {
                  gsap.set(el, { height: 'auto' })
               },
            }
         )
      }
   }
}
</script>

<style scoped>
.page-title {
   font-size: 1.4rem;
   font-weight: 700;
}

.profiles-list {
   display: flex;
   flex-direction: column;
   gap: var(--gap-secondary);
   max-width: 48rem;
}

.profile-card {
   border: 0.07rem solid var(--border-color);
   border-radius: var(--border-radius);
   background: var(--foreground);
   overflow: hidden;
   transition: border-color 0.2s ease;
}

.profile-card.expanded {
   border-color: var(--accent);
}

.profile-card__header {
   display: flex;
   align-items: center;
   gap: var(--gap-primary);
   padding: var(--padding-secondary) var(--padding-primary);
   cursor: pointer;
   user-select: none;
}

.profile-card__icon {
   width: 2.8rem;
   height: 2.8rem;
   border-radius: 50%;
   background: var(--muted-foreground);
   color: var(--muted-text);
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 1.1rem;
   flex-shrink: 0;
}

.profile-card__info {
   flex: 1;
}
.profile-card__type {
   font-size: 0.75rem;
   color: var(--muted-text);
}
.profile-card__name {
   font-weight: 600;
   font-size: 0.95rem;
}
.profile-card__meta {
   font-size: 0.8rem;
   color: var(--muted-text);
}

.profile-card__remove {
   background: none;
   border: none;
   cursor: pointer;
   color: var(--muted-text);
   font-size: 1rem;
   padding: 0.3rem;
   border-radius: calc(var(--border-radius) / 2);
   transition: color 0.2s ease;
}
.profile-card__remove:hover {
   color: var(--destructive);
}

.profile-card__chevron {
   color: var(--muted-text);
   font-size: 0.85rem;
   transition: transform 0.3s ease;
}
.profile-card__chevron.rotated {
   transform: rotate(180deg);
}

.profile-card__form {
   height: 0;
   opacity: 0;
   overflow: hidden;
   padding: 0 var(--padding-primary);
   display: flex;
   flex-direction: column;
   gap: var(--gap-primary);
}

.profile-card.expanded .profile-card__form {
   padding-bottom: var(--padding-primary);
}

.form-grid {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
   gap: var(--gap-primary);
}

.info-field {
   display: flex;
   flex-direction: column;
}
.info-field__label {
   font-size: 0.8rem;
   color: var(--muted-text);
   margin-bottom: var(--gap-secondary);
}

.empty {
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: var(--gap-secondary);
   padding: var(--padding-primary);
   color: var(--muted-text);
   font-size: 0.9rem;
}

.empty i {
   font-size: 2rem;
   opacity: 0.4;
}

.profile-card--add {
   display: flex;
   align-items: center;
   justify-content: center;
   gap: var(--gap-secondary);
   padding: var(--padding-secondary) var(--padding-primary);
   border: 0.07rem dashed var(--border-color);
   border-radius: var(--border-radius);
   background: none;
   cursor: pointer;
   color: var(--muted-text);
   font-size: 0.9rem;
   font-weight: 600;
   width: 100%;
   transition:
      border-color 0.2s ease,
      color 0.2s ease;
}
.profile-card--add:hover {
   border-color: var(--accent);
   color: var(--accent);
}
</style>
