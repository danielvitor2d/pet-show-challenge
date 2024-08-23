"use client"

import { constants } from "@/constants/react-query-constants";
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

  if (isError) {
    return (
      <section className="min-w-[800px] min-h-[800px] flex items-center justify-center">
        <p>Failed to load products. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="min-w-[800px] min-h-[800px] flex flex-col gap-20 items-center justify-start">
      <h1>PetShow - Listing Products</h1>

      <div className="flex flex-col gap-4 items-start">
        <button
          type="button"
          onClick={() => router.push('/products/register')}
          className="w-auto px-4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          {'Register Product'}
        </button>

        <div className="flex flex-col gap-4">
          {data?.map(({ name, description, variations, supplier }, idx) => (
            <ProductCard 
              key={idx} 
              name={name} 
              url_image={`https://picsum.photos/seed/${new Date().getTime() * (idx + 1)}/320/640`}
              description={description ?? ""}
              supplier={supplier}
              variations={variations}
            />
          ))}
        </div>
      </div>
    </section>
  );
}