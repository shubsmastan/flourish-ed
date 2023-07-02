"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ClassDoc } from "@/models/Class";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Lesson from "@/components/Lesson";
import LessonForm from "@/components/LessonForm";

const Class = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const id = user?._id;
  const token = user?.accessToken;
  const classId = window.location.href.split("classes/")[1];

  const [currentClass, setCurrentClass] = useState<ClassDoc | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!id) return;
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}`,
          { headers: { Authorization: token } }
        );
        setCurrentClass(data);
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
  }, [id, classId, token]);

  const handleClose = () => {
    setIsFormOpen(false);
  };

  if (isFetching) {
    return (
      <>
        <FontAwesomeIcon icon={faSpinner} size="xl" color="#0f172a" spin />
      </>
    );
  }

  if (!currentClass) {
    return (
      <>
        <p>{error}</p>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between pb-3 border-b-slate-500 border-b-[0.5px]">
        <h1 className="ml-5 text-2xl font-bold">{currentClass.name}</h1>
        <div className="relative">
          <button
            className="btn-primary mr-5"
            onClick={() => {
              setIsFormOpen(true);
            }}>
            New Lesson
          </button>
          <button
            className="mr-5"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}>
            <FontAwesomeIcon icon={faEllipsis} size="xl" />
          </button>
          <div
            className={`text-left text-sm absolute w-56 right-0 bg-white rounded-2xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] p-4 z-50 ${
              isMenuOpen ? "block" : "hidden"
            }`}>
            <button className="block mb-3">Edit name</button>
            <button className="block">Delete class</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 py-8 px-5 gap-5">
        {currentClass.lessons.map((lesson, index) => {
          console.log(lesson);
          return (
            <>
              <Lesson key={index} lesson={lesson} index={index} />
            </>
          );
        })}
      </div>
      <LessonForm
        lesson={editingIndex === -1 ? null : currentClass.lessons[editingIndex]}
        classId={classId}
        open={isFormOpen}
        handleClose={handleClose}
      />
    </>
  );
};

export default Class;
