"use server";

import twilio from "twilio";
import crypto from "crypto";
import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { saveSession } from "@/lib/session";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "유효한 휴대폰 번호를 입력해주세요."
  );

const tokenExists = async (token: number) => {
  const exists = await db.sMSToken.findUnique({
    where: {
      token: token + "",
    },
    select: {
      id: true,
    },
  });

  return Boolean(exists);
};

/* coerce = 전달받은 token(type string) => number로 변환 / 변환이 안될 경우 오류 출력 */
const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  // refine return 값이 false일 때 에러 출력
  .refine(tokenExists, "인증번호가 유효하지 않습니다.");

interface ActionState {
  token: boolean;
}

const createToken = async () => {
  const token = crypto.randomInt(100000, 999999).toString();

  const exists = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });

  if (exists) {
    /* 토큰 존재 시 */
    return createToken();
  } else {
    return token;
  }
};

export const smsLogin = async (prevState: ActionState, formData: FormData) => {
  const phone = formData.get("phone");
  const token = formData.get("token");

  /* 첫 호출 */
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);

    if (!result.success) {
      return { token: false, error: result.error.flatten() };
    } else {
      /* 기존에 존재하던 토큰 제거 */
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data /* 검증받은 Phone Number */,
          },
        },
      });

      const token = await createToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            /* 유저가 존재하면 phone값으로 연결, 존재하지 않다면 휴대폰 번호로 생성 */
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: result.data,
                phone: result.data,
              },
            },
          },
        },
      });

      /* twilio client 생성 */
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      /* sms 인증번호 전송(twilio 체험판 계정이라 가입 계정 번호로만 전송 가능) */
      await client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: process.env.MY_PHONE_NUMBER!, // result.data가 맞지만 내 번호만 됨,
        body: `당근 마켓 인증번호 ${token}`,
      });

      return { token: true };
    }
  } else {
    const result = await tokenSchema.safeParseAsync(token);

    if (!result.success) {
      /* flatten() = key: error 형태로 변환해줌 */

      return {
        token: true /* token Input을 보여줘야 함 */,
        error: result.error.flatten(),
      };
    } else {
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data + "",
        },
        select: {
          id: true,
          userId: true,
        },
      });

      await saveSession(token!.userId);
      await db.sMSToken.delete({
        where: {
          id: token!.id,
        },
      });

      redirect("/profile");
    }
  }
};
