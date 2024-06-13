'use client';

import { useSession } from 'next-auth/react';
import { Card } from './Card';

export const Main = () => {
	const { data: session, status } = useSession({ required: true });
	const user = session?.user;
	const name = user?.firstName;

	if (status === 'loading') {
		return (
			<div className='flex-1 px-7 py-5 -translate-x-64 sm:translate-x-0'>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div className='flex-1 px-7 py-5'>
			<p className='mb-5'>Hello {name}!</p>
			<div className='grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'></div>
		</div>
	);
};
