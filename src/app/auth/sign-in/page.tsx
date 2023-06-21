import AuthForm from "@/components/SignInForm";
import Link from "next/link";
import Image from "next/image";
import logo from "public/flourish.svg";
import { crimsonText } from "@/libs/fonts";

const Auth = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 flex-1">
      <div className="flex gap-2 rounded-lg px-4 py-1 bg-sky-800 text-slate-50">
        <Image
          src={logo}
          alt=""
          style={{ width: "25px", marginBottom: "3px" }}
        />
        <h1 className={`text-lg font-semibold ${crimsonText.className}`}>
          Flourish Education
        </h1>
      </div>
      <AuthForm />
      <p>
        Click{" "}
        <Link href="/auth/sign-up" className="text-rose-800 hover:underline">
          here
        </Link>{" "}
        to create an account.
      </p>
    </div>
  );
};

export default Auth;
