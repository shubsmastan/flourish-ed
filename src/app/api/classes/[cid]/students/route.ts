import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/dbConnect';
import { Class } from '@/models/Class';
import { Student } from '@/models/Student';
import { getToken } from 'next-auth/jwt';

const secret = process.env.JWT_SECRET!;

export async function GET(
	req: NextRequest,
	{ params }: { params: { cid: string } }
) {
	try {
		const token = await getToken({ req, secret });
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
		const cls = await Class.findById(classId).populate({
			path: 'students',
		});
		if (!cls) {
			return NextResponse.json(
				{
					error: 'That class does not exist.',
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
		return NextResponse.json(cls.students);
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
	const { name } = body;
	try {
		const token = await getToken({ req, secret });
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
		if (!name) {
			return NextResponse.json(
				{
					error: 'Name is required.',
				},
				{ status: 400 }
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
		if (!cls.teachers.includes(token!._id)) {
			return NextResponse.json(
				{
					error: 'You are not authorised to change this class.',
				},
				{ status: 401 }
			);
		}
		const newStudent = {
			name,
			classId,
			assessments: [],
		};
		const student = await Student.create(newStudent);
		cls.students.push(student._id);
		await cls.save();
		return NextResponse.json(cls.students);
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: 'Server error.' }, { status: 500 });
	}
}
