"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ClassDoc } from "@/models/Class";
import { StudentDoc } from "@/models/Student";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import StudentForm from "@/components/StudentForm";
import StudentCard from "@/components/StudentCard";

const ClassAssessment = ({ params }: { params: { cid: string } }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?._id;
  const token = user?.accessToken;
  const { cid: classId } = params;

  const menuRef = useRef(null);

  const [currentClass, setCurrentClass] = useState<ClassDoc | null>(null);
  const [students, setStudents] = useState<StudentDoc[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [filter, setFilter] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const notify = (type: "success" | "info" | "error", msg: string) => {
    if (type === "info") toast.info(msg);
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (!userId) return;
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}`,
          { headers: { Authorization: token } }
        );
        data.students.sort((a: any, b: any) => {
          if (a.name < b.name) return -1;
          if (b.name < a.name) return 1;
          return 0;
        });
        setCurrentClass(data);
        setStudents(data.students);
        setIsFetching(false);
      } catch (err: any) {
        if (err.response) {
          if (err.response.data.error) {
            setError(err.response.data.error);
            setIsFetching(false);
            return;
          }
        }
        console.log(err);
        notify("error", "Error fetching students.");
        setError("Our server is scratching its head. Please try again.");
        setIsFetching(false);
      }
    };
    getData();
  }, [userId, token, classId, isFormOpen]);

  const handleClose = () => {
    setIsFormOpen(false);
  };

  if (isFetching) {
    return (
      <main className="px-7 py-5 text-slate-900">
        <Spinner />
      </main>
    );
  }

  if (!currentClass) {
    return (
      <main className="flex-1 px-7 py-5 text-slate-900">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="flex-1 px-7 py-5 text-slate-900">
      <div className="flex flex-col justify-between gap-5 border-b-[0.5px] border-b-slate-500 pb-3 md:flex-row">
        <div className="flex flex-col gap-5 md:ml-5 lg:flex-row ">
          <h1 className="text-2xl font-bold">
            Students in {currentClass.name}
          </h1>
          <select
            value={filter}
            onChange={(e) => {
              console.log(e.target.value);
            }}
            className="rounded-md border-2 border-slate-900 px-1 lg:ml-0">
            <option value="">-- Sort students --</option>
            <option value="alphAsc">A-Z</option>
            <option value="alphDesc">This month</option>
            <option value="scoreAsc">This term</option>
            <option value="scoreDesc">Past lessons</option>
          </select>
        </div>
        <button
          className="btn-primary h-[32px] md:mr-5"
          onClick={() => {
            setEditingIndex(-1);
            setIsDeleting(false);
            setIsFormOpen(true);
          }}>
          + Add Student
        </button>
      </div>
      <div className="grid grid-cols-1 gap-5 py-8 md:grid-cols-2 md:px-5 lg:grid-cols-3 2xl:grid-cols-4">
        {currentClass.students?.length === 0 && (
          <p>No students in this class.</p>
        )}
        {currentClass.students?.map((student) => {
          return (
            <div key={student._id}>
              <StudentCard
                student={student}
                index={currentClass.students.findIndex(
                  (std) => std._id === student._id
                )}
                setIsDeleting={setIsDeleting}
                setIsLessonFormOpen={setIsFormOpen}
                setEditingIndex={setEditingIndex}
              />
            </div>
          );
        })}
      </div>
      <StudentForm
        student={
          editingIndex === -1
            ? null
            : { name: currentClass.students[editingIndex].name }
        }
        classId={classId}
        studentId={
          editingIndex === -1
            ? undefined
            : currentClass.students[editingIndex]._id
        }
        open={isFormOpen}
        handleClose={handleClose}
        deleting={isDeleting}
        setEditingIndex={setEditingIndex}
      />
    </main>
  );
};

export default ClassAssessment;
