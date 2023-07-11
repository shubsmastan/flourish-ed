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
import {
  faCalendarDays,
  faEllipsis,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { StudentDoc } from "@/models/Student";

interface StudentProps {
  student: StudentDoc;
  index: number;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  setIsLessonFormOpen: Dispatch<SetStateAction<boolean>>;
  setEditingIndex: Dispatch<SetStateAction<number>>;
}

const StudentCard = ({
  student,
  index,
  setIsDeleting,
  setIsLessonFormOpen,
  setEditingIndex,
}: StudentProps) => {
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
      className={`flex h-52 flex-col gap-2 rounded-md bg-white p-4 text-sm drop-shadow-lg`}>
      <div className="flex justify-between">
        <Link
          className="text-lg font-semibold"
          href={`/dashboard/assessment/${student.classId}/students/${student._id}`}
          passHref>
          <p>{student.name}</p>
        </Link>
        <button
          className="rounded-md px-1 hover:bg-slate-300"
          onClick={() => {
            setIsMenuOpen(true);
            console.log(index);
          }}>
          <FontAwesomeIcon
            className="pointer-events-none"
            icon={faEllipsis}
            size="xl"
          />
        </button>
      </div>
      <div className="">
        {student.assessments.length === 0 && (
          <p className="my-5">No assessment data.</p>
        )}
        {student.assessments.length !== 0 && (
          <p className="mb-5">Last 3 assessments:</p>
        )}
        {student.assessments
          .filter((_, idx) => {
            return idx < 3;
          })
          .map((ass, idx) => (
            <div key={idx} className="grid grid-cols-[130px,_50px] gap-5">
              <div className="text-md mb-3 flex items-center gap-2 text-slate-500">
                <FontAwesomeIcon
                  style={{ paddingBottom: "2px" }}
                  icon={faCalendarDays}
                />
                <p>{new Date(ass.date).toDateString()}</p>
              </div>
              <div className="text-md mb-3 flex items-center gap-2">
                <FontAwesomeIcon
                  style={{ paddingBottom: "2px" }}
                  icon={faPenToSquare}
                />
                <p>{ass.result}%</p>
              </div>
            </div>
          ))}
      </div>
      <div
        ref={menuRef}
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute right-0 top-10 z-50 w-48 rounded-2xl bg-white p-3 text-left
            text-sm drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)]`}>
        <Dropdown
          type="student"
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

export default StudentCard;
