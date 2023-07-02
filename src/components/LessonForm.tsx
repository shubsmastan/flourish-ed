"use client";

import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { figtree } from "@/libs/fonts";
import axios from "axios";

const LessonForm = ({
  lesson,
  open,
  classId,
  handleClose,
}: {
  lesson: any;
  open: boolean;
  classId: string;
  handleClose: () => void;
}) => {
  const [lessonData, setLessonData] = useState({
    classId: classId,
    date: new Date(Date.now()).toISOString().split("T")[0],
    objective: "",
    content: "",
    resources: [],
    differentiation: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (lesson) {
      setLessonData(lesson);
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

  const handleSave = () => {
    try {
      axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}/lessons`,
        { lessonData }
      );
    } catch (err: any) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
      }
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}>
      <Fade in={open}>
        <div
          className={`bg-white absolute top-1/2 left-1/2 -translate-x-1/2
          -translate-y-1/2 outline-none rounded-md w-[700px] text-sm ${figtree.className}`}>
          <button
            className="absolute right-5 top-3 text-2xl"
            onClick={handleClose}>
            &times;
          </button>
          <form className="pt-10 pb-5 px-12">
            <h1 className="text-2xl font-bold mb-10">New Lesson</h1>
            <div className="grid grid-cols-[1fr_6fr] gap-y-5 gap-x-3">
              <label>Date:</label>
              <input
                required
                type="date"
                name="date"
                value={lessonData.date}
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
                className="flex-1 rounded-sm bg-slate-200 p-1 resize-none h-32"></textarea>
              <label>Resources:</label>
              <textarea
                name="resources"
                value={lessonData.resources}
                onChange={handleInputChange}
                className="flex-1 rounded-sm bg-slate-200 p-1 resize-none"></textarea>
              <label>Differentiation:</label>
              <textarea
                name="differentiation"
                value={lessonData.differentiation}
                onChange={handleInputChange}
                className="flex-1 rounded-sm bg-slate-200 p-1 resize-none"></textarea>
            </div>
            <div className="flex gap-5 justify-end mt-5 border-t-[1px] border-t-slate-300">
              <button
                className="mt-5 btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                }}>
                Cancel
              </button>
              <button
                className="mt-5 btn-primary"
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
