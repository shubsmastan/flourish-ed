'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/utils/ThemeToggle';
import { josefinSans } from '@/lib/fonts';

export const Header = () => {
	return (
		<header className='sticky top-0 z-20 flex justify-between p-2 border-b-[0.5px] h-14 bg-inherit bg-sky-900'>
			<Link
				href='/'
				className='flex gap-2 rounded-lg items-center justify-center select-none'>
				<Image src={'/logo.png'} width={22} height={22} alt='' />
				<h1
					className={`text-lg font-semibold text-white mt-1 ${josefinSans.className}`}>
					FlourishEd
				</h1>
			</Link>
			<ThemeToggle />
		</header>
	);
};
