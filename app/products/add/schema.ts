import { z } from "zod";

export const productSchema = z.object({
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
