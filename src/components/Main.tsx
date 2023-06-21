"use client";

import { UserDoc } from "@/models/User";
import { useSession } from "next-auth/react";

const Main = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="px-20 py-10">
      <h1>Hi {user?.firstName}! Let&apos;s get ready to educate.</h1>
    </div>
  );
};

export default Main;
