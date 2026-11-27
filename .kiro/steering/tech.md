# Stack tecnológico

## Runtime y build

- **Vue 3** (Composition API, SFCs con `<script setup>`)
- **Vite** — servidor de desarrollo y bundler
- **Vue Router 5** — enrutamiento del lado del cliente con `createWebHistory`
- **ExcelJS** — generación de archivos Excel (importado dinámicamente en el paso de generación)

## Estilos

- **Tailwind CSS v3** — clases utilitarias disponibles, pero la mayor parte del estilo es CSS plano en `src/styles.css`
- CSS personalizado es el enfoque principal; Tailwind está configurado pero se usa de forma limitada
- Colores del tema: `primary #2563EB`, `secondary #64748B`, `tertiary #BC4800`, `neutral #0F172A`
- Fuente: Inter (cargada desde Google Fonts)

## Calidad de código

- **ESLint** (configuración flat con `@eslint/js` + `eslint-plugin-vue`) — política de cero advertencias (`--max-warnings 0`)
- **Prettier** — formateo verificado mediante `format:check`
- **Vitest** + `@vue/test-utils` — pruebas unitarias

## Comandos comunes

```bash
npm run dev           # iniciar servidor de desarrollo
npm run build         # build de producción
npm run preview       # previsualizar el build de producción
npm run lint          # linting (falla ante cualquier advertencia)
npm run test          # ejecutar pruebas unitarias (vitest run)
npm run format:check  # verificar formateo con Prettier
```
