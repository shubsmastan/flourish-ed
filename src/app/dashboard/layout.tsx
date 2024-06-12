import { Sidebar } from '@/components/Sidebar';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='w-full flex justify-between'>
			<Sidebar />
			{children}
		</div>
	);
}
