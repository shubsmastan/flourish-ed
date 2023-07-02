import { Lesson } from "@/models/Lesson";
import { dbConnect } from "@/libs/dbConnect";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/libs/jwtHelper";
import { Class } from "@/models/Class";
import mongoose from "mongoose";

export async function GET(req: Request) {
  return NextResponse.json("respond with a lesson");
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = await req.json();
  const { date, objective, resources, content, differentiation } = res;
  try {
    const token = req.headers.get("Authorization");
    let verified;
    if (token) {
      verified = verifyJwt(token);
    }
    if (!token || !verified) {
      return NextResponse.json(
        {
          error: "Not authorised to make this request.",
        },
        { status: 401 }
      );
    }
    const { id: classId } = params;
    console.log(classId);
    if (!classId || !date || !objective || !content) {
      return NextResponse.json(
        {
          error: "Please provide a date, lesson objective and lesson content.",
        },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return NextResponse.json(
        { error: "Not a valid class ID." },
        { status: 404 }
      );
    }
    await dbConnect();
    const cls = await Class.findById(classId);
    if (!cls) {
      return NextResponse.json(
        {
          error: "That class does not exist.",
        },
        { status: 404 }
      );
    }
    const newLesson = {
      classId,
      date: new Date(date),
      objective,
      resources,
      content,
      differentiation,
    };
    const lesson = await Lesson.create(newLesson);
    cls.lessons.push(lesson._id);
    await cls.save();
    return NextResponse.json(cls.lessons);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error." });
  }
}
