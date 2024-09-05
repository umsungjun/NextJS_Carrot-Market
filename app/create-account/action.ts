"use server";
import { z } from "zod";

const checkUserName = (userName: string) => !userName.includes("fuck");
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
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my userName?",
      })
      .min(3, "Way too short!!!")
      .max(5, "That is too long!!!")
      /* refine: 특정 단어 validation / false를 반환하면 에러문구 반환 */
      .refine(checkUserName, "no Fuck"),
    email: z.string().email(),
    password: z.string().min(10),
    confirmPassword: z.string().min(10),
  })
  /* 전체 refine이기 때문에 어떤 filed에서 일어난 에러인지 명확하게 표시 해야됨 */
  .refine(checkPassword, {
    message: "Both passwords should be the same!",
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
    console.log(result.error.flatten());
    return result.error.flatten();
  }
};
