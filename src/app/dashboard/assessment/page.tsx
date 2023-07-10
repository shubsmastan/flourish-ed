"use client";

import { useState } from "react";

interface Student {
  name: string;
  class: string;
  assessments: [{ date: Date; score: number }];
}

const Assessment = () => {
  const [students, setStudents] = useState<Student[]>([]);

  return (
    <main className="flex-1 px-7 py-5 text-slate-900">
      <h1 className="text-xl font-semibold">Coming soon!</h1>
    </main>
  );
};

export default Assessment;
