import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { quotes } from '@/data/quotes';

export const Main = async () => {
	const session = await getServerSession(authOptions);
	const user = session?.user;

	const quote = quotes[Math.floor(Math.random() * quotes.length)];

	return (
		<div className='flex-1 px-7 py-5'>
			<Suspense fallback={<p>Loading...</p>}>
				<div className='mb-5 border-b-[0.5px] border-b-slate-500'>
					<h1 className='text-sm'>Hi {user?.firstName}!</h1>
					<p className='mb-2 text-lg font-semibold'>{quote}</p>
				</div>
				<div className='grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'></div>
			</Suspense>
		</div>
	);
};
