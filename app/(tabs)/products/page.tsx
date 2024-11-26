import ListProduct from "@/components/list-product";
import { db } from "@/lib/db";

const getProducts = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      photo: true,
      description: true,
      created_at: true,
    },
  });
  return products;
};

export default async function Products() {
  const products = await getProducts();
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
    </div>
  );
}
