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
import axios from "axios";
import { useSession } from "next-auth/react";
import Spinner from "./Spinner";
import LessonForm from "./LessonForm";
import { ClassDoc } from "@/models/Class";

interface LessonProps {
  lessonId: string;
  classId: string;
  index: number;
}

const LessonCard = ({ lessonId, classId, index }: LessonProps) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const userId = user?._id;
  const token = user?.accessToken;

  const [lesson, setLesson] = useState<LessonDoc | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const menuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const getLesson = async () => {
      try {
        if (!userId) return;
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}/lessons/${lessonId}`,
          { headers: { Authorization: token } }
        );
        data.date = data.date.split("T")[0];
        setLesson(data);
        setIsFetching(false);
      } catch (err: any) {
        if (err.response.data.error) {
          setError(err.response.data.error);
          setIsFetching(false);
          return;
        }
        console.log(err);
        setError("Our server is scratching its head. Please try again.");
        setIsFetching(false);
      }
    };
    getLesson();
  }, [token, userId, lessonId, lesson?.classId, isFormOpen]);

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

  const handleClose = () => {
    setIsFormOpen(false);
  };

  if (isFetching) {
    return (
      <div className="-z-10 flex flex-col gap-2 rounded-md bg-white p-4 text-sm drop-shadow-lg">
        <div className="px-7 py-5 text-slate-900">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="-z-10 flex flex-col gap-2 rounded-md bg-white p-4 text-sm drop-shadow-lg">
        <div className="flex-1 px-7 py-5 text-slate-900">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 rounded-md bg-white p-4 text-sm drop-shadow-lg">
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
              setIsMenuOpen(false);
              setIsDeleting(false);
              setIsFormOpen(true);
            }}
            handleDeleteClick={() => {
              setIsMenuOpen(false);
              setIsDeleting(true);
              setIsFormOpen(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LessonCard;
