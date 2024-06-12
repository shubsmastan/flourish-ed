import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';
import { josefinSans } from '@/lib/fonts';
import Link from 'next/link';

export const Header = () => {
	return (
		<header className='flex justify-between p-2 border-b-[0.5px] h-14'>
			<Link
				href='/'
				className='flex gap-2 rounded-lg items-center justify-center px-4 pb-2 pt-1 text-white bg-primary select-none'>
				<Image src={'/logo.png'} width={25} height={25} alt='' />
				<h1
					className={`text-lg font-semibold mt-1 ${josefinSans.className}`}>
					FlourishEd
				</h1>
			</Link>
			<ThemeToggle />
		</header>
	);
};
