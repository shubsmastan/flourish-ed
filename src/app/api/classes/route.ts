import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Class } from '@/models/Class';
import { Lesson } from '@/models/Lesson';
import { dbConnect } from '@/lib/dbConnect';
import { User } from '@/models/User';

const secret = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
	try {
		const token = await getToken({ req, secret });
		if (!token) {
			return NextResponse.json(
				{
					error: 'Not authorised to make this request.',
				},
				{ status: 401 }
			);
		}
		await dbConnect();
		const user = await User.findById(token._id).populate({
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

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { name } = body;
	try {
		const token = await getToken({ req, secret });
		if (!token) {
			return NextResponse.json(
				{
					error: 'Not authorised to make this request.',
				},
				{ status: 401 }
			);
		}
		if (!name) {
			return NextResponse.json(
				{ error: 'Please provide a class name.' },
				{ status: 400 }
			);
		}
		await dbConnect();
		const user = await User.findById('6669ee73fe2bd993e4932bdd').populate({
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
