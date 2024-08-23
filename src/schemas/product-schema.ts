import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  supplier: z.string().min(1, "Supplier name is required"),
  variations: z.array(
    z.object({
      barcode: z.string().optional(),
      sku: z.string().optional(),
      name: z.string().min(1, "Variation name is required"),
      description: z.string().optional(),
      stock: z.number().min(0, "Quantity in stock must be positive"),
      price: z.number().min(0, "Price must be positive."),
      inPromotion: z.boolean(),
      promotion: z.object({
        newPrice: z.number().min(0, "New price must be positive").optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }).optional().nullable(),
      mainImage: z.any(),
      secondaryImages: z.any(),
    })
  ).min(1, "There must be at least one variation."),
});