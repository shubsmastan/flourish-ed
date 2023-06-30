import { Lesson } from "@/models/Lesson";
import { dbConnect } from "@/libs/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json("respond with a lesson");
}

export async function POST(req: Request) {
  const res = await req.json();
  const { className, date, objective, resources, content, differentiation } =
    res;
  try {
    await dbConnect();
    const newLesson = {
      className,
      date,
      objective,
      resources,
      content,
      differentiation,
    };
    await Lesson.create(newLesson);
    return NextResponse.json(newLesson);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error." });
  }
}
