"use client";

import { useFormState } from "react-dom";
import { smsLogin } from "./action";

/* Component */
import Button from "@/components/Button";
import Input from "@/components/Input";
import SocialLogin from "@/components/social-login";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {!state.token && (
          <Input
            name="phone"
            type="text"
            placeholder="휴대폰 번호"
            required
            errors={state.error?.formErrors}
          />
        )}
        {state.token && (
          <Input
            name="token"
            type="number"
            placeholder="인증번호"
            required
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? "확인" : "인증번호 전송"} />
      </form>
    </div>
  );
}
