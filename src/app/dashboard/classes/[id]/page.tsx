"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ClassDoc } from "@/models/Class";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Class = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const id = user?._id;
  const token = user?.accessToken;

  const [currentClass, setCurrentClass] = useState<ClassDoc | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const classId = window.location.href.split("classes/")[1];
    const getData = async () => {
      try {
        if (!id) return;
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${classId}`,
          { headers: { Authorization: token } }
        );
        setCurrentClass(data);
        setIsFetching(false);
      } catch (err: any) {
        if (err.response) {
          setError(err.response.data.error);
          setIsFetching(false);
          return;
        }
        console.log(err);
        setError("Error fetching class information.");
        setIsFetching(false);
      }
    };
    getData();
  }, [id, token]);

  if (isFetching) {
    return (
      <div className="px-20 py-10">
        <FontAwesomeIcon icon={faSpinner} size="xl" color="#0f172a" spin />
      </div>
    );
  }

  if (!currentClass) {
    return (
      <div className="px-20 py-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="px-20 py-10">
      <h1>{currentClass.name}</h1>
    </div>
  );
};

export default Class;
