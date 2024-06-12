import { Class } from '@/models/Class';
import { Lesson } from '@/models/Lesson';
import { dbConnect } from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
// import { verifyJwt } from '@/lib/jwtHelper';
import { User } from '@/models/User';

export async function GET(_: NextRequest) {
	try {
		// const token = req.headers.get("Authorization");
		// let verified;
		// if (token) {
		//   verified = verifyJwt(token);
		// }
		// if (!token || !verified) {
		//   return NextResponse.json(
		//     {
		//       error: "Not authorised to make this request.",
		//     },
		//     { status: 401 }
		//   );
		// }
		await dbConnect();
		const user = await User.findById('6669de10c421d4bf9cbd4b8e').populate({
			path: 'classes',
			populate: { path: 'lessons', model: Lesson },
		});
		const classes = user.classes;
		return NextResponse.json(classes);
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{
				error: 'Server error.',
			},
			{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	const body = await req.json();
	const { name } = body;
	try {
		// const token = req.headers.get('Authorization');
		// let verified;
		// if (token) {
		// 	verified = verifyJwt(token);
		// }
		// if (!token || !verified) {
		// 	return NextResponse.json(
		// 		{
		// 			error: 'Not authorised to make this request.',
		// 		},
		// 		{ status: 401 }
		// 	);
		// }
		// if (!name) {
		// 	return NextResponse.json(
		// 		{ error: 'Please provide a class name.' },
		// 		{ status: 400 }
		// 	);
		// }
		await dbConnect();
		const foundClass = await Class.findOne({ name });
		if (foundClass) {
			return NextResponse.json(
				{ error: 'A class with that name already exists.' },
				{ status: 400 }
			);
		}
		const user = await User.findById('6669de10c421d4bf9cbd4b8e').populate({
			path: 'classes',
		});
		const newClass = await Class.create({
			name,
			teachers: [user._id],
		});
		user.classes.push(newClass._id);
		await user.save();
		const classes = user.classes;
		return NextResponse.json(classes);
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{
				error: 'Server error.',
			},
			{ status: 500 }
		);
	}
}
