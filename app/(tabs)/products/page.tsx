import Link from "next/link";
import { db } from "@/lib/db";

import ProductList from "@/components/product-list";

import { PlusIcon } from "@heroicons/react/24/solid";

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
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-6 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
