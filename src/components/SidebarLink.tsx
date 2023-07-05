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
    <li
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
        <li>{activeClass.name}</li>
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
        className={`absolute right-2 top-7 z-50 w-36 rounded-2xl bg-white p-4
                text-left text-sm drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)]
                ${isMenuOpen ? "block" : "hidden"}`}>
        <button
          className="mb-3 block"
          onClick={() => {
            setIsDeleting(false);
            setIsClassFormOpen(true);
          }}>
          Edit class name
        </button>
        <button
          className="block"
          onClick={() => {
            setIsDeleting(true);
            setIsClassFormOpen(true);
          }}>
          Delete class
        </button>
      </div>
      {/* <button
                  className="text-rose-800 hover:text-red-500"
                  onClick={() => deleteClass(c._id)}>
                  &times;
                </button> */}
    </li>
  );
};

export default SidebarLink;
