"use client";

import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { figtree } from "@/libs/fonts";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DeleteForm from "./DeleteForm";

export interface StudentType {
  name: string;
  assessments: AssessmentType[];
}

interface AssessmentType {
  date: Date;
  result: number;
}

interface StudentFormProps {
  student: StudentType;
  open: boolean;
  classId: string;
  studentId?: string;
  handleClose: () => void;
  setEditingIndex?: Dispatch<SetStateAction<number>>;
}

const StudentForm = ({
  open,
  student,
  classId,
  studentId,
  handleClose,
  setEditingIndex,
}: StudentFormProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?._id;
  const token = user?.accessToken;

  const [assessmentData, setAssessmentData] = useState<AssessmentType>({
    date: new Date(Date.now()),
    result: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const notify = (type: "success" | "info" | "error", msg: string) => {
    if (type === "info") toast.info(msg);
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setStudentData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleDelete = async () => {
  //   console.log(studentId);
  //   try {
  //     await axios.delete(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}/students/${studentId}`,
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );
  //     handleClose();
  //     setError("");
  //     notify("info", "Assessment deleted successfully.");
  //   } catch (err: any) {
  //     console.log(err);
  //     if (err.response.data.error) {
  //       setError(err.response.data.error);
  //       return;
  //     }
  //     notify("error", "Error deleting student.");
  //   }
  // };

  const handleSave = async () => {
    setError("");
    if (isEditing) return;
    if (assessmentData.result > 100) {
      setError("Please enter a number between 0 and 100");
      return;
    }
    student.assessments.push(assessmentData);
    student.assessments.sort((a, b) => {
      if (a.date < b.date) return 1;
      if (b.date < a.date) return -1;
      return 0;
    });
    try {
      if (!userId) return;
      if (student.name === "") {
        setError("Name is required.");
        return;
      }
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}/students/${studentId}`,
        {
          name: student.name,
          assessments: student.assessments,
        },
        {
          headers: { Authorization: token },
        }
      );
      handleClose();
      setError("");
      notify(
        "success",
        `Assessment ${isEditing ? "changed" : "added"} successfully.`
      );
      setAssessmentData({
        date: new Date(Date.now()),
        result: 0,
      });
      handleClose();
    } catch (err: any) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
        return;
      }
      notify("error", "Error creating student.");
    }
  };

  // if (deleting) {
  //   return (
  //     <DeleteForm
  //       type="student"
  //       open={open}
  //       error={error}
  //       handleDelete={handleDelete}
  //       handleClose={handleClose}
  //       classId={classId}
  //       setEditingIndex={setEditingIndex}
  //       setDeleted={setDeleted}
  //     />
  //   );
  // }

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          rounded-md bg-white text-sm outline-none max-sm:w-screen sm:w-[640px] ${figtree.className}`}>
          <button
            className="absolute right-5 top-3 text-2xl"
            onClick={handleClose}>
            &times;
          </button>
          <form className="px-12 pb-5 pt-10">
            <h1 className="mb-10 text-2xl font-bold">
              {" "}
              {isEditing ? "Edit" : "New"} Assessment for {student.name}
            </h1>
            <p className="absolute top-20 text-rose-800">{error}</p>
            <div className="grid grid-cols-[1fr_6fr] gap-x-3 gap-y-5">
              <label htmlFor="date">Date:</label>
              <input
                required
                id="date"
                type="date"
                name="date"
                max={new Date().toISOString().split("T")[0]}
                value={assessmentData.date.toISOString().split("T")[0]}
                onChange={(e) => {
                  setAssessmentData({
                    ...assessmentData,
                    date: new Date(e.target.value),
                  });
                }}
                className="flex-1 rounded-md bg-slate-200 px-2 py-1"
              />
              <label htmlFor="result">Result:</label>
              <input
                required
                id="result"
                type="number"
                name="result"
                max={100}
                value={assessmentData.result}
                onChange={(e) => {
                  setAssessmentData({
                    ...assessmentData,
                    result: parseInt(e.target.value),
                  });
                }}
                className="flex-1 rounded-md bg-slate-200 px-2 py-1"
              />
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

export default StudentForm;
