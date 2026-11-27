# Estructura del proyecto

```
src/
├── main.js                  # Punto de entrada — monta la app Vue e importa estilos
├── App.vue                  # Componente raíz — renderiza únicamente <RouterView>
├── styles.css               # Estilos globales (enfoque principal de estilos)
├── improvements.css         # Ajustes CSS complementarios
├── router/
│   └── index.js             # Definición de rutas (/ y /nueva-cotizacion)
├── views/
│   ├── LandingView.vue      # Página de inicio — envuelve QuoteGenerator con page="landing"
│   └── QuoteView.vue        # Página del formulario — envuelve QuoteGenerator con page="quote"
├── components/
│   ├── QuoteGenerator.vue   # Componente principal — gestiona la UI de landing y formulario,
│   │                        # la generación de Excel y el modal de confirmación
│   ├── AppHeader.vue        # (sin uso en el enrutamiento actual)
│   ├── AppFooter.vue        # (sin uso en el enrutamiento actual)
│   └── LandingHero.vue      # (sin uso en el enrutamiento actual)
└── composables/
    ├── useQuoteForm.js       # Todo el estado y la lógica del formulario (ítems, totales, impuesto, reset)
    └── useQuoteForm.test.js  # Pruebas unitarias con Vitest para el composable
```

## Patrones

- **Las vistas son envoltorios delgados.** Ambas vistas de ruta renderizan `<QuoteGenerator>` con una prop `page` (`"landing"` o `"quote"`). La lógica de negocio vive en el composable, no en las vistas.
- **Un único composable para el estado del formulario.** `useQuoteForm` gestiona todo el estado reactivo: metadatos de la cotización, arreglo de ítems, totales computados y helpers para el formateo de precios.
- **Bifurcación de páginas dentro de un solo componente.** `QuoteGenerator.vue` usa `v-if="currentPage === 'landing'"` para alternar entre la sección hero y el formulario — ambos viven en el mismo archivo.
- **Carga diferida de ExcelJS.** `ExcelJS` se importa dinámicamente dentro de `generateQuote()` para mantener pequeño el bundle inicial.
- **Modo oscuro como estado local.** Un ref `darkMode` en `QuoteGenerator.vue` alterna la clase CSS `.dark` en el elemento raíz; no existe un store global.
- **Sin librería de gestión de estado.** La app usa únicamente la reactividad integrada de Vue (`ref`, `computed`) y un único composable.
