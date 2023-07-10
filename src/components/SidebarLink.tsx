import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { ClassDoc } from "@/models/Class";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "@/components/Dropdown";

interface SidebarLinkProps {
  activeClass: ClassDoc;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  setIsClassFormOpen: Dispatch<SetStateAction<boolean>>;
  setActiveEditing: Dispatch<SetStateAction<ClassDoc | null>>;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarLink = ({
  activeClass,
  active,
  setActive,
  setIsDeleting,
  setIsClassFormOpen,
  setActiveEditing,
  setSidebarOpen,
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
          setSidebarOpen(false);
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
      <div
        ref={menuRef}
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute right-0 top-8 z-50 w-3/4 rounded-2xl bg-white p-3 text-left text-sm
            drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)]`}>
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
