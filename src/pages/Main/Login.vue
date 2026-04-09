<template>
   <div class="login">
      <div class="forms-wrapper">
         <div ref="sign-in" class="sign-in">
            <div class="title">Вход в личный кабинет</div>
            <InputUi label="Почта" />
            <InputUi label="Пароль" />
            <ButtonUI style="width: 100%" type="muted-accent" @click="login">
               Войти
            </ButtonUI>
            <ButtonUI type="inline" @click="switchTo('sign-on')">
               Регистрация
            </ButtonUI>
         </div>

         <div ref="sign-on" class="sign-on">
            <div class="title">Регистрация</div>
            <InputUi label="Почта" />
            <InputUi label="Пароль" />
            <ButtonUI style="width: 100%" type="muted-accent">
               Зарегистрироваться
            </ButtonUI>
            <ButtonUI type="inline" @click="switchTo('sign-in')">
               Вход в существующий аккаунт
            </ButtonUI>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import { useRouter, useRoute } from 'vue-router'
import ButtonUI from '@/components/ButtonUI.vue'
import InputUi from '@/components/InputUi.vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const signIn = useTemplateRef<HTMLDivElement>('sign-in')
const signOn = useTemplateRef<HTMLDivElement>('sign-on')

type FormName = 'sign-in' | 'sign-on'
const current = ref<FormName>('sign-in')

onMounted(async () => {
   await nextTick()
   gsap.set(signOn.value, { display: 'none' })
   gsap.set(signOn.value!.children, { opacity: 0 })
})

async function login() {
   // TODO: реальный запрос на сервер
   userStore.isAuth = true

   const redirect = route.query.redirect as string | undefined
   router.push(redirect ?? { name: 'catalog' })
}

function switchTo(form: FormName) {
   if (form === current.value) return

   const outEl = (form === 'sign-on' ? signIn : signOn).value
   const inEl = (form === 'sign-on' ? signOn : signIn).value
   if (!outEl || !inEl) return

   const isGoingForward = form === 'sign-on'
   const outX = isGoingForward ? '-80%' : '80%'
   const inX = isGoingForward ? '80%' : '-80%'

   gsap.set(inEl.children, { opacity: 0, x: inX })

   gsap
      .timeline({
         onComplete: () => {
            current.value = form
         },
      })
      .to(outEl.children, {
         x: outX,
         opacity: 0,
         duration: 0.25,
         ease: 'power2.in',
         stagger: { each: 0.06, from: 'start' },
      })
      .set(inEl, { display: 'flex' })
      .set(outEl, { display: 'none' })
      .set(outEl.children, { x: 0, opacity: 1 })
      .to(inEl.children, {
         x: '0%',
         opacity: 1,
         duration: 0.2,
         ease: 'power2.out',
         stagger: { each: 0.06, from: 'start' },
      })
}
</script>

<style scoped>
.login {
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
}

.forms-wrapper {
   position: relative;
   width: 16rem;
   overflow: hidden;
}

.sign-in,
.sign-on {
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: var(--gap-primary);
   width: 100%;
   position: relative;
}

.title {
   font-size: 1.4rem;
}
</style>
