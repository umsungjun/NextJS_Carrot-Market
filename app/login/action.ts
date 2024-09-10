"use server";

import {
  PASSWORD_MAX_ERROR,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_ERROR)
    .max(PASSWORD_MAX_LENGTH, PASSWORD_MAX_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
};
