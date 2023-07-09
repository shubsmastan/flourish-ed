"use-client";

import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";

const UserMenu = ({ logOut, open }: { logOut: () => void; open: boolean }) => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <button className="mb-2 grid grid-cols-[32px,_150px] gap-5 rounded-md px-3 py-2 hover:bg-slate-300">
        <FontAwesomeIcon icon={faUser} size="xl" />
        <span className="block text-left">Logged in as: {user?.firstName}</span>
      </button>
      <button
        onClick={logOut}
        className="mb-2 grid grid-cols-[32px,_150px] gap-5 rounded-md px-3 py-2 hover:bg-slate-300">
        <FontAwesomeIcon icon={faRightToBracket} size="xl" />
        <span className="block text-left">Sign Out</span>
      </button>
    </>
  );
};

export default UserMenu;
