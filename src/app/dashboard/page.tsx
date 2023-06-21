"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import Loading from "@/components/Loading";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const id = user?._id;
  const token = user?.accessToken;

  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getClasses = async () => {
      try {
        if (!id) return;
        setOpen(true);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${id}`,
          { headers: { Authorization: token } }
        );
        setClasses(data);
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, [id, token, classes.length]);

  const addClass = async (name: string) => {
    try {
      setOpen(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${id}`,
        { name },
        {
          headers: { Authorization: token },
        }
      );
      setClasses(data);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteClass = async (classId: string) => {
    try {
      setOpen(true);
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${id}`,
        { params: { class: classId }, headers: { Authorization: token } }
      );
      setClasses(data);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col gap-3 items-center my-auto bg-slate-50 text-slate-900 text-lg">
        <p>You must be signed in to view this page.</p>
        <p>
          <Link href="/auth/sign-in" className="text-rose-800 hover:underline">
            Sign in
          </Link>
          .
        </p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-3 items-center my-auto bg-slate-50 text-slate-900 text-lg">
        <div>
          <FontAwesomeIcon icon={faSpinner} size="xl" color="#0f172a" spin />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar
          classes={classes}
          addClass={addClass}
          deleteClass={deleteClass}
        />
        <Main />
      </div>
      <Loading open={open} />
    </>
  );
};

export default Dashboard;
