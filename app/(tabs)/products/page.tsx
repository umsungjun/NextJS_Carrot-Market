import { db } from "@/lib/db";

import ProductList from "@/components/product-list";

const getInitialProducts = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      photo: true,
      description: true,
      created_at: true,
    },
    take: 1,
    /* 상풍 최신순으로 정렬 */
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
};

export default async function Products() {
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
