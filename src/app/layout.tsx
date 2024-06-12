import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { TanstackQueryClient } from '@/components/utils/QueryClientProvider';
import { ThemeProvider } from '@/components/utils/ThemeProvider';
import { inter } from '@/lib/fonts';
import { AuthSessionProvider } from '@/components/utils/AuthSessionProvider';

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
				<AuthSessionProvider>
					<TanstackQueryClient>
						<ThemeProvider
							attribute='class'
							defaultTheme='system'
							enableSystem
							disableTransitionOnChange>
							<Header />
							<main className='flex items-center justify-center h-[calc(100%-3.5rem)]'>
								{children}
							</main>
						</ThemeProvider>
					</TanstackQueryClient>
				</AuthSessionProvider>
			</body>
		</html>
	);
}
