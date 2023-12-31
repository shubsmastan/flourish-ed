"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { ClassDoc } from "@/models/Class";
import { toast } from "react-toastify";
import ClassForm from "@/components/ClassForm";
import SidebarLink from "@/components/SidebarLink";
import Spinner from "@/components/Spinner";

function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?._id;
  const token = user?.accessToken;

  const [classes, setClasses] = useState<ClassDoc[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isClassFormOpen, setIsClassFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [active, setActive] = useState("today");
  const [activeEditing, setActiveEditing] = useState<ClassDoc | null>(null);

  const notify = (type: "success" | "info" | "error", msg: string) => {
    if (type === "info") toast.info(msg);
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

  useEffect(() => {
    if (window.location.href.includes("classes")) {
      setActive(window.location.href.split("classes/")[1]);
    } else {
      setActive(window.location.href.split("dashboard/")[1]);
    }
  }, []);

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
  }, [userId, token, isClassFormOpen]);

  const handleFormClose = () => {
    setIsClassFormOpen(false);
  };

  return (
    <aside
      className={`${
        open ? "translate-x-0" : "-translate-x-64"
      } fixed top-[48px] z-10 flex h-[calc(100vh-48px)]
      w-64 flex-col bg-slate-100 p-4 text-sm shadow-md transition-transform
      duration-200 sm:sticky sm:translate-x-0`}>
      <ul>
        <Link
          href="/dashboard/today"
          passHref
          onClick={() => {
            setActive("today");
            setOpen(false);
          }}
          className={`sidebar-item ${active === "today" ? "active" : ""}`}>
          <li>Today</li>
        </Link>
        <Link
          href="/dashboard/this-week"
          passHref
          onClick={() => {
            setActive("this-week");
            setOpen(false);
          }}
          className={`sidebar-item ${active === "this-week" ? "active" : ""}`}>
          <li>This Week</li>
        </Link>
        <Link
          href="/dashboard/past"
          passHref
          onClick={() => {
            setActive("past");
            setOpen(false);
          }}
          className={`sidebar-item ${active === "past" ? "active" : ""}`}>
          <li>Last Week</li>
        </Link>
        <Link
          href="/dashboard/assessment"
          passHref
          onClick={() => {
            setActive("assessment");
            setOpen(false);
          }}
          className={`sidebar-item ${active === "assessment" ? "active" : ""}`}>
          <li>Assessment</li>
        </Link>
      </ul>
      <h1 className="my-2 px-1 text-lg font-bold">My Classes</h1>
      {isFetching && (
        <div className="w-10">
          <Spinner />
        </div>
      )}
      {!isFetching && (
        <>
          <ul>
            {classes.map((cls) => (
              <li key={cls._id} className="flex">
                <SidebarLink
                  activeClass={cls}
                  setActive={setActive}
                  active={active}
                  setIsDeleting={setIsDeleting}
                  setIsClassFormOpen={setIsClassFormOpen}
                  setActiveEditing={setActiveEditing}
                  setSidebarOpen={setOpen}
                />
              </li>
            ))}
          </ul>
          <button
            className="btn-primary w-30 mx-auto mt-auto"
            onClick={() => {
              setIsDeleting(false);
              setActiveEditing(null);
              setIsClassFormOpen(true);
            }}>
            <span className="text-md mr-2 font-bold">+</span>New Class
          </button>
        </>
      )}
      <ClassForm
        currentClass={activeEditing?.name ? activeEditing?.name : undefined}
        classId={activeEditing?._id ? activeEditing?._id : undefined}
        open={isClassFormOpen}
        handleClose={handleFormClose}
        deleting={isDeleting}
      />
    </aside>
  );
}

export default Sidebar;
