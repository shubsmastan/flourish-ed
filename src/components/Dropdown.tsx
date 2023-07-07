import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DropdownProps {
  type: "class" | "lesson";
  className: string;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
}

const Dropdown = ({
  type,
  className,
  handleEditClick,
  handleDeleteClick,
}: DropdownProps) => {
  return (
    <div
      className={`absolute z-50 w-48 rounded-2xl bg-white p-3
    text-left text-sm drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)]
    ${className}`}>
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
    </div>
  );
};

export default Dropdown;
