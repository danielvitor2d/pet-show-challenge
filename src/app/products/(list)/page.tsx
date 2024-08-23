"use client"

import { Paths } from "@/constants/paths";
import { constants } from "@/constants/react-query-constants";
import NoData from "@/core/components/no-data";
import { fetchProducts } from "@/services/firebaseService";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ProductCard from "./components/product-card";

export default function Page() {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: [constants.products.listing],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <section className="min-w-[800px] min-h-[800px] flex items-center justify-center">
        <p>Loading...</p>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="min-w-[800px] min-h-[800px] flex items-center justify-center">
        <p>{'Failed to load products. Please try again later.'}</p>
      </section>
    );
  }

  return (
    <section className="w-max h-max flex flex-col gap-20 items-center justify-center">
      <h1 className="text-3xl font-semibold">PetShow</h1>

      <div className="flex flex-col gap-4 items-center">
        <button
          type="button"
          onClick={() => router.push(Paths.Products.Register)}
          className="w-auto px-4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          {'Register Product'}
        </button>

        <div className="flex flex-col gap-4 items-center justify-center">
          {data.map(({ name, description, variations, supplier, id }, idx) => (
            <ProductCard 
              key={idx} 
              name={name} 
              url_image={variations[0].mainImage}
              description={description ?? ""}
              supplier={supplier}
              variations={variations}
              productId={id!}
            />
          ))}
          {
            (!data || data.length === 0) && (
              <NoData />
            )
          }
        </div>
      </div>
    </section>
  );
}