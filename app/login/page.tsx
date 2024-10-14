"use client";

import { useFormState } from "react-dom";

/* Component */
import Input from "@/components/Input";
import Button from "@/components/Button";
import SocialLogin from "@/components/social-login";

/* Util */
import { login } from "./action";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function Login() {
  const [state, action] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email ans password.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          maxLength={PASSWORD_MAX_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
