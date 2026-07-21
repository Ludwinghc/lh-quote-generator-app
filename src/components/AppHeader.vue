<script setup>
defineProps({ page: { type: String, required: true }, darkMode: Boolean });
defineEmits(["go-home", "go-quote", "toggle-theme", "toggle-menu"]);
</script>

<template>
  <header class="nav">
    <button
      class="menu-toggle"
      aria-label="Abrir menú"
      @click="$emit('toggle-menu')"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 7h14M5 12h14M5 17h14" />
      </svg>
    </button>
    <button class="brand" @click="$emit('go-home')">Costify</button>
    <button
      v-if="page === 'quote'"
      class="quote-nav"
      @click="$emit('go-quote')"
    >
      Nueva Cotización
    </button>
    <button
      class="theme-toggle"
      :aria-label="darkMode ? 'Activar modo claro' : 'Activar modo oscuro'"
      @click="$emit('toggle-theme')"
    >
      ◐
    </button>
  </header>
</template>
