"use client";

import { useRef, useState } from "react";
import { ClassDoc } from "@/models/Class";

interface SidebarProps {
  classes: ClassDoc[];
  // selectedClass: string;
  addClass: (name: string) => void;
  deleteClass: (id: string) => void;
  // handleClassClick: () => void;
}

function Sidebar({ classes, addClass, deleteClass }: SidebarProps) {
  const [editing, setEditing] = useState(false);
  const [newClassName, setNewClassName] = useState("");

  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

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
    </aside>
  );
}

export default Sidebar;
