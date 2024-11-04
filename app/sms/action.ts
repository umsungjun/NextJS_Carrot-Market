"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "유효한 휴대폰 번호를 입력해주세요."
  );
/* coerce = 전달받은 token(type string) => number로 변환 / 변환이 안될 경우 오류 출력 */
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export const smsLogin = async (prevState: ActionState, formData: FormData) => {
  console.log(formData);
  const phone = formData.get("phone");
  const token = formData.get("token");

  /* 첫 호출 */
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);

    if (!result.success) {
      return { token: false, error: result.error.flatten() };
    } else {
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data /* 검증받은 Phone Number */,
          },
        },
      });
      return { token: true };
    }
  } else {
    const result = tokenSchema.safeParse(token);

    if (!result.success) {
      /* flatten() = key: error 형태로 변환해줌 */

      return {
        token: true /* token Input을 보여줘야 함 */,
        error: result.error.flatten(),
      };
    } else {
      /* ToDo Login */
      redirect("/");
    }
  }
};
