import ProductCard from "./components/product-card";

function generateProducts(): Array<any> {
  const arraySize = 100
  const projects: Array<any> = []

  for (let i = 0; i < arraySize; i++) {
    projects.push({
      name: `Product ${i}`,
      image: new URL(
        `https://picsum.photos/seed/${new Date().getTime() * (i + 1)}/320/640`,
      ).toString(),
    })
  }

  return projects
}

export default function Page() {
  return (
    <section className="min-w-[800px] min-h-[800px] flex flex-col gap-20 items-center justify-start">
      <h1>PetShow - Listing Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-4">
        {
          generateProducts().map(({ image, name }, idx) => (
            <ProductCard key={idx} name={name} url_image={image} />
          ))
        }
      </div>
    </section>
  );
}
