import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/Header';
import { inter } from '@/lib/fonts';
import { TanstackQueryClient } from '@/components/query-client-provider';

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
		<html lang='en' suppressHydrationWarning>
			<body className={`${inter.className} h-screen`}>
				<TanstackQueryClient>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange>
						<Header />
						<main className='flex items-center h-[calc(100%-3.5rem)]'>
							{children}
						</main>
					</ThemeProvider>
				</TanstackQueryClient>
			</body>
		</html>
	);
}
