import { Class } from "@/models/Class";
import { dbConnect } from "@/libs/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/libs/jwtHelper";
import { getUserClasses, createUserClass, deleteClass } from "@/libs/dbQuery";

export async function GET(
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
          errors: ["Not authorised to make this request."],
        },
        { status: 401 }
      );
    }
    const classes = await getUserClasses(params.id);
    return NextResponse.json(classes);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        errors: ["Server error."],
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { name } = body;
  try {
    await dbConnect();
    const token = req.headers.get("Authorization");
    let verified;
    if (token) {
      verified = verifyJwt(token);
    }
    if (!token || !verified) {
      return NextResponse.json(
        {
          errors: ["Not authorised to make this request."],
        },
        { status: 401 }
      );
    }
    if (!name) {
      return NextResponse.json(
        { errors: ["Please provide a class name."] },
        { status: 400 }
      );
    }
    const foundClass = await Class.findOne({ name });
    if (foundClass) {
      return NextResponse.json(
        { errors: ["A class with that name already exists."] },
        { status: 400 }
      );
    }
    const classes = await createUserClass(params.id, name);
    return NextResponse.json(classes);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        errors: ["Server error."],
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const classId = searchParams.get("class");
  try {
    dbConnect();
    const token = req.headers.get("Authorization");
    let verified;
    if (token) {
      verified = verifyJwt(token);
    }
    if (!token || !verified) {
      return NextResponse.json(
        {
          errors: ["Not authorised to make this request."],
        },
        { status: 401 }
      );
    }
    if (!classId) {
      return NextResponse.json(
        { errors: ["Please provide id of class to delete."] },
        { status: 400 }
      );
    }
    const classes = await deleteClass(params.id, classId);
    return NextResponse.json(classes);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        errors: ["Server error."],
      },
      { status: 500 }
    );
  }
}
