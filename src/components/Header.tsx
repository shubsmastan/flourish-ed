import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';
import { josefinSans } from '@/lib/fonts';

export const Header = () => {
	return (
		<header className='flex justify-between p-2 border-b-[0.5px] border-b-slate-600 h-14'>
			<div className='flex gap-2 rounded-lg items-center justify-center px-4 pb-2 pt-1 text-white bg-primary'>
				<Image src={'/logo.png'} width={25} height={25} alt='' />
				<h1
					className={`text-lg font-semibold mt-1 ${josefinSans.className}`}>
					FlourishEd
				</h1>
			</div>
			<ThemeToggle />
		</header>
	);
};
