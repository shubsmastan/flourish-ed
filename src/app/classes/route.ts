import { Class } from "@/models/Class";
import { dbConnect } from "@/libs/dbConnect";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  return NextResponse.json("respond with a class");
}

export async function POST(req: Request) {
  const res = await req.json();
  const { name } = res;
  try {
    await dbConnect();
    const classExists = await Class.findOne({ name }).exec();
    if (classExists) {
      return NextResponse.json({
        errors: ["A class already exists with that name."],
      });
    }
    const newClass = {
      name,
      lessons: [],
      // teachers: [currentUser]
    };
    await Class.create(newClass);
    return NextResponse.json(newClass);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ errors: ["Problem creating class."] });
  }
}
