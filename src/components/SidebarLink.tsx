import { ClassDoc } from "@/models/Class";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Dropdown from "./Dropdown";

interface SidebarLinkProps {
  activeClass: ClassDoc;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  setIsClassFormOpen: Dispatch<SetStateAction<boolean>>;
  setActiveEditing: Dispatch<SetStateAction<ClassDoc | null>>;
}

const SidebarLink = ({
  activeClass,
  active,
  setActive,
  setIsDeleting,
  setIsClassFormOpen,
  setActiveEditing,
}: SidebarLinkProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef() as MutableRefObject<HTMLDivElement>;

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

  return (
    <div
      className={`sidebar-item relative flex w-full ${
        active === activeClass._id ? "active" : ""
      }`}>
      <Link
        href={`/dashboard/classes/${activeClass._id}`}
        passHref
        onClick={() => {
          setActive(activeClass._id);
        }}
        className="flex-1">
        <p>{activeClass.name}</p>
      </Link>
      <button
        className="mr-2 rounded px-1 hover:bg-slate-400"
        onClick={() => {
          setIsMenuOpen(true);
          setActiveEditing(activeClass);
        }}>
        <FontAwesomeIcon icon={faEllipsis} />
      </button>
      <div ref={menuRef} className={isMenuOpen ? "block" : "hidden"}>
        <Dropdown
          className="right-2 top-7"
          type="class"
          handleEditClick={() => {
            setIsDeleting(false);
            setIsClassFormOpen(true);
          }}
          handleDeleteClick={() => {
            setIsDeleting(true);
            setIsClassFormOpen(true);
          }}
        />
      </div>
    </div>
  );
};

export default SidebarLink;
