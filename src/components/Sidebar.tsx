'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import axios from 'axios';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from './ui/navigation-menu';
import ClassForm from './ClassForm';
import { PiPlusBold } from 'react-icons/pi';

export const Sidebar = () => {
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

	if (classes && classes.length > 0)
		classList = classes.map((cls: any) => {
			return (
				<NavigationMenuItem key={cls._id}>
					<NavigationMenuLink asChild>
						<Link href={`/dashboard/classes/${cls._id}`}>
							{cls.name}
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			);
		});
	else if (isLoading)
		classList = (
			<>
				<p>Loading...</p>
			</>
		);
	else
		classList = (
			<>
				<p>Error</p>
			</>
		);

	return (
		<NavigationMenu className='-translate-x-64 h-[calc(100vh-3.5rem)] flex flex-col justify-start border-r-[0.5px] text-sm shadow-md transition-transform duration-200 sm:translate-x-0'>
			<NavigationMenuList className='flex flex-col gap-4 items-start w-64 p-4 justify-start'>
				<NavigationMenuItem className='translate-x-1'>
					<NavigationMenuLink asChild>
						<Link href={`/dashboard`}>Today</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link href={`/dashboard`}>Upcoming</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link href={`/dashboard`}>Last Week</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem className='flex justify-between items-center font-bold mt-5 h-8 w-full'>
					<h3>Your Classes</h3>
					<ClassForm
						trigger={
							<PiPlusBold
								style={{ color: 'white', fontSize: '1rem' }}
							/>
						}
						type='class'
					/>
				</NavigationMenuItem>
				{classList}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
