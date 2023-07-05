"use client";

import { useEffect, useRef, useState } from "react";
import { ClassDoc } from "@/models/Class";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import axios from "axios";
import Link from "next/link";
import ClassForm from "./ClassForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import SidebarLink from "./SidebarLink";

function Sidebar() {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?._id;
  const token = user?.accessToken;

  const [classes, setClasses] = useState<ClassDoc[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isClassFormOpen, setIsClassFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [active, setActive] = useState("today");
  const [activeEditing, setActiveEditing] = useState<ClassDoc | null>(null);

  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const menuRef = useRef() as React.MutableRefObject<HTMLDivElement>;

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
        setIsModalOpen(true);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes`,
          { headers: { Authorization: token } }
        );
        setClasses(data);
        setIsModalOpen(false);
      } catch (err: any) {
        if (err.response) {
          setIsModalOpen(false);
          setToastMsg(err.response.data.error);
          setIsToastOpen(true);
          return;
        }
        console.log(err);
        setIsModalOpen(false);
        setToastMsg("Error fetching classes.");
        setIsToastOpen(true);
      }
    };
    getClasses();
  }, [userId, token, isClassFormOpen]);

  const addClass = async (name: string) => {
    try {
      setIsModalOpen(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes`,
        { name },
        {
          headers: { Authorization: token },
        }
      );
      setClasses(data);
      setIsModalOpen(false);
      setToastMsg("New class added successfully.");
      setIsToastOpen(true);
    } catch (err: any) {
      if (err.response) {
        setIsModalOpen(false);
        setToastMsg(err.response.data.error);
        setIsToastOpen(true);
        return;
      }
      console.log(err);
      setIsModalOpen(false);
      setToastMsg("Something went wrong. Please try again.");
      setIsToastOpen(true);
    }
  };

  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsToastOpen(false);
  };

  const handleFormClose = () => {
    setIsClassFormOpen(false);
    setActiveEditing(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (newClassName === "") return;
    e.preventDefault();
    addClass(newClassName);
    setNewClassName("");
    setIsEditing(false);
    formRef.current.style.display = "none";
  };

  return (
    <aside className="sticky top-[48px] flex h-[calc(100vh-48px)] w-64 flex-col bg-slate-100 px-4 py-4 text-sm shadow-md">
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
          className={`sidebar-item ${
            active === "outstanding" ? "active" : ""
          }`}>
          <li>Last Week</li>
        </Link>
      </ul>
      <h1 className="my-2 px-1 text-lg font-bold">My Classes</h1>
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
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="gap-3"
        style={{ display: "none" }}>
        <input
          ref={inputRef}
          id=""
          type="text"
          value={newClassName}
          onChange={(e) => {
            setNewClassName(e.target.value);
          }}
          className="rounded-md border-[1px] border-solid border-black px-2 py-1"
        />
        <button className="btn-primary">Add</button>
      </form>
      <button
        className="btn-primary w-30 mx-auto mt-auto"
        onClick={() => {
          setIsDeleting(false);
          setActiveEditing(null);
          setIsClassFormOpen(true);
        }}>
        <span className="text-md mr-2 font-bold">+</span>New Class
      </button>
      <Loading open={isModalOpen} />
      <Toast
        open={isToastOpen}
        message={toastMsg}
        handleClose={handleToastClose}
      />
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
