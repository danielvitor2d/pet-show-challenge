import ProductCard from "./components/product-card";

export default function Page() {
  return (
    <section className="min-w-[800px] min-h-[800px] flex flex-col gap-20 items-center justify-start">
      <h1>PetShow - Listing Products</h1>

      <div className="flex flex-col gap-4">
        {
          generateProducts().map(({ image, name, variations }, idx) => (
            <ProductCard 
              key={idx} 
              name={name} 
              url_image={image}
              description="Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Bota 1 metro de cachacis aí pra"
              variations={variations}
            />
          ))
        }
      </div>
    </section>
  );
}

function generateProducts(): Array<any> {
  const arraySize = 45;
  const products: Array<any> = [];

  for (let i = 0; i < arraySize; i++) {
    products.push({
      name: `Product ${i + 1}`,
      image: new URL(
        `https://picsum.photos/seed/${new Date().getTime() * (i + 1)}/320/640`,
      ).toString(),
      variations: [
        {
          name: "Tamanho P",
          price: 19.99,
          stock: 15,
          inPromotion: true,
          promotion: {
            newPrice: 15.99,
            startDate: "2024-08-01",
            endDate: "2024-08-31"
          }
        },
        {
          name: "Tamanho M",
          price: 21.99,
          stock: 10,
          inPromotion: false,
        },
      ],
    });
  }

  return products;
}
