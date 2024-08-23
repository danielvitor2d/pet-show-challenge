export const formatPrice = (value: string) => {
  const numberValue = parseFloat(value.replace(/[^\d.-]/g, ""));
  if (isNaN(numberValue)) return "";
  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
};