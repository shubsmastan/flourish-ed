"use client";

import Image from "next/image";
import logo from "public/flourish.svg";

import { Crimson_Text } from "next/font/google";

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

// type HeaderPropTypes = { handleLogout: () => void };

const Header = () => {
  return (
    <header className="flex justify-start items-center gap-4 p-2 bg-sky-800 text-slate-50 shadow-md">
      <a href="#" className="flex item-center gap-2">
        <Image
          src={logo}
          alt=""
          style={{ width: "28px", marginBottom: "3px" }}
        />
        <h1 className={`text-lg font-semibold ${crimsonText.className}`}>
          Flourish Education
        </h1>
      </a>
      <nav className="flex gap-4">
        <ul></ul>
      </nav>
      <button className="btn-primary ms-auto">Sign Out</button>
    </header>
  );
};

export default Header;
