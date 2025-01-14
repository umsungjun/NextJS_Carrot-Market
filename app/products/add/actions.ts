"use server";

import { z } from "zod";
import { db } from "@/lib/db";
/* fs fileSystem을 위한 Node.js 내장 라이브러리 */
import fs from "fs/promises";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
  photo: z.string({
    required_error: "사진을 등록해주세요.",
  }),
  title: z
    .string({
      required_error: "상품명을 입력해주세요.",
    })
    .min(1)
    .max(30),
  description: z.string({
    required_error: "상품 설명을 입력해주세요.",
  }),
  /* z.coerce.number()는 값을 숫자로 변환하고, 변환 실패 시 에러 처리 */
  price: z.coerce.number({
    required_error: "가격을 입력해주세요.",
  }),
});

export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };

  /* photo의 속성이 File일 때 */
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    /* 사용자가 업로드한 이미지를 프로젝트내에 public 폴더에 저장 */
    await fs.appendFile(
      `./public/${data.photo.name}`,
      new Uint8Array(photoData)
    );
    data.photo = `/${data.photo.name}`;
  }
  const result = productSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          photo: result.data.photo,
          title: result.data.title,
          description: result.data.description,
          price: result.data.price,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        /* id값만 return */
        select: {
          id: true,
        },
      });

      redirect(`/products/${product.id}`);
    }
  }
}
