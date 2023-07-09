"use client";

import { useEffect, useState } from "react";
import { ClassDoc } from "@/models/Class";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import ClassForm from "./ClassForm";
import SidebarLink from "./SidebarLink";
import Spinner from "./Spinner";

function Sidebar() {
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
      className="sticky top-[48px] flex h-[calc(100vh-48px)]
      w-64 flex-col bg-slate-100 px-4 py-4 text-sm shadow-md">
      <ul>
        <Link
          href="/dashboard/today"
          passHref
          onClick={() => {
            setActive("today");
          }}
          className={`sidebar-item ${active === "today" ? "active" : ""}`}>
          <li>Today</li>
        </Link>
        <Link
          href="/dashboard/this-week"
          passHref
          onClick={() => {
            setActive("this-week");
          }}
          className={`sidebar-item ${active === "this-week" ? "active" : ""}`}>
          <li>This Week</li>
        </Link>
        <Link
          href="/dashboard/past"
          passHref
          onClick={() => {
            setActive("past");
          }}
          className={`sidebar-item ${active === "past" ? "active" : ""}`}>
          <li>Last Week</li>
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
