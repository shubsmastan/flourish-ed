import { Class } from "@/models/Class";
import { User } from "@/models/User";
import { Lesson } from "@/models/Lesson";
import { dbConnect } from "@/libs/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/libs/jwtHelper";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
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
    await dbConnect();
    const { cid: classId } = params;
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return NextResponse.json(
        { error: "Not a valid class ID." },
        { status: 404 }
      );
    }
    const cls = await Class.findById(classId).populate({
      path: "lessons",
    });
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
        { error: "You are not a member of that class." },
        { status: 403 }
      );
    }
    return NextResponse.json(cls);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error." }), { status: 500 };
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { cid: string } }
) {
  const body = await req.json();
  const { name } = body;
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
    dbConnect();
    const { cid: classId } = params;
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return NextResponse.json(
        { error: "Not a valid class ID." },
        { status: 404 }
      );
    }
    const cls = await Class.findById(classId);
    if (!cls) {
      return NextResponse.json(
        {
          error: "That class does not exist.",
        },
        { status: 404 }
      );
    }
    cls.name = name;
    await cls.save();
    return NextResponse.json(cls);
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
  req: NextRequest,
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
    dbConnect();
    const { cid: classId } = params;
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return NextResponse.json(
        { error: "Not a valid class ID." },
        { status: 404 }
      );
    }
    const cls = await Class.findById(classId);
    if (!cls) {
      return NextResponse.json(
        {
          error: "That class does not exist.",
        },
        { status: 404 }
      );
    }
    const user = await User.findById(verified._id).populate({
      path: "classes",
      model: Lesson,
    });
    user.classes.pull({ _id: classId });
    await user.save();
    cls.teachers.pull({ _id: user._id });
    await cls.save();
    if (cls.teachers.length === 0) await Class.deleteOne({ _id: classId });
    const classes = user.classes;
    return NextResponse.json(classes);
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
