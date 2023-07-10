"use client";

import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import { useSession } from "next-auth/react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { toast } from "react-toastify";
import { figtree } from "@/libs/fonts";
import axios from "axios";
import DeleteForm from "@/components/DeleteForm";

interface ClassFormProps {
  currentClass: string | undefined;
  open: boolean;
  deleting: boolean;
  classId?: string;
  handleClose: () => void;
  setDeleted?: Dispatch<SetStateAction<boolean>>;
}

const ClassForm = ({
  currentClass,
  open,
  deleting,
  classId,
  handleClose,
  setDeleted,
}: ClassFormProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const id = user?._id;
  const token = user?.accessToken;

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const [className, setClassName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const notify = (type: "success" | "info" | "error", msg: string) => {
    if (type === "info") toast.info(msg);
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

  useEffect(() => {
    inputRef?.current?.focus();
    if (currentClass) {
      setClassName(currentClass);
      setIsEditing(true);
    } else {
      setClassName("");
      setIsEditing(false);
    }
  }, [currentClass]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClassName(e.target.value);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}`,
        {
          headers: { Authorization: token },
        }
      );
      handleClose();
      setError("");
      notify("info", "Class deleted successfully.");
    } catch (err: any) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
        return;
      }
      notify("error", "Error deleting class.");
    }
  };

  const handleSave = async () => {
    try {
      if (!id) return;
      if (className === "") {
        setError("Please enter a name for the class.");
        return;
      }
      isEditing
        ? await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}`,
            {
              name: className,
            },
            {
              headers: { Authorization: token },
            }
          )
        : await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes`,
            {
              name: className,
            },
            {
              headers: { Authorization: token },
            }
          );
      handleClose();
      setError("");
      notify(
        "success",
        `Class ${isEditing ? "changed" : "created"} successfully.`
      );
      setClassName("");
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
      <DeleteForm
        type="class"
        open={open}
        error={error}
        handleDelete={handleDelete}
        handleClose={handleClose}
        setDeleted={setDeleted}
      />
    );
  }

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
              {isEditing ? "Edit" : "New"} Class
            </h1>
            <p className="absolute top-20 text-rose-800">{error}</p>
            <div className="grid grid-cols-[1fr_6fr] gap-x-3 gap-y-5">
              <label>Name:</label>
              <input
                ref={inputRef}
                required
                type="text"
                name="name"
                value={className}
                onChange={handleInputChange}
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

export default ClassForm;
