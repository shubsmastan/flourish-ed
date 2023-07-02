import mongoose, { Document } from "mongoose";
import { ClassDoc } from "./Class";

export interface UserDoc extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  classes: ClassDoc[];
}

const UserSchema = new mongoose.Schema<UserDoc>(
  {
    firstName: { type: String, required: true, minLength: 1 },
    lastName: { type: String, required: true, minLength: 1 },
    email: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
    },
    password: { type: String, required: true, minLength: 8 },
    classes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Class",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<UserDoc>("User", UserSchema);
