<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuoteForm } from '../composables/useQuoteForm'

const props = defineProps({
  page: { type: String, required: true, validator: (value) => ['landing', 'quote'].includes(value) },
})
const router = useRouter()
const currentPage = computed(() => props.page)
const darkMode = ref(false)
const showConfirmation = ref(false)
const isGenerating = ref(false)
const { quote, items, shouldIncludeTax, formatter, subtotal, tax, total, addItem, removeItem, formatInputPrice, updateValue, allowMoneyKeys, reset } = useQuoteForm()
function showQuoteForm() { router.push('/nueva-cotizacion'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
function goHome() { router.push('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
function excelStyle(cell, { fill, color = '0F172A', bold = false, alignment = 'left' } = {}) {
  cell.font = { name: 'Arial', size: 10, bold, color: { argb: color } }
  cell.alignment = { horizontal: alignment, vertical: 'middle', wrapText: true }
  if (fill) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } }
}
function openConfirmation() { showConfirmation.value = true }
async function generateQuote() {
  isGenerating.value = true
  const { default: ExcelJS } = await import('exceljs')
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet('Cotización', { views: [{ showGridLines: false }] })
  sheet.columns = [{ width: 11 }, { width: 19 }, { width: 31 }, { width: 22 }, { width: 16 }, { width: 17 }, { width: 34 }]
  const merge = (range, value, style) => { sheet.mergeCells(range); const cell = sheet.getCell(range.split(':')[0]); cell.value = value; excelStyle(cell, style); return cell }
  merge('A1:F1', 'COTIZACIÓN', { fill: '2563EB', color: 'FFFFFF', bold: true, alignment: 'center' })
  sheet.getRow(1).height = 27
  merge('A3:F3', 'MUNDIAL DE TRACTOMULAS SAS', { bold: true, alignment: 'center' })
  merge('A4:F4', 'NIT: 830.104.891-4', { alignment: 'center' })
  merge('A5:F5', 'TELÉFONOS DE CONTACTO: 3102456309 - 3108146217', { alignment: 'center' })
  merge('A6:F6', 'UBICACIÓN: CARRERA 28B # 79-5 BOGOTÁ D.C', { alignment: 'center' })
  merge('A7:F7', 'CORREO: mundialdetractomulas@yahoo.com', { alignment: 'center' })
  const date = quote.value.date ? new Date(`${quote.value.date}T00:00:00`) : new Date()
  merge('A9:F9', `Bogotá D.C., ${date.toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })}`)
  merge('A10:F10', `Señores: ${quote.value.company || 'Cliente'}`, { bold: true })
  merge('A12:F12', 'A continuación nos permitimos cotizar los siguientes repuestos:')
  const tableHeader = 14
  const headers = ['CANTIDAD', 'MARCA', 'DESCRIPCIÓN', 'REFERENCIA', 'VALOR UNIDAD', 'VALOR TOTAL', 'NOTA']
  sheet.getRow(tableHeader).values = headers
  sheet.getRow(tableHeader).height = 22
  sheet.getRow(tableHeader).eachCell(cell => { excelStyle(cell, { fill: '1D4ED8', color: 'FFFFFF', bold: true, alignment: 'center' }); cell.border = { bottom: { style: 'thin', color: { argb: '1E3A8A' } } } })
  const firstItemRow = tableHeader + 1
  items.value.forEach((item, index) => {
    const row = sheet.getRow(firstItemRow + index)
    row.values = [Number(item.quantity) || 0, item.brand, item.description, item.reference, Number(item.value) || 0, (Number(item.quantity) || 0) * (Number(item.value) || 0), shouldIncludeTax.value ? '' : 'Precio sin aplicar el IVA del 19%']
    row.height = 22
    row.eachCell((cell, column) => { excelStyle(cell, { alignment: column === 1 ? 'center' : column >= 5 ? 'right' : 'left' }); cell.border = { bottom: { style: 'thin', color: { argb: 'D8E0EC' } } } })
    row.getCell(5).numFmt = '$#,##0'
    row.getCell(6).numFmt = '$#,##0'
  })
  const summaryRow = firstItemRow + items.value.length + 2
  merge(`A${summaryRow}:C${summaryRow}`, `Nota de entrega: ${quote.value.plate || 'No informado'}`, { bold: true })
  if (shouldIncludeTax.value) {
    sheet.getCell(`E${summaryRow}`).value = 'Subtotal:'; sheet.getCell(`F${summaryRow}`).value = subtotal.value
    sheet.getCell(`E${summaryRow + 1}`).value = 'IVA (19%):'; sheet.getCell(`F${summaryRow + 1}`).value = tax.value
    sheet.getCell(`E${summaryRow + 2}`).value = 'TOTAL:'; sheet.getCell(`F${summaryRow + 2}`).value = total.value
    for (let row = summaryRow; row <= summaryRow + 2; row++) { excelStyle(sheet.getCell(`E${row}`), { bold: row === summaryRow + 2, alignment: 'right' }); excelStyle(sheet.getCell(`F${row}`), { fill: row === summaryRow + 2 ? 'DBEAFE' : undefined, bold: true, alignment: 'right' }); sheet.getCell(`F${row}`).numFmt = '$#,##0' }
  }
  merge(`A${summaryRow + 5}:F${summaryRow + 5}`, 'Cordialmente')
  merge(`A${summaryRow + 6}:F${summaryRow + 6}`, 'Departamento de ventas', { bold: true })
  const fileSafe = (value) => String(value || 'SIN-NOMBRE').trim().replace(/[\\/:*?"<>|]/g, '-').replace(/\s+/g, '-')
  const filename = `COTIZACION-${fileSafe(quote.value.company)}-${fileSafe(quote.value.number)}.xlsx`
  const buffer = await workbook.xlsx.writeBuffer()
  const url = URL.createObjectURL(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
  const link = document.createElement('a'); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url)
  reset()
  showConfirmation.value = false
  isGenerating.value = false
}
</script>

<template>
  <main :class="['app-shell', { dark: darkMode }]">
    <header class="nav">
      <button class="brand" @click="goHome">Costify</button>
      <button v-if="currentPage === 'quote'" class="quote-nav" @click="showQuoteForm">Nueva Cotización</button>
      <button class="theme-toggle" :aria-label="darkMode ? 'Activar modo claro' : 'Activar modo oscuro'" @click="darkMode = !darkMode">
        <svg v-if="!darkMode" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.5 14.3A8.5 8.5 0 1 1 9.7 3.5a6.6 6.6 0 0 0 10.8 10.8Z" stroke-width="2" stroke-linecap="round"/></svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4" stroke-width="2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </header>

    <section v-if="currentPage === 'landing'" id="inicio" class="hero">
      <div class="hero-copy">
        <div class="mobile-document-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5M10 13h5M10 17h5"/></svg></div>
        <h1>App que te ayuda a<br>generar tus<br><em>cotizaciones</em> de<br>forma profesional.</h1>
        <p>Automatiza el proceso de creación de presupuestos. Diseña tus cotizaciones en segundos con una interfaz corporativa minimalista.</p>
        <button class="primary-btn" @click="showQuoteForm">Crear cotización <span>→</span></button>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="blue-glow"></div>
        <div class="document-card"><div class="doc-top"><span class="dots">● ● ●</span><b>COTIZACIÓN_#482.pdf</b></div><div class="doc-body"><div class="doc-lines short"></div><div class="doc-lines tiny"></div><div class="doc-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5M10 13h5M10 17h5"/></svg></div><div class="doc-lines wide"></div><div class="doc-lines wide"></div><div class="doc-lines medium"></div><div class="doc-bottom"><span></span><span></span></div></div></div>
      </div>
    </section>

    <section v-else class="quote-page">
      <div class="page-heading"><h1>Nueva cotización</h1><p>Complete la información necesaria para generar un documento profesional.</p></div>
      <form @submit.prevent="openConfirmation">
        <div class="details-grid">
          <section class="form-card business-card"><div class="field-row"><label>Empresa a la cual va dirigida<input v-model.trim="quote.company" placeholder="Ej. Soluciones S.A.S" required></label><label>Ciudad de la empresa (opcional)<input v-model.trim="quote.city" placeholder="Ej. Bogotá D.C"></label></div><label>Nota de entrega<input v-model.trim="quote.plate" placeholder="Ej. Entrega inmediata" required></label></section>
          <section class="form-card quote-meta"><label># De la cotización<input v-model.trim="quote.number" required></label><label>Fecha<span class="date-field"><input v-model="quote.date" type="date" required><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg></span></label></section>
        </div>
        <section class="items-card"><div class="items-header"><h2>Detalle de ítems</h2><button class="desktop-add" type="button" @click="addItem">＋ Agregar ítem</button></div><div class="table-head"><span>Cantidad</span><span>Marca</span><span>Descripción</span><span>Referencia</span><span>Valor unidad</span><span>Acciones</span></div>
          <div v-for="(item, index) in items" :key="item.id" class="item-row"><span class="item-label">Ítem #{{ String(index + 1).padStart(2, '0') }}</span><div class="mobile-field quantity-field"><span>Cantidad</span><input v-model.number="item.quantity" class="quantity-input" min="1" type="number" aria-label="Cantidad" required></div><div class="mobile-field brand-field"><span>Marca</span><input v-model.trim="item.brand" placeholder="Ej. Intel" aria-label="Marca" required></div><div class="mobile-field description-field"><span>Descripción</span><input v-model.trim="item.description" placeholder="Ej. Procesador Core i7" aria-label="Descripción" required></div><div class="mobile-field reference-field"><span>Referencia</span><input v-model.trim="item.reference" placeholder="Ej. BX-2394" aria-label="Referencia" required></div><div class="mobile-field unit-field"><span>Valor unitario</span><div class="currency-input"><span>$</span><input :value="formatInputPrice(item.value)" inputmode="numeric" pattern=".*[1-9].*" title="Ingrese un valor unitario mayor que cero" aria-label="Valor unidad" required @keydown="allowMoneyKeys" @input="updateValue(item, $event)"></div></div><button type="button" class="delete" aria-label="Eliminar ítem" @click="removeItem(item.id)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M9 7l1-3h4l1 3M6 7l1 14h10l1-14"/></svg></button></div>
          <button class="mobile-add" type="button" @click="addItem">⊕ Agregar ítem</button>
          <div class="totals"><div><span>Subtotal:</span><b>{{ formatter.format(subtotal) }}</b></div><div><span>IVA (19%):</span><b>{{ formatter.format(tax) }}</b></div><hr><div class="total"><strong>Total:</strong><strong>{{ formatter.format(total) }}</strong></div></div>
          <label class="totalize-control"><input v-model="shouldIncludeTax" type="checkbox"><span>Totalizar cotización e incluir IVA (19%)</span></label>
        </section>
        <button class="generate-btn" type="submit">Generar cotización <span>▷</span></button>
      </form>
    </section>
    <div v-if="showConfirmation" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirmation-title" @click.self="showConfirmation = false">
      <section class="confirmation-modal">
        <div class="modal-title"><div><span>Resumen de cotización</span><h2 id="confirmation-title">Confirma la información</h2></div><button type="button" aria-label="Cerrar" @click="showConfirmation = false">×</button></div>
        <div class="modal-details"><p><span>Empresa</span><strong>{{ quote.company || 'Sin especificar' }}</strong></p><p><span>N.º cotización</span><strong>{{ quote.number }}</strong></p><p><span>Fecha</span><strong>{{ quote.date || 'Sin especificar' }}</strong></p><p><span>Nota de entrega</span><strong>{{ quote.plate || 'Sin especificar' }}</strong></p></div>
        <div class="modal-items"><div class="modal-items-title"><span>Ítems</span><span>Total</span></div><div v-for="item in items" :key="item.id" class="modal-item"><span>{{ item.quantity }} × {{ item.brand || 'Sin marca' }} · {{ item.description || 'Sin descripción' }}</span><strong>{{ formatter.format((Number(item.quantity) || 0) * (Number(item.value) || 0)) }}</strong></div></div>
        <div class="modal-total"><span>{{ shouldIncludeTax ? 'Total con IVA (19%)' : 'Valor de productos (sin IVA)' }}</span><strong>{{ formatter.format(shouldIncludeTax ? total : subtotal) }}</strong></div>
        <div class="modal-actions"><button type="button" class="cancel-btn" @click="showConfirmation = false">Cancelar</button><button type="button" class="confirm-btn" :disabled="isGenerating" @click="generateQuote">{{ isGenerating ? 'Generando...' : 'Confirmar y descargar' }}</button></div>
      </section>
    </div>
    <footer><button class="brand" @click="goHome">Costify</button><div><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Support</a></div><span>Desarrollado por Ludwing Hernandez</span></footer>
  </main>
</template>
