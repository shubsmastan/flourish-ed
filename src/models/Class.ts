import mongoose, { Document } from 'mongoose';
import { LessonDoc } from './Lesson';
import { UserDoc } from './User';
import { StudentDoc } from './Student';

export interface ClassDoc extends Document {
	_id: string;
	name: string;
	lessons: LessonDoc[];
	teachers: UserDoc[];
	students: StudentDoc[];
}

const ClassSchema = new mongoose.Schema<ClassDoc>(
	{
		name: { type: String, required: true },
		teachers: {
			type: [mongoose.Types.ObjectId],
			ref: 'User',
			default: [],
		},
		lessons: {
			type: [mongoose.Types.ObjectId],
			ref: 'Lesson',
			default: [],
		},
		students: {
			type: [mongoose.Types.ObjectId],
			ref: 'Student',
			default: [],
		},
	},
	{ timestamps: true }
);

export const Class =
	mongoose.models.Class || mongoose.model<ClassDoc>('Class', ClassSchema);
