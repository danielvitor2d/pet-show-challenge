
export type Variation = {
  barcode?: string;
  sku?: string;
  name: string;
  description?: string;
  stock: number;
  price: number;
  inPromotion: boolean;
  promotion?: {
    newPrice?: number;
    startDate?: string;
    endDate?: string;
  } | null,
  mainImage: string;
  secondaryImages: string[];
}

export type Product = {
  name: string;
  description?: string;
  supplier: string;
  variations: Array<Variation>
}