import { Lesson } from "@/models/Lesson";
import { dbConnect } from "@/libs/dbConnect";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/libs/jwtHelper";
import { Class } from "@/models/Class";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { cid: string } }
) {
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
    const { cid: classId } = params;
    if (!classId) {
      return NextResponse.json(
        {
          error: "Please use a valid class.",
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
    const cls = await Class.findById(classId).populate({ path: "lessons" });
    if (!cls) {
      return NextResponse.json(
        {
          error: "That class does not exist.",
        },
        { status: 404 }
      );
    }
    if (!cls.teachers.includes(verified._id)) {
      return NextResponse.json(
        {
          error: "You are not authorised to view this class.",
        },
        { status: 401 }
      );
    }
    return NextResponse.json(cls.lessons);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Server error.",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { cid: string } }
) {
  const body = await req.json();
  const { date, objective, resources, content, differentiation } = body;
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
    const { cid: classId } = params;
    if (!classId) {
      return NextResponse.json(
        {
          error: "Please use a valid class.",
        },
        { status: 400 }
      );
    }
    if (!date) {
      return NextResponse.json(
        {
          error: "Please provide a date.",
        },
        { status: 400 }
      );
    }
    if (!objective) {
      return NextResponse.json(
        {
          error: "Please provide a lesson objective.",
        },
        { status: 400 }
      );
    }
    if (!content) {
      return NextResponse.json(
        {
          error: "Please provide lesson content.",
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
    if (!cls.teachers.includes(verified._id)) {
      return NextResponse.json(
        {
          error: "You are not authorised to change this class.",
        },
        { status: 401 }
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
