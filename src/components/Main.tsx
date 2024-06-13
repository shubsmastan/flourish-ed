'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { quotes } from '@/data/quotes';
import { Card } from '@/components/Card';

export const Main = () => {
	const { data: session } = useSession();
	const user = session?.user;
	const { classId } = useParams();

	const isMainDashboard = !classId;

	const [quoteIndex, setQuoteIndex] = useState(0);

	useEffect(() => {
		isMainDashboard &&
			setQuoteIndex(Math.floor(Math.random() * quotes.length));
	}, [isMainDashboard]);

	const {
		data: lessons,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['classes', classId],
		queryFn: async () => {
			let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/`;
			if (classId) url = url + classId + '/lessons';
			const { data } = await axios.get(url);
			return data;
		},
	});

	const getLessonCards = () => {
		if (error) {
			console.log(error);
			return <p>Error</p>;
		} else if (isLoading) return <p>Loading...</p>;
		else if (lessons.length === 0)
			return <li>No lessons in this class.</li>;
		else {
			const lessonList = lessons.map((lesson: any) => {
				return <Card key={lesson._id} lesson={lesson} />;
			});
			return lessonList;
		}
	};

	const lessonCards = getLessonCards();

	return (
		<div className='flex-1 px-7 py-5'>
			<div className='mb-5 border-b-[0.5px] border-b-slate-500'>
				{isMainDashboard && (
					<p className='text-sm'>Hi {user?.firstName}</p>
				)}
				<h1 className='mb-2 text-lg font-semibold'>
					{isMainDashboard ? quotes[quoteIndex] : classId}
				</h1>
			</div>
			<div className='grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
				{lessonCards}
			</div>
		</div>
	);
};
