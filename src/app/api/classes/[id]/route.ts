import { Class } from "@/models/Class";
import { User } from "@/models/User";
import { dbConnect } from "@/libs/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/libs/jwtHelper";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
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
    const { id: classId } = params;
    const cls = await Class.findById(classId);
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
  { params }: { params: { id: string } }
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
    const { id: classId } = params;
    const cls = await Class.findById(classId);
    if (!cls) {
      return NextResponse.json(
        {
          error: "That class does not exist.",
        },
        { status: 400 }
      );
    }
    const user = await User.findById(verified._id).populate({
      path: "classes",
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
