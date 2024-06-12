'use client';

import { useSession } from 'next-auth/react';

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
		<div className='flex-1 px-7 py-5 -translate-x-64 sm:translate-x-0'>
			<p>Hello {name}!</p>
		</div>
	);
};
