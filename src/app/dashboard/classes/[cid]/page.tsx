"use client";

import { useState, useEffect, useRef, MutableRefObject } from "react";
import { useSession } from "next-auth/react";
import { ClassDoc } from "@/models/Class";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import LessonCard from "@/components/LessonCard";
import LessonForm from "@/components/LessonForm";
import ClassForm from "@/components/ClassForm";
import Spinner from "@/components/Spinner";
import Dropdown from "@/components/Dropdown";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const ClassPage = ({ params }: { params: { cid: string } }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?._id;
  const token = user?.accessToken;
  const { cid: classId } = params;

  const menuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const [currentClass, setCurrentClass] = useState<ClassDoc | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLessonFormOpen, setIsLessonFormOpen] = useState(false);
  const [isClassFormOpen, setIsClassFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [error, setError] = useState("");

  const notify = (type: "success" | "info" | "error", msg: string) => {
    if (type === "info") toast.info(msg);
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (!userId) return;
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}`,
          { headers: { Authorization: token } }
        );
        data.lessons.sort((a: any, b: any) => {
          const dateA = a.date;
          const dateB = b.date;
          if (dateA < dateB) return -1;
          if (dateB < dateA) return 1;
          return 0;
        });
        setCurrentClass(data);
        setIsFetching(false);
      } catch (err: any) {
        if (err.response.data.error) {
          setError(err.response.data.error);
          setIsFetching(false);
          return;
        }
        console.log(err);
        notify("error", "Error fetching class information.");
        setError("Our server is scratching its head. Please try again.");
        setIsFetching(false);
      }
    };
    getData();
  }, [userId, token, classId, isLessonFormOpen, isClassFormOpen]);

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
    setIsClassFormOpen(false);
    setIsLessonFormOpen(false);
  };

  const filteredLessons = currentClass?.lessons.filter((lesson) => {
    if (filter === "past") {
      return dayjs(lesson.date).isBefore(dayjs(), "day");
    }
    if (filter === "all") {
      return true;
    }
    let value;
    switch (filter) {
      case "this-week":
        value = 7;
        break;
      case "this-month":
        value = 7 * 4;
        break;
      case "this-term":
        value = 7 * 4 * 4;
        break;
      default:
        value = 365;
        break;
    }
    return dayjs(lesson.date).isBetween(
      dayjs(),
      dayjs().add(value, "day"),
      "day"
    );
  });

  if (isFetching) {
    return (
      <div className="px-7 py-5 text-slate-900">
        <Spinner />
      </div>
    );
  }

  if (!currentClass) {
    return (
      <div className="flex-1 px-7 py-5 text-slate-900">
        <p>{error}</p>
      </div>
    );
  }

  if (deleted) {
    return (
      <>
        <div className="flex flex-1 flex-col items-center justify-center px-7 py-5 text-slate-900">
          <p className="mb-4">You deleted this class.</p>
          <FontAwesomeIcon icon={faTrash} size="2xl" />
        </div>
      </>
    );
  }

  return (
    <div className="flex-1 px-7 py-5 text-slate-900">
      <div className="flex flex-col justify-between gap-5 border-b-[0.5px] border-b-slate-500 pb-3 md:flex-row">
        <div className="flex flex-col gap-5 md:ml-5 lg:flex-row ">
          <h1 className="text-2xl font-bold">{currentClass.name}</h1>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className="rounded-md border-2 border-slate-900 px-1 lg:ml-0">
            <option value="all">-- Filter Lessons --</option>
            <option value="this-week">This week</option>
            <option value="this-month">This month</option>
            <option value="this-term">This term</option>
            <option value="past">Past lessons</option>
          </select>
        </div>
        <div className="relative flex flex-col md:mr-10 md:items-end lg:flex-row">
          <button
            className="btn-primary mb-3 max-h-10 lg:mb-0"
            onClick={() => {
              setEditingIndex(-1);
              setIsDeleting(false);
              setIsLessonFormOpen(true);
            }}>
            <FontAwesomeIcon className="mr-2" icon={faPlus} color="#0f172a" />
            New Lesson
          </button>
          <button
            className="rounded-md py-1 hover:bg-slate-300 md:w-12"
            onClick={() => {
              setIsMenuOpen(true);
            }}>
            <FontAwesomeIcon
              className="pointer-events-none"
              icon={faEllipsis}
              size="xl"
            />
          </button>
          <div
            ref={menuRef}
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute right-0 top-20 z-50 w-full rounded-2xl bg-white p-3 text-left text-sm
            drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] md:w-48 lg:top-10`}>
            <Dropdown
              className="right-4 top-7"
              type="class"
              handleEditClick={() => {
                setIsMenuOpen(false);
                setIsDeleting(false);
                setIsClassFormOpen(true);
              }}
              handleDeleteClick={() => {
                setIsMenuOpen(false);
                setIsDeleting(true);
                setIsClassFormOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 py-8 md:grid-cols-2 md:px-5 lg:grid-cols-3 2xl:grid-cols-4">
        {filteredLessons?.length === 0 && (
          <p>No lessons in selected time period.</p>
        )}
        {filteredLessons?.map((lesson, index) => {
          return (
            <div key={index}>
              <LessonCard
                lesson={lesson}
                index={index}
                setIsDeleting={setIsDeleting}
                setIsLessonFormOpen={setIsLessonFormOpen}
                setEditingIndex={setEditingIndex}
              />
            </div>
          );
        })}
      </div>
      <ClassForm
        currentClass={currentClass.name}
        classId={classId}
        open={isClassFormOpen}
        handleClose={handleClose}
        deleting={isDeleting}
        setDeleted={setDeleted}
      />
      <LessonForm
        lesson={
          editingIndex === -1
            ? null
            : {
                date: new Date(currentClass.lessons[editingIndex].date)
                  .toISOString()
                  .split("T")[0],
                objective: currentClass.lessons[editingIndex].objective,
                content: currentClass.lessons[editingIndex].content,
                resources: currentClass.lessons[editingIndex].resources
                  ? currentClass.lessons[editingIndex].resources
                  : "",
                differentiation: currentClass.lessons[editingIndex]
                  .differentiation
                  ? currentClass.lessons[editingIndex].differentiation
                  : "",
              }
        }
        classId={classId}
        lessonId={
          editingIndex === -1
            ? undefined
            : currentClass.lessons[editingIndex]._id
        }
        open={isLessonFormOpen}
        handleClose={handleClose}
        deleting={isDeleting}
        setEditingIndex={setEditingIndex}
      />
    </div>
  );
};

export default ClassPage;
