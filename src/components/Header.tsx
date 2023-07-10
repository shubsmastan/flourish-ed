"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import Loading from "./Loading";
import Image from "next/image";
import logo from "public/flourish.svg";
import { ysabeau } from "@/libs/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import UserMenu from "@/components/UserMenu";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const logOut = () => {
    setLoading(true);
    signOut({ redirect: true, callbackUrl: "/auth/sign-in" });
  };

  useEffect(() => {
    const callback = (e: MouseEvent) => {
      if (
        userRef.current &&
        !userRef.current.contains(e.target as HTMLElement)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", callback);
    return () => {
      document.removeEventListener("mousedown", callback);
    };
  });

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between gap-4 bg-sky-800
      px-5 py-2 text-slate-50 shadow-md">
      <div className="align-center flex gap-3">
        <a href="#" className="flex items-center gap-2">
          <Image src={logo} alt="" style={{ width: "25px" }} />
          <h1 className={`text-lg font-semibold ${ysabeau.className}`}>
            Flourish Education
          </h1>
        </a>
      </div>
      <button
        onClick={() => {
          setIsMenuOpen((prevState) => !prevState);
        }}>
        <FontAwesomeIcon icon={faCircleUser} size="xl" />
      </button>
      <div
        ref={userRef}
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } absolute right-5 top-10 w-64 flex-col rounded-md bg-white px-5 py-3
        text-slate-900 drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)]`}>
        <UserMenu logOut={logOut} open={isMenuOpen} />
      </div>
      <Loading open={loading} />
    </header>
  );
};

export default Header;
