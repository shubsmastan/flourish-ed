import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import Image from "next/image";
import logo from "public/flourish.svg";

import { Crimson_Text } from "next/font/google";

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const Auth = () => {
  // const createUser = async (): Promise<void> => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, pwd);
  //   } catch (err: any) {
  //     alert(err.message);
  //   }
  // };

  const logIn = async (): Promise<void> => {
    // try {
    //   await signInWithEmailAndPassword(auth, email, pwd);
    // } catch (err: any) {
    //   alert(err.message);
    // }
  };

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
      <AuthForm isSigningUp={true} />
      <p>
        Click{" "}
        <Link href="/sign-in" className="text-rose-800 hover:underline">
          here
        </Link>{" "}
        to log in.
      </p>
    </div>
  );
};

export default Auth;
