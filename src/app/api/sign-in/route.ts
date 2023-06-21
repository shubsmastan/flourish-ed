import { NextResponse } from "next/server";
import { User, UserDoc } from "@/models/User";
import { dbConnect } from "@/libs/dbConnect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const res = NextResponse.next();
  const body = await req.json();
  const { email, password } = body;
  try {
    await dbConnect();
    const foundUser = await User.findOne({ email }).exec();
    let match;
    if (foundUser) {
      match = await bcrypt.compare(password, foundUser.password);
    }
    if (!foundUser || !match) {
      return NextResponse.json(
        {
          errors: ["Incorrect username and password combination."],
        },
        { status: 401 }
      );
    }
    const userObj = await User.findById(foundUser._id)
      .select("-password")
      .lean();
    const accessToken = jwt.sign(userObj as UserDoc, jwt_secret);
    res.cookies.set({ name: "token", value: accessToken });
    const user = { ...userObj, accessToken };
    return NextResponse.json({ user });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { errors: ["Problem signing in."] },
      { status: 500 }
    );
  }
}
