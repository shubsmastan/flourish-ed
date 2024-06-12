'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
} from './ui/navigation-menu';

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

	let classList;

	if (isLoading)
		classList = (
			<>
				<p>Loading...</p>
			</>
		);
	else if (isError)
		classList = (
			<>
				<p>Error</p>
			</>
		);
	else
		classList = classes.map((cls: any) => {
			return (
				<NavigationMenuItem key={cls._id}>
					<Link href={`/dashboard/classes/${cls._id}`}>
						{cls.name}
					</Link>
				</NavigationMenuItem>
			);
		});

	return (
		<NavigationMenu className='-translate-x-64 h-[calc(100vh-3.5rem)] flex flex-col justify-start border-r-[0.5px] text-sm shadow-md transition-transform duration-200 sm:translate-x-0'>
			<NavigationMenuList className='flex flex-col gap-4 items-start w-64 p-4 justify-start'>
				<NavigationMenuItem className='translate-x-1'>
					<Link href={`/dashboard`}>Today</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href={`/dashboard`}>Upcoming</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href={`/dashboard`}>Last Week</Link>
				</NavigationMenuItem>
				<NavigationMenuItem className='font-bold mt-5'>
					Your Classes
				</NavigationMenuItem>
				{classList}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
