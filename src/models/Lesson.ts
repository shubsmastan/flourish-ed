import mongoose, { ObjectId } from 'mongoose';
import { ClassDoc } from './Class';

export interface LessonDoc {
	_id: ObjectId;
	classId: ClassDoc;
	date: Date;
	objective: string;
	content: string;
	resources?: string;
	differentiation?: string;
	createdBy: ObjectId;
	teachers?: ObjectId[];
}

const LessonSchema = new mongoose.Schema<LessonDoc>(
	{
		classId: {
			type: mongoose.Types.ObjectId,
			ref: 'Class',
			required: true,
		},
		date: { type: Date, required: true },
		objective: { type: String, required: true },
		resources: { type: String },
		content: { type: String, required: true },
		differentiation: { type: String },
		createdBy: { type: mongoose.Types.ObjectId },
		teachers: [{ type: mongoose.Types.ObjectId, ref: 'Teacher' }],
	},
	{ timestamps: true }
);

export const Lesson =
	mongoose.models.Lesson || mongoose.model<LessonDoc>('Lesson', LessonSchema);
