"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClassDoc } from "@/models/Class";
import { LessonDoc } from "@/models/Lesson";
import Spinner from "@/components/Spinner";
import LessonCard from "@/components/LessonCard";
import LessonForm from "@/components/LessonForm";
import dayjs from "dayjs";

const Today = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const userId = user?._id;
  const token = user?.accessToken;

  const [lessons, setLessons] = useState<LessonDoc[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);
  const [error, setError] = useState("");
  const [quote, setQuote] = useState(-1);

  const notify = (type: "success" | "info" | "error", msg: string) => {
    if (type === "info") toast.info(msg);
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

  const quotes = [
    "You are an educational rockstar.",
    "You don't just teach, you inspire.",
    "Creativity is intelligence having fun.",
    "Education is a tool to change the future.",
    "Change the world, one pupil at a time.",
    "The best teachers are the best learners.",
  ];

  useEffect(() => {
    setQuote(Math.floor(Math.random() * quotes.length));
  }, [quotes.length]);

  useEffect(() => {
    const getLessons = async () => {
      try {
        if (!userId) return;
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes`,
          { headers: { Authorization: token } }
        );
        let myLessons: LessonDoc[] = [];
        data.forEach((cls: ClassDoc) => {
          cls.lessons.forEach((lesson: LessonDoc) => {
            if (dayjs(lesson.date).isSame(dayjs(), "day")) {
              myLessons.push(lesson);
            }
          });
        });
        setLessons(myLessons);
        setIsFetching(false);
      } catch (err: any) {
        if (err.response?.data.error) {
          notify("error", err.response.data.error);
          setIsFetching(false);
          return;
        }
        console.log(err);
        notify("error", "Error fetching lessons.");
        setIsFetching(false);
      }
    };
    getLessons();
  }, [userId, token, isFormOpen]);

  const handleClose = () => {
    setIsFormOpen(false);
  };

  if (isFetching) {
    return (
      <div className="px-7 py-5 text-slate-900">
        <Spinner />
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="flex-1 px-7 py-5 text-slate-900">
        <div className="mb-5 border-b-[0.5px] border-b-slate-500">
          <h1 className="text-sm">Hi {user?.firstName}!</h1>
          <p className="mb-2 text-lg font-semibold">{quotes[quote]}</p>
        </div>
        <div>
          <h1 className="text-2xl font-bold">No lessons today! 🎉</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 px-7 py-5 text-slate-900">
        <div className="mb-5 border-b-[0.5px] border-b-slate-500">
          <h1 className="text-sm">Hi {user?.firstName}!</h1>
          <p className="mb-2 text-lg font-semibold">{quotes[quote]}</p>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Today&apos;s Lessons</h1>
        </div>
        <div className="grid grid-cols-3 gap-5 px-5 py-8">
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              index={index}
              setIsDeleting={setIsDeleting}
              setIsLessonFormOpen={setIsFormOpen}
              setEditingIndex={setEditingIndex}
            />
          ))}
        </div>
      </div>
      <LessonForm
        lesson={{
          date: new Date(lessons[editingIndex].date)
            .toISOString()
            .split("T")[0],
          objective: lessons[editingIndex].objective,
          content: lessons[editingIndex].content,
          resources: lessons[editingIndex].resources
            ? lessons[editingIndex].resources
            : "",
          differentiation: lessons[editingIndex].differentiation
            ? lessons[editingIndex].differentiation
            : "",
        }}
        classId={lessons[editingIndex].classId as unknown as string}
        lessonId={lessons[editingIndex]._id}
        open={isFormOpen}
        handleClose={handleClose}
        deleting={isDeleting}
        setEditingIndex={setEditingIndex}
      />
    </>
  );
};

export default Today;
