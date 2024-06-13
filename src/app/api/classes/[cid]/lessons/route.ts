import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { dbConnect } from '@/lib/dbConnect';
import { Lesson } from '@/models/Lesson';
import { Class } from '@/models/Class';

const secret = process.env.JWT_SECRET!;

export async function GET(
	req: NextRequest,
	{ params }: { params: { cid: string } }
) {
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
		const { cid: classId } = params;
		if (!classId) {
			return NextResponse.json(
				{
					error: 'Please use a valid class.',
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
		const cls = await Class.findById(classId).populate({ path: 'lessons' });
		if (!cls) {
			return NextResponse.json(
				{
					error: 'That class does not exist.',
				},
				{ status: 404 }
			);
		}
		if (!cls.teachers.includes('6669de10c421d4bf9cbd4b8e')) {
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
	{ params }: { params: { cid: string } }
) {
	const body = await req.json();
	const { date, objective, resources, content, differentiation } = body;
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
		const { cid: classId } = params;
		if (!classId) {
			return NextResponse.json(
				{
					error: 'Please use a valid class.',
				},
				{ status: 400 }
			);
		}
		if (!date) {
			return NextResponse.json(
				{
					error: 'Please provide a date.',
				},
				{ status: 400 }
			);
		}
		if (!objective) {
			return NextResponse.json(
				{
					error: 'Please provide a lesson objective.',
				},
				{ status: 400 }
			);
		}
		if (!content) {
			return NextResponse.json(
				{
					error: 'Please provide lesson content.',
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
					error: 'That class does not exist.',
				},
				{ status: 404 }
			);
		}
		if (!cls.teachers.includes('6669de10c421d4bf9cbd4b8e')) {
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
		};
		const lesson = await Lesson.create(newLesson);
		cls.lessons.push(lesson._id);
		await cls.save();
		return NextResponse.json(cls.lessons);
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: 'Server error.' }, { status: 500 });
	}
}
