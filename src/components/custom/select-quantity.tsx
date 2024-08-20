"use client";

import { cn } from "@/utils/tw-merge";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

export default function SelectQuantityButton() {
  const [quantity, setQuantity] = useState(1)

  const isDecreaseEnabled = useMemo(() => quantity !== 1, [quantity])

  const inscrease = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="max-h-10 m-0 p-0 flex flex-row gap-0 items-center justify-center">
      <button
        className={cn(
          "bg-zinc-200 p-2 border-none rounded-tl-md rounded-bl-md", 
          {
            "hover:bg-zinc-300": isDecreaseEnabled,
            "text-zinc-400 cursor-not-allowed": !isDecreaseEnabled
          }
        )}
        disabled={!isDecreaseEnabled}
        onClick={decrease}
      >
        <MinusIcon className="size-4" />  
      </button>

      <div className="h-8 px-3 text-xs text-center border-y border-zinc-100 flex items-center justify-center">
        {quantity}
      </div>

      <button
        className="bg-zinc-200 hover:bg-zinc-300 p-2 border-none rounded-tr-md rounded-br-md"
        onClick={inscrease}
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  )
}