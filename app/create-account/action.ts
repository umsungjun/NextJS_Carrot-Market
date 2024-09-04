"use server";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(3).max(5),
  email: z.string().email(),
  password: z.string().min(10),
  confirmPassword: z.string().min(10),
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
    return result.error.flatten();
  }
};
