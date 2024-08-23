import { Variation } from "@/types/product";

interface Props {
  url_image: string;
  name: string;
  description: string;
  supplier: string
  variations: Variation[];
}

export default function ProductCard({
  url_image,
  name,
  description,
  supplier,
  variations,
}: Props) {
  return (
    <div className="min-w-[750px] w-max h-auto bg-white rounded-md shadow-md p-4 flex flex-row justify-start gap-4">
      <img
        src={url_image}
        alt="product"
        className="w-[16rem] h-[16rem] object-cover rounded-md mb-4" 
      />

      <div className="flex-1 text-sm justify-between">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>

        <p className="text-xs font-semibold text-zinc-800 mb-2">
          {`Supplier: ${supplier}`}
        </p>

        <p className="text-xs font-normal text-zinc-500 mb-2">
          {description}
        </p>

        <div className="flex flex-col gap-2">
          {variations.map((variation, idx) => (
            <div key={idx} className="flex flex-col">
              <p className="font-semibold">{variation.name}</p>

              {variation.inPromotion && variation.promotion ? (
                <div>
                  <p className="text-sm line-through text-red-500">
                    Preço: R$ {variation.price.toFixed(2)}
                  </p>
                  <p className="text-sm font-bold text-green-500">
                    Promoção: R$ {(variation.promotion.newPrice ?? 0).toFixed(2)}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Promoção válida de {new Date(variation.promotion.startDate!).toLocaleDateString()} até {new Date(variation.promotion.endDate!).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p className="text-sm">Preço: R$ {variation.price.toFixed(2)}</p>
              )}

              <p className="text-sm">Em estoque: {variation.stock} un</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
