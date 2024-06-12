import { Inter, Josefin_Sans } from 'next/font/google';

export const josefinSans = Josefin_Sans({
	weight: ['200', '300', '400', '500', '600'],
	style: ['normal', 'italic'],
	subsets: ['latin-ext'],
});

export const inter = Inter({ subsets: ['latin'] });
