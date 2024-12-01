import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";

const getIsOwner = async (userId: number) => {
  const { id } = await getSession();

  return id === userId;
};

const getProduct = async (id: number) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });

  return product;
};

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  /* id값이 이상할 때 예외처리 */
  if (isNaN(id)) return notFound();

  const product = await getProduct(id);

  /* 상품정보가 없을 때 예외처리 */
  if (!product) return notFound();

  /* 상품을 올린 사용자인지 아닌지 여부 */
  const isOwner = await getIsOwner(product.userId);

  return (
    <div>
      <div className="relative aspect-square">
        <Image fill src={product.photo} alt={product.title} />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full">
          {product.user.avatar ? (
            <Image
              src={product.user.avatar}
              alt={product.user.username}
              width={40}
              height={40}
            />
          ) : (
            <UserIcon className="size-10" />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold ">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-lg">
          {formatToWon(product.price)}원
        </span>
        {/* ToDo 상품을 올린 유저일 때 삭제하기 기능 구현 */}
        <Link
          href={``}
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
        >
          채팅하기
        </Link>
      </div>
    </div>
  );
}
