"use client";

import { useState, useEffect, useRef, MutableRefObject } from "react";
import { useSession } from "next-auth/react";
import { ClassDoc } from "@/models/Class";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import LessonCard from "@/components/LessonCard";
import LessonForm from "@/components/LessonForm";
import ClassForm from "@/components/ClassForm";
import Spinner from "@/components/Spinner";
import Dropdown from "@/components/Dropdown";

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
          notify("error", err.response.data.error);
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

  return (
    <div className="flex-1 px-7 py-5 text-slate-900">
      <div className="flex justify-between border-b-[0.5px] border-b-slate-500 pb-3">
        <h1 className="ml-5 text-2xl font-bold">{currentClass.name}</h1>
        <div className="relative">
          <button
            className="btn-primary mr-5"
            onClick={() => {
              setEditingIndex(-1);
              setIsDeleting(false);
              setIsLessonFormOpen(true);
            }}>
            <FontAwesomeIcon className="mr-2" icon={faPlus} color="#0f172a" />
            New Lesson
          </button>
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
          <div ref={menuRef} className={isMenuOpen ? "block" : "hidden"}>
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
      <div className="grid grid-cols-3 gap-5 px-5 py-8">
        {currentClass.lessons.map((lesson, index) => {
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
