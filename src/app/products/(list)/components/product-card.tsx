import SelectQuantityButton from "@/components/custom/select-quantity";
import { Button } from "@/components/ui/button";

interface Props {
  url_image: string
  name: string
}

export default function ProductCard({
  url_image,
  name
}: Props) {
  return (
    <div className="w-[16rem] min-h-[32rem] h-auto bg-white rounded-md shadow-md p-4 flex flex-col justify-start gap-4">
      <img 
        src={url_image}
        alt="product"
        className="w-full h-[15rem] object-cover rounded-md mb-4" 
      />

      <div className="flex-1 text-sm justify-between">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>

        <p className="text-xs font-normal text-zinc-500 mb-2">
          Mussum Ipsum, cacilds vidis litro abertis.  Quem num gosta di mim que vai caçá sua turmis! Bota 1 metro de cachacis aí pra
        </p>

        <p className="mb-1 font-bold">R$ 99,99</p>
      </div>

      <div className="w-full flex flex-row justify-between items-center">
        <Button size="custom" className="py-1 px-4 bg-[#1e4646] hover:bg-[#2a6161] text-xs font-normal">
          Add to Cart
        </Button>

        <SelectQuantityButton />
      </div>
    </div>
  );
}
