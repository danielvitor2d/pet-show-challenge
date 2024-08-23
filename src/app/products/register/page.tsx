"use client";

import { useToast } from "@/components/ui/use-toast";
import { Paths } from "@/constants/paths";
import { registerProduct, uploadImage } from "@/services/firebaseService";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

const productSchema = z.object({
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
      price: z.number().min(0, "Price must be positive"),
      inPromotion: z.boolean(),
      promotion: z.object({
        newPrice: z.number().min(0, "New price must be positive").optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }).optional(),
      mainImage: z.any(),
      secondaryImages: z.any(),
    })
  ).min(1, "There must be at least one variation."),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductForm() {
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variations",
  });

  const watchPromotions = useWatch({
    control,
    name: "variations",
  }) || [];

  const onSubmit = async (data: ProductFormValues) => {
    try {
      let updatedData: Product = {
        name: data.name,
        supplier: data.supplier,
        description: data.description,
        variations: data.variations.map((variation) => ({
          name: variation.name,
          stock: variation.stock,
          price: variation.price,
          inPromotion: variation.inPromotion,
          description: variation.description,
          barcode: variation.barcode,
          sku: variation.sku,
          promotion: variation.promotion,
          mainImage: '',
          secondaryImages: []
        }))
      }

      for (const idx in data.variations) {
        const variation = data.variations[idx]

        let mainImageUrl = '';

        if (variation.mainImage) {
          mainImageUrl = await uploadImage(variation.mainImage, 'main-images');
        }
  
        const secondaryImageUrls: string[] = [];
        if (variation.secondaryImages) {
          for (const file of variation.secondaryImages) {
            const url = await uploadImage(file, 'secondary-images');
            secondaryImageUrls.push(url);
          }
        }

        updatedData.variations[idx].mainImage = mainImageUrl
        updatedData.variations[idx].secondaryImages = secondaryImageUrls
      }

      registerProduct(updatedData)

      toast({
        title: "Registration",
        description: "Product has been registered!",
      })

      router.replace(Paths.Products.List)
    } catch (error) {

      toast({
        title: "Registration",
        description: "Product not registered! Please try again later.",
      })
    }
  };

  console.log(errors)

  return (
    <form className="flex flex-col gap-6 max-w-4xl mx-auto p-6 shadow-md bg-white rounded-md" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold mb-4 text-center">{'Register product'}</h1>

      <div className="flex flex-col gap-4">
        <div>
          <label className="font-medium">{'Product name'}</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Product name"
            className="border p-3 rounded-md w-full "
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="font-medium">Description</label>
          <textarea
            {...register("description")}
            placeholder="Description do Produto"
            className="border p-3 rounded-md w-full h-24 resize-none "
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="font-medium">Supplier name</label>
          <input
            type="text"
            {...register("supplier")}
            placeholder="Supplier name"
            className="border p-3 rounded-md w-full "
          />
          {errors.supplier && <p className="text-red-500 text-sm mt-1">{errors.supplier.message}</p>}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Variations</h2>
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-4 border p-4 rounded-md mb-6">
            <div className="flex flex-row gap-4 items-center">
              <label htmlFor="mainImage">Main image</label>

              <input
                type="file"
                id="mainImage"
                accept="image/*"
                {...register(`variations.${index}.mainImage` as const)}
                className="border p-2"
              />
            </div>

            <div className="flex flex-row gap-4 items-center">
              <label htmlFor="secondaryImages">Secondary image</label>

              <input
                type="file"
                id="secondaryImages"
                accept="image/*"
                multiple
                {...register(`variations.${index}.secondaryImages` as const)}
                className="border p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Barcode</label>
                <input
                  type="text"
                  {...register(`variations.${index}.barcode` as const)}
                  placeholder="Barcode"
                  className="border p-3 rounded-md w-full"
                />
                {errors.variations?.[index]?.barcode && (
                  <p className="text-red-500 text-sm mt-1">{errors.variations[index]?.barcode?.message}</p>
                )}
              </div>

              <div>
                <label className="font-medium">SKU</label>
                <input
                  type="text"
                  {...register(`variations.${index}.sku` as const)}
                  placeholder="SKU"
                  className="border p-3 rounded-md w-full"
                />
                {errors.variations?.[index]?.sku && (
                  <p className="text-red-500 text-sm mt-1">{errors.variations[index]?.sku?.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Variation name</label>
                <input
                  type="text"
                  {...register(`variations.${index}.name` as const)}
                  placeholder="Variation name"
                  className="border p-3 rounded-md w-full"
                />
                {errors.variations?.[index]?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.variations[index]?.name?.message}</p>
                )}
              </div>

              <div>
                <label className="font-medium">Description</label>
                <input
                  type="text"
                  {...register(`variations.${index}.description` as const)}
                  placeholder="Description da Variação"
                  className="border p-3 rounded-md w-full"
                />
                {errors.variations?.[index]?.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.variations[index]?.description?.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Quantity in stock</label>
                <input
                  type="number"
                  {...register(`variations.${index}.stock` as const, { valueAsNumber: true })}
                  placeholder="Quantity in stock"
                  className="border p-3 rounded-md w-full"
                />
                {errors.variations?.[index]?.stock && (
                  <p className="text-red-500 text-sm mt-1">{errors.variations[index]?.stock?.message}</p>
                )}
              </div>

              <div>
                <label className="font-medium">Price</label>
                <input
                  type="number"
                  {...register(`variations.${index}.price` as const, { valueAsNumber: true })}
                  placeholder="Price"
                  className="border p-3 rounded-md w-full"
                />
                {errors.variations?.[index]?.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.variations[index]?.price?.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register(`variations.${index}.inPromotion` as const)}
                  className="h-5 w-5"
                />
                <label className="font-medium">In Promotion</label>
              </div>
            </div>

            {/* Exibe campos de promoção se o checkbox estiver marcado */}
            {watchPromotions[index]?.inPromotion && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">New Price</label>
                  <input
                    type="number"
                    {...register(`variations.${index}.promotion.newPrice` as const, { valueAsNumber: true })}
                    placeholder="New Price"
                    className="border p-3 rounded-md w-full"
                  />
                </div>

                <div>
                  <label className="font-medium">Start Date</label>
                  <input
                    type="date"
                    {...register(`variations.${index}.promotion.startDate` as const)}
                    className="border p-3 rounded-md w-full"
                  />
                </div>

                <div>
                  <label className="font-medium">End Date</label>
                  <input
                    type="date"
                    {...register(`variations.${index}.promotion.endDate` as const)}
                    className="border p-3 rounded-md w-full"
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => remove(index)}
              className="self-end mt-2 text-red-600 hover:underline"
            >
              Remove variation
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              barcode: "",
              sku: "",
              name: "",
              description: "",
              stock: 0,
              price: 0,
              inPromotion: false,
              promotion: {
                newPrice: 0,
                startDate: "",
                endDate: "",
              },
            })
          }
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Register Variation
        </button>
      </div>
      {errors.variations && <p className="text-red-500 text-sm mt-1">{errors.variations.message}</p>}

      <button
        type="submit"
        className="bg-green-500 text-white p-4 rounded-md mt-6 hover:bg-green-600 transition-colors"
      >
        Register Product
      </button>
    </form>
  );
}
