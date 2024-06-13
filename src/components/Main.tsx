import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const Main = async () => {
	const session = await getServerSession(authOptions);
	const user = session?.user;
	const name = user?.firstName;

	return (
		<div className='flex-1 px-7 py-5'>
			<Suspense fallback={<p>Loading...</p>}>
				<p className='mb-5'>Hello {name}!</p>
				<div className='grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'></div>
			</Suspense>
		</div>
	);
};
