"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { figtree } from "@/libs/fonts";
import axios from "axios";

interface LessonType {
  date: string;
  objective: string;
  content: string;
  resources: string | undefined;
  differentiation: string | undefined;
}

interface LessonFormProps {
  lesson: LessonType | null;
  open: boolean;
  classId: string;
  lessonId?: string;
  handleClose: () => void;
}

const LessonForm = ({
  lesson,
  open,
  classId,
  lessonId,
  handleClose,
}: LessonFormProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const id = user?._id;
  const token = user?.accessToken;

  const [lessonData, setLessonData] = useState<LessonType>({
    date: new Date(Date.now()).toISOString().split("T")[0],
    objective: "",
    content: "",
    resources: "",
    differentiation: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (lesson) {
      setLessonData(lesson);
      setIsEditing(true);
    }
  }, [lesson]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLessonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!id) return;
      if (isEditing) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}/lessons/${lessonId}`,
          {
            date: lessonData.date,
            objective: lessonData.objective,
            content: lessonData.content,
            resources: lessonData.resources,
            differentiation: lessonData.differentiation,
          },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}/lessons`,
          {
            date: lessonData.date,
            objective: lessonData.objective,
            content: lessonData.content,
            resources: lessonData.resources,
            differentiation: lessonData.differentiation,
          },
          {
            headers: { Authorization: token },
          }
        );
      }
      setLessonData({
        date: new Date(Date.now()).toISOString().split("T")[0],
        objective: "",
        content: "",
        resources: "",
        differentiation: "",
      });
      handleClose();
    } catch (err: any) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <div
          className={`absolute left-1/2 top-1/2 w-[700px] -translate-x-1/2
          -translate-y-1/2 rounded-md bg-white text-sm outline-none ${figtree.className}`}>
          <button
            className="absolute right-5 top-3 text-2xl"
            onClick={handleClose}>
            &times;
          </button>
          <form className="px-12 pb-5 pt-10">
            <h1 className="mb-10 text-2xl font-bold">New Lesson</h1>
            <p className="absolute top-20 text-rose-800">{error}</p>
            <div className="grid grid-cols-[1fr_6fr] gap-x-3 gap-y-5">
              <label>Date:</label>
              <input
                required
                type="date"
                name="date"
                value={lessonData.date.toString()}
                onChange={handleInputChange}
                className="flex-1 rounded-sm bg-slate-200 p-1"
              />
              <label>Objective:</label>
              <input
                required
                type="text"
                name="objective"
                value={lessonData.objective}
                onChange={handleInputChange}
                className="flex-1 rounded-sm bg-slate-200 p-1"
              />
              <label>Content:</label>
              <textarea
                required
                name="content"
                value={lessonData.content}
                onChange={handleInputChange}
                className="h-32 flex-1 resize-none rounded-sm bg-slate-200 p-1"></textarea>
              <label>Resources:</label>
              <textarea
                name="resources"
                value={lessonData.resources}
                onChange={handleInputChange}
                className="flex-1 resize-none rounded-sm bg-slate-200 p-1"></textarea>
              <label>Differentiation:</label>
              <textarea
                name="differentiation"
                value={lessonData.differentiation}
                onChange={handleInputChange}
                className="flex-1 resize-none rounded-sm bg-slate-200 p-1"></textarea>
            </div>
            <div className="mt-5 flex justify-end gap-5 border-t-[1px] border-t-slate-300">
              <button
                className="btn-primary mt-5"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                }}>
                Cancel
              </button>
              <button
                className="btn-primary mt-5"
                onClick={(e) => {
                  e.preventDefault();
                  handleSave();
                }}>
                Save
              </button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default LessonForm;
