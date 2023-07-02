"use client";

import { LessonDoc } from "@/models/Lesson";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface LessonProps {
  lesson: LessonDoc;
  index: number;
}

const LessonCard = ({ lesson, index }: LessonProps) => {
  return (
    <div className="-z-10 flex flex-col gap-2 rounded-md bg-white p-4 text-sm drop-shadow-lg">
      <div className="flex justify-between">
        <Link
          href={`/dashboard/classes/${lesson.classId}/lessons/${lesson._id}`}
          passHref>
          <h1 className="text-xl font-semibold">Lesson {index + 1}</h1>
        </Link>
        <FontAwesomeIcon icon={faEllipsis} size="lg" />
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
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <FontAwesomeIcon style={{ paddingBottom: "2px" }} icon={faCalendar} />
        <p>{new Date(lesson.date).toDateString()}</p>
      </div>
    </div>
  );
};

export default LessonCard;
