"use client";

// import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/today");
  });
  // const { data: session, status } = useSession();
  // const user = session?.user;
  // const id = user?._id;
  // const token = user?.accessToken;

  // if (status === "unauthenticated") {
  //   return (
  //     <div className="flex flex-col gap-3 items-center my-auto bg-slate-50 text-slate-900 text-lg">
  //       <p>You must be signed in to view this page.</p>
  //       <p>
  //         <Link href="/auth/sign-in" className="text-rose-800 hover:underline">
  //           Sign in
  //         </Link>
  //         .
  //       </p>
  //     </div>
  //   );
  // }

  // if (status === "loading") {
  //   return (
  //     <div className="flex flex-col gap-3 items-center my-auto bg-slate-50 text-slate-900 text-lg">
  //       {/* <div>
  //         <FontAwesomeIcon icon={faSpinner} size="xl" color="#0f172a" spin />
  //       </div> */}
  //     </div>
  //   );
  // }

  return (
    <>
      {/* <div className="px-20 py-10">
        <h1>Hi {user?.firstName}! Let&apos;s get ready to educate.</h1>
      </div> */}
      {/* <Toast
        open={toastOpen}
        message={toastMsg}
        handleClose={handleToastClose}
      /> */}
    </>
  );
};

export default Dashboard;
