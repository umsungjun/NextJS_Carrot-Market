"use server";

import { redirect } from "next/navigation";

export const handleForm = async (prevState: any, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  redirect("/");
  return {
    errors: ["wrong password", "password too short"],
  };
};
