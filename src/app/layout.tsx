import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { TanstackQueryClient } from '@/components/providers/QueryClientProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { inter } from '@/lib/fonts';
import { AuthSessionProvider } from '@/components/providers/AuthSessionProvider';

export const metadata: Metadata = {
	title: 'FlourishEd | Lesson Planning and Productivity for Teachers',
	description: 'An productivity app for teachers by teachers',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${inter.className} flex flex-col min-h-screen antialiased`}>
				<AuthSessionProvider>
					<TanstackQueryClient>
						<ThemeProvider
							attribute='class'
							defaultTheme='system'
							enableSystem
							disableTransitionOnChange>
							<Header />
							<main className='flex flex-1'>{children}</main>
						</ThemeProvider>
					</TanstackQueryClient>
				</AuthSessionProvider>
			</body>
		</html>
	);
}
