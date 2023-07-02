"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Loading from "./Loading";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setOpen(true);
      const res = await signIn("credentials", {
        email: email,
        password: pwd,
        redirect: false,
        callbackUrl: "/dashboard",
      });
      if (res?.error) {
        setIsLoading(false);
        setOpen(false);
        setError("Invalid username and password combination.");
        return;
      }
      setIsLoading(false);
      setOpen(false);
      push("/dashboard");
    } catch (err) {
      setIsLoading(false);
      setOpen(false);
      console.log(err);
    }
  };

  return (
    <>
      <p>Please log in to continue.</p>
      <form className="flex flex-col gap-4" onSubmit={logIn}>
        <input
          className="mx-auto block rounded-md border-[1px] border-solid border-black px-2 py-1"
          type="text"
          placeholder="Email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mx-auto block rounded-md border-[1px] border-solid border-black px-2 py-1"
          type="password"
          placeholder="Password"
          required={true}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button
          className={`btn-primary ${
            isLoading && "bg-slate-400 hover:bg-slate-400"
          }`}
          disabled={isLoading}>
          Log In
        </button>
      </form>
      {error && <p className="mb-1 text-rose-800">{error}</p>}
      <Loading open={open} />
    </>
  );
};

export default AuthForm;
