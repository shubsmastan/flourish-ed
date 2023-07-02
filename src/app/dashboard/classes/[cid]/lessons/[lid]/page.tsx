"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faSpinner } from "@fortawesome/free-solid-svg-icons";
import LessonForm from "@/components/LessonForm";
import { LessonDoc } from "@/models/Lesson";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const LessonPage = ({ params }: { params: { cid: string; lid: string } }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?._id;
  const token = user?.accessToken;
  const { cid: classId, lid: lessonId } = params;

  const [lesson, setLesson] = useState<LessonDoc | null>(null);
  const [className, setClassName] = useState("");
  const [index, setIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
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
        if (err.response) {
          setError(err.response.data.error);
          setIsFetching(false);
          return;
        }
        console.log(err);
        setError("Error fetching class information.");
        setIsFetching(false);
      }
    };
    getData();
  }, [userId, token, classId, lessonId, isFormOpen]);

  const handleClose = () => {
    setIsFormOpen(false);
  };

  if (isFetching) {
    return (
      <div className="px-7 py-5 text-slate-900">
        <FontAwesomeIcon icon={faSpinner} size="xl" color="#0f172a" spin />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex-1 px-7 py-5 text-slate-900">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-7 py-5 text-slate-900">
      <div className="flex justify-between border-b-[0.5px] border-b-slate-500 pb-3">
        <h1 className="ml-5 text-2xl font-bold">
          {className} Lesson {index}
        </h1>
        <div className="relative">
          <button
            className="btn-primary mr-5"
            onClick={() => {
              setIsFormOpen(true);
            }}>
            Edit Lesson
          </button>
          <button
            className="mr-5"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}>
            <FontAwesomeIcon icon={faEllipsis} size="xl" />
          </button>
          <div
            className={`absolute right-0 z-50 w-56 rounded-2xl bg-white p-4 text-left text-sm drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] ${
              isMenuOpen ? "block" : "hidden"
            }`}>
            <button className="mb-3 block">Edit lesson</button>
            <button className="block">Delete lesson</button>
          </div>
        </div>
      </div>
      <div className="px-5 py-8 text-lg">
        <div className="text-md mb-3 flex items-center gap-2 text-slate-500">
          <FontAwesomeIcon style={{ paddingBottom: "2px" }} icon={faCalendar} />
          <p>{new Date(lesson.date).toDateString()}</p>
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <p className="font-semibold">Objective:</p>
          <p>{lesson.objective}</p>
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <p className="font-semibold">Content:</p>
          <p>{lesson.content}</p>
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <div>
            <p className="mb-1 font-semibold">Resources:</p>
            <p>{lesson.resources ? lesson.resources : "(none)"}</p>
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <p className="font-semibold">Differentiation:</p>
          <p>{lesson.differentiation ? lesson.differentiation : "(none)"}</p>
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
      />
    </div>
  );
};

export default LessonPage;
