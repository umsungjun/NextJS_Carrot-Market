"use server";

import { db } from "@/lib/db";

export const getMoreProducts = async (page: number) => {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      photo: true,
      description: true,
      created_at: true,
    },
    /* 건너 뛰는 옵션 */
    skip: 1,
    /* 가져올 개수 지정 옵션 */
    take: 1,
    /* 상풍 최신순으로 정렬 */
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
};
