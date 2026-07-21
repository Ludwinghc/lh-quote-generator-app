<script setup>
defineEmits(["create-quote"]);
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero-copy">
      <div class="mobile-document-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v5h5M10 13h5M10 17h5" />
        </svg>
      </div>
      <h1>
        App que te ayuda a<br />generar tus<br /><em>cotizaciones</em>
        de<br />forma profesional.
      </h1>
      <p>
        Automatiza el proceso de creación de presupuestos. Diseña tus
        cotizaciones en segundos con una interfaz corporativa minimalista.
      </p>
      <button class="primary-btn" @click="$emit('create-quote')">
        Crear cotización <span>→</span>
      </button>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="blue-glow"></div>
      <div class="document-card">
        <div class="doc-top">
          <span class="dots">● ● ●</span><b>COTIZACIÓN_#482.pdf</b>
        </div>
        <div class="doc-body">
          <div class="doc-lines short"></div>
          <div class="doc-lines tiny"></div>
          <div class="doc-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 3h7l4 4v14H7z" />
              <path d="M14 3v5h5M10 13h5M10 17h5" />
            </svg>
          </div>
          <div class="doc-lines wide"></div>
          <div class="doc-lines wide"></div>
          <div class="doc-lines medium"></div>
          <div class="doc-bottom"><span></span><span></span></div>
        </div>
      </div>
    </div>
  </section>
</template>
