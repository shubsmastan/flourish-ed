import mongoose, { Document } from "mongoose";
import { ClassDoc } from "@/models/Class";

export interface StudentDoc extends Document {
  _id: string;
  name: string;
  classId: ClassDoc;
  assessments: Assessment[];
}

interface Assessment {
  date: Date;
  result: number;
}

const StudentSchema = new mongoose.Schema<StudentDoc>(
  {
    name: { type: String, required: true },
    classId: { type: mongoose.Types.ObjectId, ref: "Class", required: true },
    assessments: [
      {
        date: { type: Date },
        result: { type: Number, min: 0, max: 100 },
      },
    ],
  },
  { timestamps: true }
);

export const Student =
  mongoose.models.Student ||
  mongoose.model<StudentDoc>("Student", StudentSchema);
