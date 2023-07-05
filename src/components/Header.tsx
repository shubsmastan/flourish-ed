"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Loading from "./Loading";
import Image from "next/image";
import logo from "public/flourish.svg";
import { ysabeau } from "@/libs/fonts";

const Header = () => {
  const [open, setOpen] = useState(false);

  const logOut = () => {
    setOpen(true);
    signOut({ redirect: true, callbackUrl: "/auth/sign-in" });
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-start gap-4 bg-sky-800 p-2 text-slate-50 shadow-md">
      <a href="#" className="item-center flex gap-2">
        <Image
          src={logo}
          alt=""
          style={{ width: "28px", marginBottom: "3px" }}
        />
        <h1 className={`text-lg font-semibold ${ysabeau.className}`}>
          Flourish Education
        </h1>
      </a>
      <nav className="flex gap-4">
        <ul></ul>
      </nav>
      <button onClick={logOut} className="btn-primary ms-auto text-sm">
        Sign Out
      </button>
      <Loading open={open} />
    </header>
  );
};

export default Header;
