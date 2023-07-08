"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { toast } from "react-toastify";
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
  deleting: boolean;
  handleClose: () => void;
}

const LessonForm = ({
  lesson,
  open,
  classId,
  lessonId,
  deleting,
  handleClose,
}: LessonFormProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const id = user?._id;
  const token = user?.accessToken;

  const router = useRouter();

  const notify = (type: "success" | "info" | "error", msg: string) => {
    if (type === "info") toast.info(msg);
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

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
    } else {
      setLessonData({
        date: new Date(Date.now()).toISOString().split("T")[0],
        objective: "",
        content: "",
        resources: "",
        differentiation: "",
      });
      setIsEditing(false);
    }
  }, [lesson]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLessonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}/lessons/${lessonId}`,
        {
          headers: { Authorization: token },
        }
      );
      handleClose();
      setError("");
      notify("info", "Lesson deleted successfully.");
    } catch (err: any) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
        return;
      }
      notify("error", "Error deleting lesson.");
    }
  };

  const handleSave = async () => {
    try {
      if (!id) return;
      if (
        (lessonData.date === "",
        lessonData.objective === "" || lessonData.content === "")
      ) {
        setError("Please enter a date, objective and content for your lesson.");
        return;
      }
      isEditing
        ? await axios.put(
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
          )
        : await axios.post(
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
      handleClose();
      setError("");
      notify(
        "success",
        `Lesson ${isEditing ? "changed" : "created"} successfully.`
      );
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
        return;
      }
      notify("error", "Error creating class.");
    }
  };

  if (deleting) {
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
              <h1 className="mb-10 text-2xl font-bold">Delete Class</h1>
              <p className="absolute top-20 text-rose-800">{error}</p>
              <p className="text-lg">
                Are you sure you want to delete the class this lesson?
              </p>
              <div className="mt-5 flex justify-end gap-5 border-t-[1px] border-t-slate-300">
                <button
                  type="button"
                  className="btn-cancel mt-5"
                  onClick={handleClose}>
                  Cancel
                </button>
                <button
                  className="btn-primary mt-5"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                    router.push(`/dashboard/classes/${classId}`);
                  }}>
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    );
  }

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
            <h1 className="mb-10 text-2xl font-bold">
              {isEditing ? "Edit" : "New"} Lesson
            </h1>
            <p className="absolute top-20 text-rose-800">{error}</p>
            <div className="grid grid-cols-[1fr_6fr] gap-x-3 gap-y-5">
              <label>Date:</label>
              <input
                required
                type="date"
                name="date"
                value={lessonData.date.toString()}
                onChange={handleInputChange}
                className="flex-1 rounded-md bg-slate-200 px-2 py-1"
              />
              <label>Objective:</label>
              <input
                required
                type="text"
                name="objective"
                value={lessonData.objective}
                onChange={handleInputChange}
                className="flex-1 rounded-md bg-slate-200 px-2 py-1"
              />
              <label>Content:</label>
              <textarea
                required
                name="content"
                value={lessonData.content}
                onChange={handleInputChange}
                className="h-32 flex-1 resize-none rounded-md bg-slate-200 px-2 py-1"></textarea>
              <label>Resources:</label>
              <textarea
                name="resources"
                value={lessonData.resources}
                onChange={handleInputChange}
                className="flex-1 resize-none rounded-md bg-slate-200 px-2 py-1"></textarea>
              <label>Differentiation:</label>
              <textarea
                name="differentiation"
                value={lessonData.differentiation}
                onChange={handleInputChange}
                className="flex-1 resize-none rounded-md bg-slate-200 px-2 py-1"></textarea>
            </div>
            <div className="mt-5 flex justify-end gap-5 border-t-[1px] border-t-slate-300">
              <button
                type="button"
                className="btn-cancel mt-5"
                onClick={handleClose}>
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
