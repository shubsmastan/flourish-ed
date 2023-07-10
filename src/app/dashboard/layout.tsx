"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const navButtonRef: RefObject<HTMLButtonElement> = useRef(null);

  useEffect(() => {
    const callback = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        target?.nodeName !== "HEADER" &&
        target !== navButtonRef.current
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", callback);
    return () => {
      document.removeEventListener("mousedown", callback);
    };
  });

  return (
    <>
      <Header />
      <button
        ref={navButtonRef}
        className="fixed left-2 top-[2px] z-50 h-10 w-10 rounded-md bg-sky-800 hover:bg-sky-700 sm:hidden"
        onClick={() => {
          setIsSidebarOpen((prevState) => !prevState);
        }}>
        <FontAwesomeIcon
          icon={faXmark}
          size="2xl"
          color="#ffffff"
          className={`${
            isSidebarOpen ? "opacity-1" : "opacity-0"
          } pointer-events-none absolute right-[8.5px] top-[4px] transition-opacity duration-500`}
        />
        <FontAwesomeIcon
          icon={faBars}
          size="xl"
          color="#ffffff"
          className={`${
            isSidebarOpen ? "opacity-0" : "opacity-1"
          } pointer-events-none absolute right-[9px] top-[7.5px] transition-opacity duration-500`}
        />
      </button>
      <div className="flex flex-1">
        <nav ref={sidebarRef}>
          <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
        </nav>
        {children}
      </div>
    </>
  );
}
