import { describe, expect, it } from "vitest";
import { useQuoteForm } from "./useQuoteForm";

describe("useQuoteForm", () => {
  it("calcula subtotal, IVA y total a partir de los ítems", () => {
    const { items, subtotal, tax, total } = useQuoteForm();
    items.value[0].quantity = 2;
    items.value[0].value = 100000;

    expect(subtotal.value).toBe(200000);
    expect(tax.value).toBe(38000);
    expect(total.value).toBe(238000);
  });
});
