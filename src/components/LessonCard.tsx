"use client";

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { LessonDoc } from "@/models/Lesson";

interface LessonProps {
  lesson: LessonDoc;
  index: number;
  displayIndex: number;
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
    <div
      className={`flex flex-col gap-2 rounded-md bg-white p-4 text-sm drop-shadow-lg`}>
      <div className="flex justify-between">
        <Link
          className="flex items-center gap-2 text-sm text-slate-500"
          href={`/dashboard/classes/${lesson.classId}/lessons/${lesson._id}`}
          passHref>
          <FontAwesomeIcon
            style={{ paddingBottom: "2px" }}
            icon={faCalendarDays}
          />
          <p>{new Date(lesson.date).toDateString()}</p>
        </Link>
        <button
          className="rounded-md px-1 hover:bg-slate-300"
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
      <div
        ref={menuRef}
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute right-0 top-10 z-50 w-48 rounded-2xl bg-white p-3 text-left
            text-sm drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)]`}>
        <Dropdown
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
