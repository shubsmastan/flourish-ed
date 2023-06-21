"use client";

import axios from "axios";
import Loading from "./Loading";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  const signUp = async () => {
    if (pwd !== confirmPwd) {
      setError("Passwords need to match.");
      return;
    }
    if (pwd.length < 8) {
      setError("Passwords must be at least 8 characters.");
      return;
    }
    setIsLoading(true);
    setOpen(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sign-up`,
        {
          firstName,
          lastName,
          email,
          password: pwd,
        }
      );
      setIsLoading(false);
      setOpen(false);
      if (data.errors) {
        setError(data.errors[0]);
        return;
      }
      push("/auth/sign-in");
    } catch (err) {
      setIsLoading(false);
      setOpen(false);
      console.log(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <p>Please fill in all fields to create an account.</p>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          signUp();
        }}>
        <input
          className="block mx-auto px-2 py-1 border-solid border-[1px] rounded-md border-black"
          type="text"
          placeholder="First Name"
          required={true}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="block mx-auto px-2 py-1 border-solid border-[1px] rounded-md border-black"
          type="text"
          placeholder="Surname"
          required={true}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="block mx-auto px-2 py-1 border-solid border-[1px] rounded-md border-black"
          type="email"
          placeholder="Email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="block mx-auto px-2 py-1 border-solid border-[1px] rounded-md border-black"
          type="password"
          placeholder="Password"
          required={true}
          onChange={(e) => setPwd(e.target.value)}
        />
        <input
          className="block mx-auto px-2 py-1 border-solid border-[1px] rounded-md border-black"
          type="password"
          placeholder="Confirm Password"
          required={true}
          onChange={(e) => setConfirmPwd(e.target.value)}
        />
        <button
          className={`btn-primary ${
            isLoading && "bg-slate-400 hover:bg-slate-400"
          }`}
          disabled={isLoading}>
          Sign Up
        </button>
      </form>
      {error && <p className="mb-1 text-rose-800">{error}</p>}
      <Loading open={open} />
    </>
  );
};

export default AuthForm;
