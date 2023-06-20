import { User } from "@/models/User";
import { dbConnect } from "@/libs/dbConnect";
import bcrypt from "bcrypt";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  return NextResponse.json("respond with a user");
}

export async function POST(req: Request) {
  const res = await req.json();
  const { firstName, lastName, email, password } = res;
  try {
    await dbConnect();
    const userExists = await User.findOne({ email }).exec();
    if (userExists) {
      return NextResponse.json({ errors: ["Email already in use."] });
    }
    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("blah blah", salt);
    newUser.password = hash;
    await User.create(newUser);
    return NextResponse.json(newUser);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ errors: ["Problem creating user."] });
  }
}
