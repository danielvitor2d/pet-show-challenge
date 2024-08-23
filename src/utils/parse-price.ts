export const parsePrice = (value: string) => {
  const numericValue = parseFloat(value.replace(/[^\d.-]/g, ""));
  return isNaN(numericValue) ? 0 : numericValue;
}