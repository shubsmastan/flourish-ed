'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
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
				`http://localhost:3000/api/classes`
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
			} flex h-[calc(100vh-3.5rem)] w-64 flex-col p-4 text-sm shadow-md transition-transform duration-200 sm:sticky sm:translate-x-0`}>
			<ul>
				{classes.map((cls: any) => {
					return <li key={cls._id}>{cls.name}</li>;
				})}
			</ul>
		</nav>
	);
};
