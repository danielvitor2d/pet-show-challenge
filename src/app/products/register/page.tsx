"use client";

import { useToast } from "@/components/ui/use-toast";
import { registerProduct } from "@/services/firebaseService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Nome do produto é obrigatório"),
  description: z.string().optional(),
  supplier: z.string().min(1, "Nome do fornecedor é obrigatório"),
  variations: z.array(
    z.object({
      barcode: z.string().optional(),
      sku: z.string().optional(),
      name: z.string().min(1, "Nome da variação é obrigatório"),
      description: z.string().optional(),
      stock: z.number().min(0, "Quantidade em estoque deve ser positiva"),
      price: z.number().min(0, "Preço deve ser positivo"),
      inPromotion: z.boolean(),
      promotion: z.object({
        newPrice: z.number().min(0, "Novo preço deve ser positivo").optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }).optional(),
    })
  ),
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

  const onSubmit = (data: ProductFormValues) => {
    try {
      registerProduct(data)

      toast({
        title: "Registration",
        description: "Product has been registered!",
      })

      router.replace('/products')
    } catch (error) {

      toast({
        title: "Registration",
        description: "Product not registered! Please try again later.",
      })
    }
  };

  return (
    <form className="flex flex-col gap-6 max-w-4xl mx-auto p-6 bg-zinc-200 shadow-md rounded-md" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold mb-4 text-center">Cadastrar Produto</h1>

      <div className="flex flex-col gap-4">
        <div>
          <label className="font-medium">Nome do Produto</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Nome do Produto"
            className="border p-3 rounded-md w-full bg-zinc-200"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="font-medium">Descrição</label>
          <textarea
            {...register("description")}
            placeholder="Descrição do Produto"
            className="border p-3 rounded-md w-full h-24 resize-none bg-zinc-200"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="font-medium">Nome do Fornecedor</label>
          <input
            type="text"
            {...register("supplier")}
            placeholder="Nome do Fornecedor"
            className="border p-3 rounded-md w-full bg-zinc-200"
          />
          {errors.supplier && <p className="text-red-500 text-sm mt-1">{errors.supplier.message}</p>}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Variações</h2>
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-4 border p-4 rounded-md mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Código de Barras</label>
                <input
                  type="text"
                  {...register(`variations.${index}.barcode` as const)}
                  placeholder="Código de Barras"
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
                <label className="font-medium">Nome da Variação</label>
                <input
                  type="text"
                  {...register(`variations.${index}.name` as const)}
                  placeholder="Nome da Variação"
                  className="border p-3 rounded-md w-full"
                />
                {errors.variations?.[index]?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.variations[index]?.name?.message}</p>
                )}
              </div>

              <div>
                <label className="font-medium">Descrição</label>
                <input
                  type="text"
                  {...register(`variations.${index}.description` as const)}
                  placeholder="Descrição da Variação"
                  className="border p-3 rounded-md w-full"
                />
                {errors.variations?.[index]?.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.variations[index]?.description?.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Quantidade em Estoque</label>
                <input
                  type="number"
                  {...register(`variations.${index}.stock` as const, { valueAsNumber: true })}
                  placeholder="Quantidade em Estoque"
                  className="border p-3 rounded-md w-full"
                />
                {errors.variations?.[index]?.stock && (
                  <p className="text-red-500 text-sm mt-1">{errors.variations[index]?.stock?.message}</p>
                )}
              </div>

              <div>
                <label className="font-medium">Preço</label>
                <input
                  type="number"
                  {...register(`variations.${index}.price` as const, { valueAsNumber: true })}
                  placeholder="Preço"
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
                <label className="font-medium">Em Promoção</label>
              </div>
            </div>

            {/* Exibe campos de promoção se o checkbox estiver marcado */}
            {watchPromotions[index]?.inPromotion && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">Novo Preço</label>
                  <input
                    type="number"
                    {...register(`variations.${index}.promotion.newPrice` as const, { valueAsNumber: true })}
                    placeholder="Novo Preço"
                    className="border p-3 rounded-md w-full"
                  />
                </div>

                <div>
                  <label className="font-medium">Data de Início</label>
                  <input
                    type="date"
                    {...register(`variations.${index}.promotion.startDate` as const)}
                    className="border p-3 rounded-md w-full"
                  />
                </div>

                <div>
                  <label className="font-medium">Data de Término</label>
                  <input
                    type="date"
                    {...register(`variations.${index}.promotion.endDate` as const)}
                    className="border p-3 rounded-md w-full"
                  />
                </div>
              </div>
            )}

            {/* Botão para remover variação */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="self-end mt-2 text-red-600 hover:underline"
            >
              Remover Variação
            </button>
          </div>
        ))}

        {/* Botão para adicionar nova variação */}
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
          Adicionar Variação
        </button>
      </div>

      {/* Botão para submeter o formulário */}
      <button
        type="submit"
        className="bg-green-500 text-white p-4 rounded-md mt-6 hover:bg-green-600 transition-colors"
      >
        Cadastrar Produto
      </button>
    </form>
  );
}
