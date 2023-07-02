import AuthForm from "@/components/SignUpForm";
import Link from "next/link";
import Image from "next/image";
import logo from "public/flourish.svg";
import { ysabeau } from "@/libs/fonts";

const Auth = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="flex gap-2 rounded-lg bg-sky-800 px-4 pb-2 pt-1 text-slate-50">
        <Image src={logo} alt="" style={{ width: "25px" }} />
        <h1 className={`text-lg font-semibold ${ysabeau.className}`}>
          Flourish Education
        </h1>
      </div>
      <AuthForm />
      <p>
        Click{" "}
        <Link href="/auth/sign-in" className="text-rose-800 hover:underline">
          here
        </Link>{" "}
        to log in.
      </p>
    </div>
  );
};

export default Auth;
