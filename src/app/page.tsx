import { Paths } from "@/constants/paths";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect(Paths.Products.List)
}
