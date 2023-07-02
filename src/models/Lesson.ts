import mongoose, { Document } from "mongoose";
import { ClassDoc } from "./Class";

export interface LessonDoc extends Document {
  classId: ClassDoc;
  date: Date;
  objective: string;
  resources?: string;
  content: string;
  differentiation?: string;
}

const LessonSchema = new mongoose.Schema<LessonDoc>(
  {
    classId: { type: mongoose.Types.ObjectId, ref: "Class", required: true },
    date: { type: Date, required: true },
    objective: { type: String, required: true },
    resources: { type: String },
    content: { type: String, required: true },
    differentiation: { type: String },
  },
  { timestamps: true }
);

export const Lesson =
  mongoose.models.Lesson || mongoose.model<LessonDoc>("Lesson", LessonSchema);
