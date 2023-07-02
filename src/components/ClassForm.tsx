"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { figtree } from "@/libs/fonts";
import axios from "axios";

interface ClassFormProps {
  currentClass: string | undefined;
  open: boolean;
  deleting: boolean;
  classId?: string;
  handleClose: () => void;
}

const ClassForm = ({
  currentClass,
  open,
  deleting,
  classId,
  handleClose,
}: ClassFormProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const id = user?._id;
  const token = user?.accessToken;

  const router = useRouter();

  const [className, setClassName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  console.log(classId);

  useEffect(() => {
    if (currentClass) {
      setIsEditing(true);
      setClassName(currentClass);
    }
  }, [currentClass]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    } catch (err: any) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
      }
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
      if (currentClass) setClassName(currentClass);
    } catch (err: any) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
      }
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
                Are you sure you want to delete the class {className}?
              </p>
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
                    handleDelete();
                    router.push("/dashboard");
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
            <h1 className="mb-10 text-2xl font-bold">Edit Class</h1>
            <p className="absolute top-20 text-rose-800">{error}</p>
            <div className="grid grid-cols-[1fr_6fr] gap-x-3 gap-y-5">
              <label>Name:</label>
              <input
                required
                type="text"
                name="name"
                value={className}
                onChange={handleInputChange}
                className="flex-1 rounded-sm bg-slate-200 p-1"
              />
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

export default ClassForm;
