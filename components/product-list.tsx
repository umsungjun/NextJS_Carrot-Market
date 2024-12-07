"use client";

import { useState } from "react";
import ListProduct from "./list-product";
import { getMoreProducts } from "@/app/(tabs)/products/action";

interface ProductListProps {
  initialProducts: {
    id: number;
    title: string;
    price: number;
    photo: string;
    description: string;
    created_at: Date;
  }[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  /* 마지막 페이지 여부 */
  const [isLastPage, setIsLastPage] = useState(false);

  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(page + 1);

    if (newProducts.length !== 0) {
      setPage((prev) => prev + 1);
      setProducts((prev) => [...prev, ...newProducts]);
    } else {
      setIsLastPage(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {isLastPage ? (
        <></>
      ) : (
        <button
          onClick={onLoadMoreClick}
          className="bg-red-500"
          disabled={isLoading}
        >
          {isLoading ? "로딩 중" : "더 불러와"}
        </button>
      )}
    </div>
  );
}
