import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { dbConnect } from "@/libs/dbConnect";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, email, password } = body;
  try {
    await dbConnect();
    const userExists = await User.findOne({ email }).exec();
    if (userExists) {
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPwd = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPwd,
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "There was a problem. Please try again.",
      },
      { status: 500 }
    );
  }
}
