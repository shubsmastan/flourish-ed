"use client";

import { LessonDoc } from "@/models/Lesson";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Dropdown from "./Dropdown";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface LessonProps {
  lesson: LessonDoc;
  index: number;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  setIsLessonFormOpen: Dispatch<SetStateAction<boolean>>;
  setEditingIndex: Dispatch<SetStateAction<number>>;
}

const LessonCard = ({
  lesson,
  index,
  setIsDeleting,
  setIsLessonFormOpen,
  setEditingIndex,
}: LessonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const callback = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as HTMLElement)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", callback);
    return () => {
      document.removeEventListener("mousedown", callback);
    };
  });

  return (
    <div className="-z-10 flex flex-col gap-2 rounded-md bg-white p-4 text-sm drop-shadow-lg">
      <div className="flex justify-between">
        <Link
          href={`/dashboard/classes/${lesson.classId}/lessons/${lesson._id}`}
          passHref>
          <h1 className="text-xl font-semibold">Lesson {index + 1}</h1>
        </Link>
        <button
          className="mr-5"
          onClick={() => {
            setIsMenuOpen(true);
          }}>
          <FontAwesomeIcon
            className="pointer-events-none"
            icon={faEllipsis}
            size="xl"
          />
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <FontAwesomeIcon style={{ paddingBottom: "2px" }} icon={faCalendar} />
        <p>{new Date(lesson.date).toDateString()}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Objective:</p>
        <p className="truncate">{lesson.objective}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Content:</p>
        <p className="truncate">{lesson.content}</p>
      </div>
      <div>
        <p className="mb-1 font-semibold">Resources:</p>
        <p className="truncate">{lesson.resources || "(none)"}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Differentiation:</p>
        <p className="truncate">{lesson.differentiation || "(none)"}</p>
      </div>
      <div ref={menuRef} className={isMenuOpen ? "block" : "hidden"}>
        <Dropdown
          className="right-6 top-10"
          type="lesson"
          handleEditClick={() => {
            setEditingIndex(index);
            setIsMenuOpen(false);
            setIsDeleting(false);
            setIsLessonFormOpen(true);
          }}
          handleDeleteClick={() => {
            setEditingIndex(index);
            setIsMenuOpen(false);
            setIsDeleting(true);
            setIsLessonFormOpen(true);
          }}
        />
      </div>
    </div>
  );
};

export default LessonCard;
