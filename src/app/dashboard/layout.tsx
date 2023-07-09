"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header />
      <button
        className="btn-primary absolute left-3 top-2 z-50 h-8 w-48
      opacity-0 sm:hidden"
        onClick={() => {
          setIsSidebarOpen((prevState) => !prevState);
        }}>
        I&apos;m a secret button
      </button>
      <div className="flex flex-1">
        <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
        {children}
      </div>
    </>
  );
}
