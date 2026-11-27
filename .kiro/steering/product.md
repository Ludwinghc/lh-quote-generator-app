# Producto

**Costify** es una aplicación web para generar cotizaciones de ventas profesionales como archivos Excel descargables. Está construida para una empresa colombiana específica — Mundial de Tractomulas SAS — y maneja precios en pesos colombianos (COP) con IVA del 19%.

## Flujo principal del usuario

1. La página de inicio presenta el producto e invita al usuario a crear una cotización.
2. El formulario de cotización recopila información de la empresa e ítems (cantidad, marca, descripción, referencia, valor unitario).
3. Al enviar, un modal de confirmación resume la cotización.
4. Al confirmar, se genera y descarga un archivo `.xlsx` formateado mediante ExcelJS.

## Conceptos clave del dominio

- **Cotización**: documento formal de presupuesto de ventas.
- **IVA**: impuesto colombiano del 19%, incluido opcionalmente en el total.
- **Ítems**: líneas individuales de la cotización (cantidad × valor unitario = total por línea).
- El formateo de moneda usa la configuración regional `es-CO` (peso colombiano, sin decimales).
- Los precios se ingresan como enteros; la interfaz los formatea con separadores de miles.
