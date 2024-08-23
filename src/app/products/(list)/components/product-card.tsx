import { Variation } from "@/types/product";
import { useState } from "react";

interface Props {
  url_image: string;
  name: string;
  description: string;
  supplier: string;
  variations: Variation[];
}

export default function ProductCard({
  name,
  description,
  supplier,
  variations,
}: Props) {
  const [selectedVariation, setSelectedVariation] = useState<Variation>(variations[0]);

  const handleVariationChange = (variation: Variation) => {
    setSelectedVariation(variation);
  };

  return (
    <div className="min-w-[750px] w-max h-auto bg-white rounded-md shadow-md p-4 flex flex-row justify-start gap-4">
      <img
        src={selectedVariation.mainImage}
        alt="product"
        className="w-[16rem] h-[16rem] object-cover rounded-md mb-4"
      />

      <div className="flex-1 text-sm justify-between">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>

        <p className="text-xs font-semibold text-zinc-800 mb-2">
          {`Supplier: ${supplier}`}
        </p>

        <p className="text-xs font-normal text-zinc-500 mb-2">
          {`Description: ${description}`}
        </p>

        <div className="flex flex-col gap-2">
          <div>
            <p className="font-semibold">{selectedVariation.name}</p>

            {selectedVariation.inPromotion && selectedVariation.promotion ? (
              <div>
                <p className="text-sm line-through text-red-500">
                  Price: R$ {selectedVariation.price.toFixed(2)}
                </p>
                <p className="text-sm font-bold text-green-500">
                  Promotion: R$ {(selectedVariation.promotion.newPrice ?? 0).toFixed(2)}
                </p>
                <p className="text-xs text-zinc-500">
                  Promotion valid from {new Date(selectedVariation.promotion.startDate!).toLocaleDateString()} to {new Date(selectedVariation.promotion.endDate!).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p className="text-sm">Price: R$ {selectedVariation.price.toFixed(2)}</p>
            )}

            <p className="text-sm">In stock: {selectedVariation.stock} un</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {variations.map((variation, idx) => (
            <img
              key={idx}
              src={variation.mainImage}
              alt={`Thumbnail ${idx}`}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${selectedVariation === variation ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => handleVariationChange(variation)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
