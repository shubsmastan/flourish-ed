import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { dbConnect } from '@/lib/dbConnect';
import { Lesson } from '@/models/Lesson';
import { Class } from '@/models/Class';

const secret = process.env.JWT_SECRET!;

export async function GET(
	req: NextRequest,
	{ params }: { params: { classId: string } }
) {
	try {
		const token = await getToken({ req, secret });
		const { classId } = params;
		if (!classId) {
			return NextResponse.json(
				{
					error: 'Please provide a class ID.',
				},
				{ status: 400 }
			);
		}
		if (!mongoose.Types.ObjectId.isValid(classId)) {
			return NextResponse.json(
				{ error: 'Please provide a class ID.' },
				{ status: 404 }
			);
		}
		await dbConnect();
		const cls = await Class.findById(classId).populate({ path: 'lessons' });
		if (!cls) {
			return NextResponse.json(
				{
					error: 'Not a valid class ID.',
				},
				{ status: 404 }
			);
		}
		if (!cls.teachers.includes(token!._id)) {
			return NextResponse.json(
				{
					error: 'You are not authorised to view this class.',
				},
				{ status: 401 }
			);
		}
		return NextResponse.json(cls.lessons);
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

export async function POST(
	req: NextRequest,
	{ params }: { params: { classId: string } }
) {
	const body = await req.json();
	const { date, objective, resources, content, differentiation } = body;
	try {
		const token = await getToken({ req, secret });
		const { classId } = params;
		if (!classId) {
			return NextResponse.json(
				{
					error: 'Please provide a class ID.',
				},
				{ status: 400 }
			);
		}
		if (!date || !objective || !content) {
			return NextResponse.json(
				{
					error: 'Please provide lesson date, objective and content.',
				},
				{ status: 400 }
			);
		}
		if (!mongoose.Types.ObjectId.isValid(classId)) {
			return NextResponse.json(
				{ error: 'Not a valid class ID.' },
				{ status: 404 }
			);
		}
		await dbConnect();
		const cls = await Class.findById(classId);
		if (!cls) {
			return NextResponse.json(
				{
					error: 'Not a valid class ID.',
				},
				{ status: 404 }
			);
		}
		if (!cls.teachers.includes(token!._id)) {
			return NextResponse.json(
				{
					error: 'You are not authorised to change this class.',
				},
				{ status: 401 }
			);
		}
		const newLesson = {
			classId,
			date: new Date(date),
			objective,
			resources,
			content,
			differentiation,
			createdBy: token!._id,
			teachers: [token!._id],
		};
		const lesson = await Lesson.create(newLesson);
		cls.lessons.push(lesson._id);
		await cls.save();
		return NextResponse.json(
			{ message: 'Lesson posted successfully.' },
			{ status: 200 }
		);
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: 'Server error.' }, { status: 500 });
	}
}
