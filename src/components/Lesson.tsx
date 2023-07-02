"use client";

import { ClassDoc } from "@/models/Class";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LessonProps {
  lesson: {
    classId: ClassDoc;
    date: Date;
    objective: string;
    resources?: string;
    content: string;
    differentiation?: string;
  };
  index: number;
}

const Lesson = ({ lesson, index }: LessonProps) => {
  return (
    <div className="p-4 bg-white drop-shadow-lg rounded-md text-sm flex flex-col gap-2 -z-10">
      <h1 className="font-semibold text-xl">Lesson {index + 1}</h1>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Objective:</p>
        <p>{lesson.objective}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Content:</p>
        <p>{lesson.content}</p>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <p className="font-semibold mb-1">Resources:</p>
          <p>{lesson.resources}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Differentiation:</p>
        <p>{lesson.differentiation}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <FontAwesomeIcon style={{ paddingBottom: "2px" }} icon={faCalendar} />
        <p>{new Date(lesson.date).toDateString()}</p>
      </div>
    </div>
  );
};

export default Lesson;
