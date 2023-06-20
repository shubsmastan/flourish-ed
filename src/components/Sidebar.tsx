"use client";

import { useRef, useState } from "react";

// type SidebarProps = {
//   classes: ClassProps[];
//   selectedClass: number;
//   handleAddClass: HandleFunction;
//   handleClassClick: HandleFunction;
//   handleDeleteClass: HandleFunction;
// };

function Sidebar({ selectedClass }: { selectedClass: string }) {
  const [editing, setEditing] = useState<boolean>(false);
  const [newClassName, setNewClassName] = useState<string>("");
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewClassName(e.target.value);
  };

  const handleFormSubmit = (e: React.SyntheticEvent): void => {
    if (newClassName === "") return;
    e.preventDefault();
    // handleAddClass(newClassName);
    setNewClassName("");
    setEditing(false);
    formRef.current.style.display = "none";
  };

  const handleOpenForm = (): void => {
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
        <a href="#">
          <li className="mb-2 px-3 py-1 rounded-lg hover:underline">
            Year 3 Computing
          </li>
        </a>
        <li className="mb-2 px-3 py-1 rounded-lg hover:underline">
          <a href="#">Year 4 Maths</a>
        </li>
        <li className="mb-2 px-3 py-1 rounded-lg hover:underline">
          <a href="#">Year 6 Philosophy</a>
        </li>
        {/* {classes.map((c, index) => (
          <li key={c.name}>
            <a
              href="#"
              className={
                selectedClass !== -1 && c.name === classes[selectedClass].name
                  ? "active"
                  : ""
              }
              onClick={() => handleClassClick(index)}>
              {c.name}
            </a>
            <button
              className="delete-class-button"
              onClick={() => handleDeleteClass(c.id)}>
              &times;
            </button>
          </li>
        ))} */}
      </ul>
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="gap-3"
        style={{ display: "none" }}>
        <input
          ref={inputRef}
          id=""
          type="text"
          value={newClassName}
          onChange={handleInputChange}
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
