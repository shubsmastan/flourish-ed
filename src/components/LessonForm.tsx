"use client";

import { useState, useEffect } from "react";

// type LessonFormProps = {
//   lesson: LessonProps | null;
//   handleSaveLesson: HandleFunction;
//   handleCancelEdit: HandleFunction;
// };

const LessonForm = () => {
  const [lessonData, setLessonData] = useState({
    date: "",
    objective: "",
    content: "",
    resources: "",
    differentiation: "",
  });

  // useEffect(() => {
  //   if (lesson) {
  //     setLessonData(lesson);
  //   } else {
  //     setLessonData({
  //       date: new Date().toISOString().split("T")[0],
  //       objective: "",
  //       content: "",
  //       resources: "",
  //       differentiation: "",
  //     });
  //   }
  // }, [lesson]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setLessonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {/* <h2>{lesson ? "Edit Lesson" : "Add Lesson"}</h2> */}
      <form className="">
        <label>Date:</label>
        <input
          required
          type="date"
          name="date"
          value={lessonData.date}
          onChange={handleInputChange}
        />

        <label>Learning Objective:</label>
        <input
          required
          type="text"
          name="objective"
          value={lessonData.objective}
          onChange={handleInputChange}
        />

        <label>Lesson Content:</label>
        <textarea
          required
          name="content"
          value={lessonData.content}
          onChange={handleInputChange}></textarea>

        <label>Resources:</label>
        <textarea
          required
          name="resources"
          value={lessonData.resources}
          onChange={handleInputChange}></textarea>

        <label>Differentiation/Notes:</label>
        <textarea
          required
          name="differentiation"
          value={lessonData.differentiation}
          onChange={handleInputChange}></textarea>

        <div className="">
          <button className="btn-primary" onClick={() => {}}>
            Save
          </button>
          <button className="btn-primary" onClick={() => {}}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default LessonForm;
