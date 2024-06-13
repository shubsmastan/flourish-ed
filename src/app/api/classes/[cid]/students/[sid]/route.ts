import mongoose from 'mongoose';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { Class } from '@/models/Class';
import { Student } from '@/models/Student';

const secret = process.env.JWT_SECRET!;

export async function GET(
	req: NextRequest,
	{ params }: { params: { cid: string; sid: string } }
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
		const { cid: classId, sid: studentId } = params;
		if (!classId) {
			return NextResponse.json(
				{
					error: 'Please provide a class id.',
				},
				{ status: 400 }
			);
		}
		if (!studentId) {
			return NextResponse.json(
				{
					error: 'Please provide a student id.',
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
		if (!mongoose.Types.ObjectId.isValid(studentId)) {
			return NextResponse.json(
				{ error: 'Not a valid student ID.' },
				{ status: 404 }
			);
		}
		await dbConnect();
		const cls = await Class.findById(classId);
		const student = await Student.findById(studentId);
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
		if (!student || !cls.students.includes(studentId)) {
			return NextResponse.json(
				{
					error: 'That student does not exist.',
				},
				{ status: 404 }
			);
		}
		return NextResponse.json(student);
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

export async function PUT(
	req: NextRequest,
	{ params }: { params: { cid: string; sid: string } }
) {
	const body = await req.json();
	const { name, assessments } = body;
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
		const { cid: classId, sid: studentId } = params;
		if (!classId) {
			return NextResponse.json(
				{
					error: 'Please use a valid class.',
				},
				{ status: 400 }
			);
		}
		if (!studentId) {
			return NextResponse.json(
				{
					error: 'Please provide a student ID.',
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
		if (!mongoose.Types.ObjectId.isValid(studentId)) {
			return NextResponse.json(
				{ error: 'Not a valid student ID.' },
				{ status: 404 }
			);
		}
		await dbConnect();
		const cls = await Class.findById(classId);
		const student = await Student.findById(studentId);
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
		if (!student || !cls.students.includes(studentId)) {
			return NextResponse.json(
				{
					error: 'That student does not exist.',
				},
				{ status: 404 }
			);
		}
		student.name = name;
		if (assessments) student.assessments = assessments;
		await student.save();
		return NextResponse.json(student);
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

export async function DELETE(
	req: Request,
	{ params }: { params: { cid: string; sid: string } }
) {
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
		const { cid: classId, sid: studentId } = params;
		if (!classId) {
			return NextResponse.json(
				{
					error: 'Please use a valid class.',
				},
				{ status: 400 }
			);
		}
		if (!studentId) {
			return NextResponse.json(
				{
					error: 'Please provide a student ID.',
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
		if (!mongoose.Types.ObjectId.isValid(studentId)) {
			return NextResponse.json(
				{ error: 'Not a valid student ID.' },
				{ status: 404 }
			);
		}
		await dbConnect();
		const cls = await Class.findById(classId);
		const student = await Student.findById(studentId);
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
		if (!student || !cls.students.includes(studentId)) {
			return NextResponse.json(
				{
					error: 'That student does not exist.',
				},
				{ status: 404 }
			);
		}
		cls.students.pull(studentId);
		await cls.save;
		await Student.deleteOne({ _id: studentId });
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
