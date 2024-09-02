import Link from "next/link";

/* Component */
import FormInput from "@/components/form-input";
import FormBtn from "@/components/form-btn";

/* Icon */
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="text" placeholder="Name" required errors={[]} />
        <FormInput type="email" placeholder="Email" required errors={[]} />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="Confirm Password"
          required
          errors={[]}
        />
        <FormBtn loading={false} text="Create account" />
      </form>
      <div className="w-full h-px bg-neutral-500" />
      <div>
        <Link
          href="/sms"
          className="primary-btn h-10 flex items-center justify-center gap-1"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="size-6" />
          </span>
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
