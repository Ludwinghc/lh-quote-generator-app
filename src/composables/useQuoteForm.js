import { computed, ref } from "vue";

const createItem = () => ({
  id: crypto.randomUUID(),
  quantity: 1,
  brand: "",
  description: "",
  reference: "",
  value: 0,
});
const createQuote = () => ({
  company: "",
  city: "",
  plate: "",
  number: "QT-2024-001",
  date: "",
});

export function useQuoteForm() {
  const quote = ref(createQuote());
  const items = ref([createItem()]);
  const shouldIncludeTax = ref(true);
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  const subtotal = computed(() =>
    items.value.reduce(
      (sum, item) =>
        sum + (Number(item.quantity) || 0) * (Number(item.value) || 0),
      0,
    ),
  );
  const tax = computed(() => subtotal.value * 0.19);
  const total = computed(() => subtotal.value + tax.value);
  const addItem = () => items.value.push(createItem());
  const removeItem = (id) => {
    items.value =
      items.value.length > 1
        ? items.value.filter((item) => item.id !== id)
        : [createItem()];
  };
  const formatInputPrice = (value) =>
    new Intl.NumberFormat("es-CO").format(Number(value) || 0);
  const updateValue = (item, event) => {
    item.value = Number(event.target.value.replace(/\D/g, "")) || 0;
  };
  const allowMoneyKeys = (event) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      [
        "Backspace",
        "Delete",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
      ].includes(event.key)
    )
      return;
    if (!/^\d$/.test(event.key)) event.preventDefault();
  };
  const reset = () => {
    quote.value = createQuote();
    items.value = [createItem()];
    shouldIncludeTax.value = true;
  };
  return {
    quote,
    items,
    shouldIncludeTax,
    formatter,
    subtotal,
    tax,
    total,
    addItem,
    removeItem,
    formatInputPrice,
    updateValue,
    allowMoneyKeys,
    reset,
  };
}
