"use client";

import { useState, useEffect, useRef, MutableRefObject } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LessonDoc } from "@/models/Lesson";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faChevronLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import LessonForm from "@/components/LessonForm";
import Spinner from "@/components/Spinner";
import Dropdown from "@/components/Dropdown";
import Link from "next/link";

const LessonPage = ({ params }: { params: { cid: string; lid: string } }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?._id;
  const token = user?.accessToken;
  const { cid: classId, lid: lessonId } = params;

  const router = useRouter();

  const menuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const notify = (type: "success" | "info" | "error", msg: string) => {
    if (type === "info") toast.info(msg);
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

  const [lesson, setLesson] = useState<LessonDoc | null>(null);
  const [className, setClassName] = useState("");
  const [index, setIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        if (!userId) return;
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}/lessons/${lessonId}`,
          { headers: { Authorization: token } }
        );
        const { data: cls } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}`,
          { headers: { Authorization: token } }
        );
        setClassName(cls.name);
        cls.lessons.sort((a: any, b: any) => {
          const dateA = a.date;
          const dateB = b.date;
          if (dateA < dateB) return -1;
          if (dateB < dateA) return 1;
          return 0;
        });
        const lessonIndices = cls.lessons.map(
          (lesson: LessonDoc) => lesson._id
        );
        setIndex(lessonIndices.indexOf(lessonId) + 1);
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
        notify("error", "Error fetching lesson information.");
        setError("Our server is scratching its head. Please try again.");
        setIsFetching(false);
      }
    };
    getData();
  }, [userId, token, classId, lessonId, isFormOpen]);

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
      <main className="px-7 py-5 text-slate-900">
        <Spinner />
      </main>
    );
  }

  if (!lesson) {
    return (
      <main className="flex-1 px-7 py-5 text-slate-900">
        <h1>{error}</h1>
      </main>
    );
  }

  if (deleted) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-7 py-5 text-slate-900">
        <p className="mb-4">You deleted this lesson.</p>
        <FontAwesomeIcon icon={faTrash} size="2xl" className="mb-4" />
        <Link className="btn-primary" href={`/dashboard/classes/${classId}`}>
          Back to class
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 px-7 py-5 text-slate-900">
      <div className="flex flex-col justify-between gap-5 border-b-[0.5px] border-b-slate-500 pb-3 md:flex-row">
        <h1 className="ml-5 text-2xl font-bold">{className}</h1>
        <div className="relative flex flex-col md:mr-10 md:items-end lg:flex-row">
          <Link
            href={`/dashboard/classes/${classId}`}
            className="btn-primary mb-3 flex max-h-10 items-center justify-center md:w-[140px] lg:mb-0">
            <FontAwesomeIcon
              className="mr-2"
              icon={faChevronLeft}
              color="#0f172a"
            />
            <p>Back to Class</p>
          </Link>
          <button
            className="rounded-md py-1 hover:bg-slate-300 md:w-12"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}>
            <FontAwesomeIcon icon={faEllipsis} size="xl" />
          </button>
          <div
            ref={menuRef}
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute right-0 top-20 z-50 w-full rounded-2xl bg-white p-3 text-left text-sm
            drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] md:w-48 lg:top-10`}>
            <Dropdown
              type="lesson"
              handleEditClick={() => {
                setIsDeleting(false);
                setIsFormOpen(true);
              }}
              handleDeleteClick={() => {
                setIsDeleting(true);
                setIsFormOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      <div className="px-5 py-8 text-lg">
        <div className="text-md mb-3 flex items-center gap-2 text-slate-500">
          <FontAwesomeIcon
            style={{ paddingBottom: "2px" }}
            icon={faCalendarDays}
          />
          <p>{new Date(lesson.date).toDateString()}</p>
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <p className="font-semibold">Objective:</p>
          <p className="whitespace-pre-line">{lesson.objective}</p>
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <p className="font-semibold">Content:</p>
          <p className="whitespace-pre-line">{lesson.content}</p>
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <div>
            <p className="mb-1 font-semibold">Resources:</p>
            <p className="whitespace-pre-line">
              {lesson.resources ? lesson.resources : "(none)"}
            </p>
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <p className="font-semibold">Differentiation:</p>
          <p className="whitespace-pre-line">
            {lesson.differentiation ? lesson.differentiation : "(none)"}
          </p>
        </div>
      </div>
      <LessonForm
        lesson={
          lesson
            ? {
                date: lesson.date.toString(),
                objective: lesson.objective,
                content: lesson.content,
                resources: lesson.resources ? lesson.resources : "",
                differentiation: lesson.differentiation
                  ? lesson.differentiation
                  : "",
              }
            : null
        }
        classId={classId}
        lessonId={lessonId}
        open={isFormOpen}
        handleClose={handleClose}
        deleting={isDeleting}
        setEditingIndex={setIndex}
        setDeleted={setDeleted}
      />
    </main>
  );
};

export default LessonPage;
