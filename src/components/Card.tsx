import {
	Card as CardUi,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

export const Card = ({ lesson }: { lesson: any }) => {
	return (
		<CardUi className='shadow-md h-72'>
			<CardHeader>
				<CardDescription className='flex gap-2'>
					<CalendarDays size={20} />
					{new Date(lesson.date).toDateString()}
				</CardDescription>
				<CardTitle className='text-md'>{lesson.objective}</CardTitle>
			</CardHeader>
			<CardContent>
				{lesson.resources && (
					<div className='flex flex-col gap-1 mb-1'>
						<h4 className='font-semibold'>Resources</h4>
						<p className='truncate'>{lesson.resources}</p>
					</div>
				)}
				{lesson.differentiation && (
					<div className='flex flex-col gap-1'>
						<h4 className='font-semibold'>Differentiation</h4>
						<p className='truncate'>{lesson.differentiation}</p>
					</div>
				)}
				<div className='flex flex-col gap-1'>
					<h4 className='font-semibold'>Content</h4>
					<p className='truncate'>{lesson.content}</p>
				</div>
			</CardContent>
		</CardUi>
	);
};
