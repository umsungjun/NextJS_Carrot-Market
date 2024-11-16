"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

import {
  PASSWORD_MAX_ERROR,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { db } from "@/lib/db";
import { z } from "zod";
import { saveSession } from "@/lib/session";

/* 입력한 이메일을 사용하는 유저 존재 여부 */
const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "입력하신 이메일 주소가 존재하지 않습니다."),
  password: z
    .string({
      required_error: "비밀번호는 필수 값입니다.",
    })
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_ERROR)
    .max(PASSWORD_MAX_LENGTH, PASSWORD_MAX_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  /* refines를 쓰는 검증이 있다면  safeParse -> safeParseAsync로 변경 해야됨*/
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    /* compare 앞에 인자(비밀번호)와 뒤에 인자(해쉬 된 비밀번호)가 같은지 비교 */
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");

    if (ok) {
      await saveSession(user!.id);
    } else {
      return {
        fieldErrors: {
          email: [],
          password: ["잘못된 비밀번호입니다. 한 번 더 확인해주세요."],
        },
      };
    }
  }
};
