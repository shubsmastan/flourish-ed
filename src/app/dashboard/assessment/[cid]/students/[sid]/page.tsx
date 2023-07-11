"use client";

import { useState, useEffect, useRef, MutableRefObject } from "react";
import { useSession } from "next-auth/react";
import { StudentDoc } from "@/models/Student";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faTrash,
  faPlus,
  faPenToSquare,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import StudentForm, { StudentType } from "@/components/StudentForm";
import AssessmentForm from "@/components/AssessmentForm";
import Spinner from "@/components/Spinner";
import Dropdown from "@/components/Dropdown";
import Link from "next/link";

const StudentPage = ({ params }: { params: { cid: string; sid: string } }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?._id;
  const token = user?.accessToken;
  const { cid: classId, sid: studentId } = params;

  const menuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const notify = (type: "success" | "info" | "error", msg: string) => {
    if (type === "info") toast.info(msg);
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

  const [student, setStudent] = useState<StudentDoc | null>(null);
  const [className, setClassName] = useState("");
  const [index, setIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAssessmentFormOpen, setIsAssessmentFormOpen] = useState(false);
  const [isStudentFormOpen, setIsStudentFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isGraphing, setIsGraphing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        if (!userId) return;
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}/students/${studentId}`,
          { headers: { Authorization: token } }
        );
        const { data: cls } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}`,
          { headers: { Authorization: token } }
        );
        setClassName(cls.name);
        cls.students.sort((a: any, b: any) => {
          if (a.name < b.name) return -1;
          if (b.name < a.name) return 1;
          return 0;
        });
        const studentIndices = cls.students.map(
          (student: StudentDoc) => student._id
        );
        setIndex(studentIndices.indexOf(studentId));
        setStudent(data);
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
        notify("error", "Error fetching student information.");
        setError("Our server is scratching its head. Please try again.");
        setIsFetching(false);
      }
    };
    getData();
  }, [userId, token, classId, studentId, isStudentFormOpen]);

  useEffect(() => {
    const callback = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as HTMLElement)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", callback);
    return () => {
      document.removeEventListener("mousedown", callback);
    };
  });

  const handleClose = () => {
    setIsStudentFormOpen(false);
    setIsAssessmentFormOpen(false);
  };

  if (isFetching) {
    return (
      <main className="px-7 py-5 text-slate-900">
        <Spinner />
      </main>
    );
  }

  if (!student) {
    return (
      <main className="flex-1 px-7 py-5 text-slate-900">
        <h1>{error}</h1>
      </main>
    );
  }

  if (deleted) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-7 py-5 text-slate-900">
        <p className="mb-4">You deleted this student.</p>
        <FontAwesomeIcon icon={faTrash} size="2xl" className="mb-4" />
        <Link className="btn-primary" href={`/dashboard/assessment/${classId}`}>
          Back to class
        </Link>
      </main>
    );
  }

  if (isGraphing) {
    return (
      <main className="flex-1 px-7 py-5 text-slate-900">
        <div className="flex flex-col justify-between gap-5 border-b-[0.5px] border-b-slate-500 pb-3 md:flex-row">
          <div className="ml-5 flex flex-col gap-5 lg:flex-row lg:items-center">
            <h1 className="text-2xl font-bold">
              {student.name}&apos;s Assessment Data
            </h1>
            <h2 className="text-">{className}</h2>
          </div>
        </div>
        <div className="px-10 py-5">
          <h2 className="mb-5 text-xl font-semibold">
            Get ready for some graphs!
          </h2>
          <button
            className="btn-primary"
            onClick={() => {
              setIsGraphing(false);
            }}>
            Back to results.
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-7 py-5 text-slate-900">
      <div className="flex flex-col justify-between gap-5 border-b-[0.5px] border-b-slate-500 pb-3 md:flex-row">
        <div className="ml-5 flex flex-col gap-5 lg:flex-row lg:items-center">
          <h1 className="text-2xl font-bold">
            {student.name}&apos;s Assessment Data
          </h1>
          <h2 className="text-">{className}</h2>
        </div>
        <div className="relative flex flex-col md:mr-10 md:items-end lg:flex-row">
          <button
            onClick={() => {
              setIsAssessmentFormOpen(true);
            }}
            className="btn-primary mb-3 flex max-h-10 items-center justify-center md:w-[140px] lg:mb-0">
            <FontAwesomeIcon className="mr-2" icon={faPlus} color="#0f172a" />
            <p>Add result</p>
          </button>
          <button
            className="rounded-md py-1 hover:bg-slate-300 md:w-12"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}>
            <FontAwesomeIcon icon={faEllipsis} size="xl" />
          </button>
          <div
            ref={menuRef}
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute right-0 top-20 z-50 w-full rounded-2xl bg-white p-3 text-left text-sm
            drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] md:w-48 lg:top-10`}>
            <Dropdown
              type="student"
              handleEditClick={() => {
                setIsDeleting(false);
                setIsStudentFormOpen(true);
              }}
              handleDeleteClick={() => {
                setIsDeleting(true);
                setIsStudentFormOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      <div className="px-5 py-8 text-lg">
        <button
          onClick={() => {
            setIsGraphing(true);
          }}
          className="btn-primary ml-5 flex max-h-10 items-center justify-center lg:mb-0">
          <FontAwesomeIcon
            className="mr-2"
            icon={faChartSimple}
            color="#0f172a"
          />
          <p>View Graphs</p>
        </button>
        <div className="mt-5 grid grid-cols-1 gap-5 py-2 md:grid-cols-2 md:px-5 lg:grid-cols-3 2xl:grid-cols-4">
          {student.assessments.map((ass, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 rounded-md bg-white p-4 text-sm drop-shadow-lg">
              <h2 className="mb-2 text-lg font-semibold">
                Assessment {index + 1}
              </h2>
              <div className="text-md mb-3 flex items-center gap-2 text-slate-500">
                <FontAwesomeIcon
                  style={{ paddingBottom: "2px" }}
                  icon={faCalendar}
                />
                <p>{new Date(ass.date).toDateString()}</p>
              </div>
              <div className="text-md mb-3 flex items-center gap-2">
                <FontAwesomeIcon
                  style={{ paddingBottom: "2px", marginRight: "3px" }}
                  icon={faPenToSquare}
                />
                <p>{ass.result}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <StudentForm
        student={
          student
            ? ({
                name: student.name,
                assessments: student.assessments,
              } as unknown as StudentType)
            : null
        }
        classId={classId}
        studentId={studentId}
        open={isStudentFormOpen}
        handleClose={handleClose}
        deleting={isDeleting}
        setEditingIndex={setIndex}
        setDeleted={setDeleted}
      />
      <AssessmentForm
        student={{
          name: student.name,
          assessments: student.assessments,
        }}
        classId={classId}
        studentId={studentId}
        open={isAssessmentFormOpen}
        handleClose={handleClose}
        setEditingIndex={setIndex}
      />
    </main>
  );
};

export default StudentPage;
