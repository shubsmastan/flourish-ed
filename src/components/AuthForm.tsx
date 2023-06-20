"use client";

import { useState } from "react";

const AuthForm = ({ isSigningUp }: { isSigningUp: boolean }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  if (isSigningUp)
    return (
      <>
        <p>Please fill in all fields to create an account.</p>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            // logIn();
          }}>
          <input
            className="block mx-auto px-2 py-1 border-solid border-[1px] rounded-md border-black"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="block mx-auto px-2 py-1 border-solid border-[1px] rounded-md border-black"
            type="text"
            placeholder="Surname"
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            className="block mx-auto px-2 py-1 border-solid border-[1px] rounded-md border-black"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="block mx-auto px-2 py-1 border-solid border-[1px] rounded-md border-black"
            type="password"
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
          />
          <input
            className="block mx-auto px-2 py-1 border-solid border-[1px] rounded-md border-black"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setPwd(e.target.value)}
          />
          <button className="btn-primary">Register</button>
        </form>
      </>
    );

  return (
    <>
      <p>Please log in to continue.</p>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          // logIn();
        }}>
        <input
          className="block mx-auto px-2 py-1 border-solid border-[1px] rounded-md border-black"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="block mx-auto px-2 py-1 border-solid border-[1px] rounded-md border-black"
          type="password"
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
        />
        <button className="btn-primary">Log In</button>
      </form>
    </>
  );
};

export default AuthForm;
