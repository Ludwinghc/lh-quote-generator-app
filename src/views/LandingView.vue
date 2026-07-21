<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LandingHero from '../components/LandingHero.vue'

const router = useRouter()
const darkMode = ref(false)
const goToQuote = () => router.push('/nueva-cotizacion')
</script>

<template>
  <main :class="['app-shell', { dark: darkMode }]">
    <header class="nav"><button class="brand" @click="router.push('/')">Costify</button><button class="theme-toggle" :aria-label="darkMode ? 'Activar modo claro' : 'Activar modo oscuro'" @click="darkMode = !darkMode"><svg v-if="!darkMode" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.5 14.3A8.5 8.5 0 1 1 9.7 3.5a6.6 6.6 0 0 0 10.8 10.8Z" stroke-width="2" stroke-linecap="round"/></svg><svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4" stroke-width="2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke-width="2" stroke-linecap="round"/></svg></button></header>
    <LandingHero @create-quote="goToQuote" />
    <footer><span class="brand">Costify</span><div><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Support</a></div><span>Desarrollado por Ludwing Hernandez</span></footer>
  </main>
</template>
