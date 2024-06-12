import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/Header';
import { inter } from '@/lib/fonts';

export const metadata: Metadata = {
	title: 'FlourishEd',
	description: 'An productivity app for teachers by teachers',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} h-screen`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					<Header />
					<main className='flex flex-1 flex-col items-center justify-center gap-4 h-[calc(100%-3.5rem)]'>
						{children}
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
