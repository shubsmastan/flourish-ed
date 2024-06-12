'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';

export const Sidebar = () => {
	const [open, setOpen] = useState(true);

	const {
		data: classes,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['classes'],
		queryFn: async () => {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes`
			);
			return data;
		},
	});

	// const mutation = useMutation({
	// 	mutationFn: () => {},
	// 	onSuccess: () => {
	// 		// Invalidate and refetch
	// 		queryClient.invalidateQueries({ queryKey: ['todos'] });
	// 	},
	// });

	if (isLoading)
		return (
			<>
				<p>Loading...</p>
			</>
		);

	if (isError)
		return (
			<>
				<p>Error</p>
			</>
		);

	return (
		<nav
			className={`${
				open ? 'translate-x-0' : '-translate-x-64'
			} flex h-[calc(100vh-3.5rem)] w-64 flex-col p-2 border-r-[0.5px] text-sm shadow-md transition-transform duration-200 sm:sticky sm:translate-x-0`}>
			<ul>
				<li>
					<Link href={`/dashboard/classes/today`}>Today</Link>
				</li>
				{classes.map((cls: any) => {
					return (
						<li key={cls._id}>
							<Link href={`/dashboard/classes/${cls._id}`}>
								{cls.name}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
