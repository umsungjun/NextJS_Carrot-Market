"use server";
import { z } from "zod";
import {
  NAME_REGEX,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_REGEX,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from "@/lib/constants";

const checkUserName = (userName: string) => !NAME_REGEX.includes(userName);
const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

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
      .refine(checkUserName, "이름에 부적절한 단어를 사용할 수 없습니다."),
    email: z.string().email("이메일 형식으로 입력해주세요"),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(PASSWORD_MAX_LENGTH, "비밀번호는 최대 20자까지 입력 가능합니다.")
      .regex(
        PASSWORD_REGEX,
        "비밀번호는 문자, 숫자, 특수문자를 포함해야 합니다."
      ),
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
  const result = formSchema.safeParse(data);

  if (!result.success) {
    /* flatten() key:["error"] return 해줌 */
    // console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
