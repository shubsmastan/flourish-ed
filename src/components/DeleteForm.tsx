import { figtree } from "@/libs/fonts";
import { Fade, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface DeleteFormProps {
  type: "lesson" | "class";
  open: boolean;
  error: string;
  handleDelete: () => Promise<void>;
  handleClose: () => void;
  classId?: string;
  setEditingIndex: Dispatch<SetStateAction<number>>;
}

const DeleteForm = ({
  type,
  open,
  error,
  handleDelete,
  handleClose,
  classId,
  setEditingIndex,
}: DeleteFormProps) => {
  const router = useRouter();

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
              Delete {type === "class" ? "Class" : "Lesson"}
            </h1>
            <p className="absolute top-20 text-rose-800">{error}</p>
            <p className="text-lg">
              Are you sure you want to delete this {type}?
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
                  setEditingIndex(-1);
                }}>
                Confirm
              </button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteForm;
