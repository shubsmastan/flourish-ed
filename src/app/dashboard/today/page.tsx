"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Today = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [quote, setQuote] = useState(-1);
  const quotes = [
    "You are an educational rockstar.",
    "You don't just teach - you inspire.",
    "Creativity is intelligence having fun.",
    "Education is a tool to change the future.",
    "Change the world, one child at a time.",
    "The best teachers are the best learners.",
  ];

  useEffect(() => {
    setQuote(Math.floor(Math.random() * quotes.length));
  }, []);

  if (status === "loading") {
    return <></>;
  }

  return (
    <>
      <div className="mb-5 border-b-slate-500 border-b-[0.5px]">
        <h1 className="text-sm">Hi {user?.firstName}!</h1>
        <p className="text-lg font-semibold mb-2">{quotes[quote]}</p>
      </div>

      <div>
        <h1 className="text-2xl font-bold">Today&apos;s Lessons</h1>
      </div>
      {/* <Toast
        open={toastOpen}
        message={toastMsg}
        handleClose={handleToastClose}
      /> */}
    </>
  );
};

export default Today;
