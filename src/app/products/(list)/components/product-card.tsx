import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { constants } from "@/constants/react-query-constants";
import { removeProduct } from "@/services/firebaseService";
import { Variation } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  productId: string;
  name: string;
  description: string;
  supplier: string;
  variations: Variation[];
}

export default function ProductCard({
  productId,
  name,
  description,
  supplier,
  variations,
}: Props) {
  const [selectedVariation, setSelectedVariation] = useState<Variation>(variations[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => removeProduct(productId, { name, description, supplier, variations }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [constants.products.listing]
      });
      console.log(`Product ${productId} deleted successfully.`);
    },
    onError: (error) => {
      console.error("Error removing product: ", error);
    },
  });

  const handleVariationChange = (variation: Variation) => {
    setSelectedVariation(variation);
  };

  const handleDelete = () => {
    mutate();
    setIsDialogOpen(false);
  };

  return (
    <div className="min-w-[750px] w-max h-auto bg-white rounded-md shadow-md p-4 flex flex-row justify-start gap-4">
      <img
        src={selectedVariation.mainImage}
        alt="product"
        className="w-[16rem] h-[16rem] object-cover rounded-md mb-4"
      />

      <div className="flex-1 text-sm justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold mb-2">{name}</h2>

            <p className="text-xs font-semibold text-zinc-800 mb-2">
              {`Supplier: ${supplier}`}
            </p>

            <p className="text-xs font-normal text-zinc-500 mb-2">
              {`Description: ${description}`}
            </p>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            Delete
          </button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Product</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete the product "{name}"?</p>
              <DialogFooter>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

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
