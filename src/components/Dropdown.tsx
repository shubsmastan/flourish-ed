import {
  faMagnifyingGlass,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface DropdownProps {
  type: "class" | "lesson";

  handleEditClick: () => void;
  handleDeleteClick: () => void;
}

const Dropdown = ({
  type,
  handleEditClick,
  handleDeleteClick,
}: DropdownProps) => {
  return (
    <>
      <button
        className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-slate-300"
        onClick={handleEditClick}>
        <FontAwesomeIcon icon={faPen} size="sm" /> <p>Edit {type}</p>
      </button>
      <button
        className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-slate-300"
        onClick={handleDeleteClick}>
        <FontAwesomeIcon icon={faTrash} size="sm" /> <p>Delete {type}</p>
      </button>
    </>
  );
};

export default Dropdown;
