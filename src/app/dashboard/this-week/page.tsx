"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ThisWeek = () => {
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
  }, [quotes.length]);

  if (status === "loading") {
    return <></>;
  }

  return (
    <div className="flex-1 px-7 py-5 text-slate-900">
      <div className="mb-5 border-b-[0.5px] border-b-slate-500">
        <h1 className="text-sm">Hi {user?.firstName}!</h1>
        <p className="mb-2 text-lg font-semibold">{quotes[quote]}</p>
      </div>

      <div>
        <h1 className="text-2xl font-bold">This Week&apos;s Lessons</h1>
      </div>
      {/* <Toast
        open={toastOpen}
        message={toastMsg}
        handleClose={handleToastClose}
      /> */}
    </div>
  );
};

export default ThisWeek;
