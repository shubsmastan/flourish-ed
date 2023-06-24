"use client";

import { useEffect, useRef, useState } from "react";
import { ClassDoc } from "@/models/Class";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import axios from "axios";

function Sidebar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const id = user?._id;
  const token = user?.accessToken;
  const [classes, setClasses] = useState<ClassDoc[]>([]);
  const [open, setOpen] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [editing, setEditing] = useState(false);
  const [newClassName, setNewClassName] = useState("");

  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

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
      } catch (err: any) {
        if (err.response) {
          setOpen(false);
          setToastMsg(err.response.data.errors[0]);
          setToastOpen(true);
          return;
        }
        console.log(err);
        setOpen(false);
        setToastMsg("Error fetching classes.");
        setToastOpen(true);
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
      setToastMsg("New class added successfully.");
      setToastOpen(true);
    } catch (err: any) {
      if (err.response) {
        setOpen(false);
        setToastMsg(err.response.data.errors[0]);
        setToastOpen(true);
        return;
      }
      console.log(err);
      setOpen(false);
      setToastMsg("Something went wrong. Please try again.");
      setToastOpen(true);
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
      setToastOpen(true);
      setToastMsg("Class deleted.");
    } catch (err: any) {
      if (err.response) {
        setToastMsg(err.response.data.errors[0]);
        setToastOpen(true);
        setOpen(false);
        return;
      }
      console.log(err);
      setOpen(false);
      setToastMsg("Something went wrong. Please try again.");
      setToastOpen(true);
    }
  };

  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (newClassName === "") return;
    e.preventDefault();
    addClass(newClassName);
    setNewClassName("");
    setEditing(false);
    formRef.current.style.display = "none";
  };

  const handleOpenForm = () => {
    setEditing(true);
    formRef.current.style.display = "flex";
    inputRef.current.focus();
  };

  return (
    <aside className="flex flex-col px-6 py-10 bg-amber-50 shadow-md w-80">
      <ul>
        <a href="#">
          <li className="mb-2 px-3 py-1 rounded-lg hover:underline bg-amber-300">
            Today
          </li>
        </a>
        <li className="mb-2 px-3 py-1 rounded-lg  hover:underline">
          <a href="#">This Week</a>
        </li>
        <li className="mb-2 px-3 py-1 rounded-lg hover:underline">
          <a href="#">Oustanding</a>
        </li>
      </ul>
      <h1 className="font-bold text-lg my-4">My Classes</h1>
      <ul>
        {classes.map((c) => (
          <li
            key={c._id}
            className="flex justify-between mb-2 px-3 py-1 rounded-lg">
            <a href="#" className="hover:underline" onClick={() => {}}>
              {c.name}
            </a>
            <button
              className="text-rose-800 hover:text-red-500"
              onClick={() => deleteClass(c._id)}>
              &times;
            </button>
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
          className="px-2 py-1 border-solid border-[1px] rounded-md border-black"
        />
        <button className="btn-primary">Add</button>
      </form>
      <button
        className="btn-primary mx-auto mt-auto w-30"
        onClick={handleOpenForm}>
        + New Class
      </button>
      <Loading open={open} />
      <Toast
        open={toastOpen}
        message={toastMsg}
        handleClose={handleToastClose}
      />
    </aside>
  );
}

export default Sidebar;
