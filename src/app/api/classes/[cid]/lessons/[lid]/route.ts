import { Lesson } from "@/models/Lesson";
import { dbConnect } from "@/libs/dbConnect";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/libs/jwtHelper";
import { Class } from "@/models/Class";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { cid: string; lid: string } }
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
    const { cid: classId, lid: lessonId } = params;
    if (!classId) {
      return NextResponse.json(
        {
          error: "Please use a valid class.",
        },
        { status: 400 }
      );
    }
    if (!lessonId) {
      return NextResponse.json(
        {
          error: "Please use a valid lesson.",
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
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return NextResponse.json(
        { error: "Not a valid lesson ID." },
        { status: 404 }
      );
    }
    await dbConnect();
    const cls = await Class.findById(classId);
    const lesson = await Lesson.findById(lessonId);
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
    if (!lesson || !cls.lessons.includes(lessonId)) {
      return NextResponse.json(
        {
          error: "That lesson does not exist.",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(lesson);
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

export async function PUT(
  req: Request,
  { params }: { params: { cid: string; lid: string } }
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
    const { cid: classId, lid: lessonId } = params;
    if (!classId) {
      return NextResponse.json(
        {
          error: "Please use a valid class.",
        },
        { status: 400 }
      );
    }
    if (!lessonId) {
      return NextResponse.json(
        {
          error: "Please use a valid lesson.",
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
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return NextResponse.json(
        { error: "Not a valid lesson ID." },
        { status: 404 }
      );
    }
    await dbConnect();
    const cls = await Class.findById(classId);
    const lesson = await Lesson.findById(lessonId);
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
    if (!lesson || !cls.lessons.includes(lessonId)) {
      return NextResponse.json(
        {
          error: "That lesson does not exist.",
        },
        { status: 404 }
      );
    }
    lesson.date = date;
    lesson.objective = objective;
    lesson.resources = resources;
    lesson.content = content;
    lesson.differentiation = differentiation;
    await lesson.save();
    return NextResponse.json(lesson);
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

export async function DELETE(
  req: Request,
  { params }: { params: { cid: string; lid: string } }
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
    const { cid: classId, lid: lessonId } = params;
    if (!classId) {
      return NextResponse.json(
        {
          error: "Please use a valid class.",
        },
        { status: 400 }
      );
    }
    if (!lessonId) {
      return NextResponse.json(
        {
          error: "Please use a valid lesson.",
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
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return NextResponse.json(
        { error: "Not a valid lesson ID." },
        { status: 404 }
      );
    }
    await dbConnect();
    const cls = await Class.findById(classId);
    const lesson = await Lesson.findById(lessonId);
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
    if (!lesson || !cls.lessons.includes(lessonId)) {
      return NextResponse.json(
        {
          error: "That lesson does not exist.",
        },
        { status: 404 }
      );
    }
    cls.lessons.pull(lessonId);
    await cls.save;
    await Lesson.deleteOne({ _id: lessonId });
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
