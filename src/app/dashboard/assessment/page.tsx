"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ClassDoc } from "@/models/Class";
import { StudentDoc } from "@/models/Student";
import { toast } from "react-toastify";
import Link from "next/link";
import Spinner from "@/components/Spinner";

const Assessment = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?._id;
  const token = user?.accessToken;

  const [classes, setClasses] = useState<ClassDoc[] | undefined>();
  const [students, setStudents] = useState<StudentDoc[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const notify = (type: "success" | "info" | "error", msg: string) => {
    if (type === "info") toast.info(msg);
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

  useEffect(() => {
    const getClasses = async () => {
      try {
        if (!userId) return;
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes`,
          { headers: { Authorization: token } }
        );
        data.sort((a: any, b: any) => {
          const nameA = a.name;
          const nameB = b.name;
          if (nameA < nameB) return -1;
          if (nameB < nameA) return 1;
          return 0;
        });
        setClasses(data);
        setIsFetching(false);
      } catch (err: any) {
        if (err.response.data.error) {
          notify("error", err.response.data.error);
          setIsFetching(false);
          return;
        }
        console.log(err);
        notify("error", "Error fetching classes.");
        setIsFetching(false);
      }
    };
    getClasses();
  }, [userId, token]);

  const handleClose = () => {
    setIsFormOpen((state) => !state);
  };

  const handleSave = (name: string) => {};

  if (isFetching) {
    return (
      <main className="px-7 py-5 text-slate-900">
        <Spinner />
      </main>
    );
  }

  if (!classes) {
    return (
      <main className="flex-1 px-7 py-5 text-slate-900">
        <p>There was a problem getting your classes.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 px-7 py-5 text-slate-900">
      <div className="mb-5 flex flex-col justify-between gap-5 border-b-[0.5px] border-b-slate-500 pb-3 md:flex-row">
        <h1 className="text-2xl font-bold md:mx-5">Assessments</h1>
      </div>
      <div className="md:mx-5">
        <p className="mb-5">
          Hi {user?.firstName}. Below is a list of your classes.
        </p>
        <p className="mb-5">
          To get started, choose a class, add your students and add some
          assessment data.
        </p>
        <p className="mb-5">
          You will then be able to generate graphs to see your students&apos;
          progress!
        </p>
        <div className="grid grid-cols-1 gap-16 py-8 md:grid-cols-2 md:px-5 lg:grid-cols-3 2xl:grid-cols-4">
          {classes.map((cls) => (
            <Link
              href={`/dashboard/assessment/${cls._id}`}
              key={cls._id}
              className="rounded-md bg-white p-3 text-center text-lg font-semibold drop-shadow-lg">
              {cls.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Assessment;
