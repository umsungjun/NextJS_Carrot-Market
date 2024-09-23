"use server";
import { z } from "zod";
import bcrypt from "bcrypt";
import {
  NAME_REGEX,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_REGEX,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_ERROR,
  PASSWORD_MAX_ERROR,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { db } from "@/lib/db";

const checkUserName = (username: string) => !NAME_REGEX.includes(username);
const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

/* userName Validation(Server) */
const checkUniqueUserName = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      /* 성능 개선을 위해 id 존재 여부만 확인 */
      id: true,
    },
  });
  return !Boolean(user);
};

/* email Validation(Server) */
const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "이름에 숫자는 사용할 수 없습니다.",
        required_error: "이름을 입력해주세요.",
      })
      .min(NAME_MIN_LENGTH, "이름은 최소 2자 이상이어야 합니다.")
      .max(NAME_MAX_LENGTH, "이름은 최대 20자까지 입력 가능합니다.")
      /* refine: 특정 단어 validation / false를 반환하면 에러문구 반환 */
      .refine(checkUserName, "이름에 부적절한 단어를 사용할 수 없습니다.")
      .refine(
        checkUniqueUserName,
        "이미 사용 중인 이름입니다. 다른 이름을 입력해 주세요."
      ),
    email: z
      .string()
      .email("이메일 형식으로 입력해주세요")
      .refine(
        checkUniqueEmail,
        "이미 사용 중인 이메일입니다. 다른 이메일을 입력해 주세요."
      ),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_ERROR)
      .max(PASSWORD_MAX_LENGTH, PASSWORD_MAX_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(PASSWORD_MAX_LENGTH, "비밀번호는 최대 20자까지 입력 가능합니다."),
  })
  /* 전체 refine이기 때문에 어떤 filed에서 일어난 에러인지 명확하게 표시 해야됨 */
  .refine(checkPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  /* safeParse, safeParseAsync를 사용하면 동기로 처리할 수 있음(서버와 통신하기 때문에 동기로 처리해야 함) */
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    /* flatten() key:["error"] return 해줌 */
    return result.error.flatten();
  } else {
    /* 두번 째 인자는 hash 알고리즘을 몇번 돌릴건지 결정 */
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log("유저 생성", user);
  }
};
