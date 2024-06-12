import { NextRequest, NextResponse } from 'next/server';
import { User, UserDoc } from '@/models/User';
import { dbConnect } from '@/lib/dbConnect';
import bcrypt from 'bcrypt';
import { getToken } from 'next-auth/jwt';

const secret = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
	const res = NextResponse.next();
	const body = await req.json();
	const { email, password } = body;
	try {
		await dbConnect();
		const foundUser = await User.findOne({ email });
		let match;
		if (foundUser) {
			match = await bcrypt.compare(password, foundUser.password);
		}
		if (!foundUser || !match) {
			return NextResponse.json(
				{
					error: 'Incorrect username and password combination.',
				},
				{ status: 401 }
			);
		}
		const userObj = await User.findById(foundUser._id)
			.select('-password')
			.lean();
		const token = await getToken({ req, secret });
		res.cookies.set({ name: 'token', value: token as unknown as string });
		const user = { ...userObj, token };
		return NextResponse.json({ user });
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ error: 'Problem signing in.' },
			{ status: 500 }
		);
	}
}
