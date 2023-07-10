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
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const Main = ({ filter }: { filter: "today" | "this-week" | "past" }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?._id;
  const token = user?.accessToken;

  const [classes, setClasses] = useState<ClassDoc[] | undefined>();
  const [lessons, setLessons] = useState<LessonDoc[] | undefined>();
  const [isFetching, setIsFetching] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);
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
        data.sort((a: any, b: any) => {
          const nameA = a.name;
          const nameB = b.name;
          if (nameA < nameB) return -1;
          if (nameB < nameA) return 1;
          return 0;
        });
        setClasses(data);
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
    return <Spinner />;
  }

  if (!lessons) {
    return <></>;
  }

  if (lessons.length === 0) {
    return (
      <>
        <div className="mb-5 border-b-[0.5px] border-b-slate-500">
          <h1 className="text-sm">Hi {user?.firstName}!</h1>
          <p className="mb-2 text-lg font-semibold">{quotes[quote]}</p>
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            {filter === "today"
              ? "No lessons today! 🎉"
              : filter === "this-week"
              ? "No upcoming lessons."
              : "No recent lessons."}
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-5 border-b-[0.5px] border-b-slate-500">
        <h1 className="text-sm">Hi {user?.firstName}!</h1>
        <p className="mb-2 text-lg font-semibold">{quotes[quote]}</p>
      </div>
      <div>
        <h1 className="mb-5 text-2xl font-bold">
          {filter === "today"
            ? "Today's Lessons"
            : filter === "this-week"
            ? "This Week's Lessons"
            : "Your Past Lessons"}
        </h1>
      </div>
      {classes?.map((cls) => (
        <div key={cls._id} className="mb-5">
          <h2 className="ml-1 font-semibold md:ml-5">{cls.name}</h2>
          <div className="grid grid-cols-1 gap-5 py-4 md:grid-cols-2 md:px-5 lg:grid-cols-3 2xl:grid-cols-4">
            {cls.lessons
              .filter((lsn) => {
                if (filter === "today") {
                  return dayjs(lsn.date).isSame(dayjs(), "day");
                }
                if (filter === "this-week") {
                  return dayjs(lsn.date).isBetween(
                    dayjs().subtract(1, "day"),
                    dayjs().add(7, "day"),
                    "day"
                  );
                }
                if (filter === "past") {
                  return dayjs(lsn.date).isBefore(dayjs(), "day");
                }
              })
              .sort((a: any, b: any) => {
                const dateA = a.date;
                const dateB = b.date;
                if (dateA < dateB) return -1;
                if (dateB < dateA) return 1;
                return 0;
              })
              .map((lesson, index) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  index={index}
                  displayIndex={index}
                  setIsDeleting={setIsDeleting}
                  setIsLessonFormOpen={setIsFormOpen}
                  setEditingIndex={setEditingIndex}
                />
              ))}
          </div>
        </div>
      ))}
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

export default Main;
