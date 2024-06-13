'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import axios from 'axios';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import ClassForm from '@/components/ClassForm';
import { Plus } from 'lucide-react';

export const Sidebar = () => {
	// const {
	// 	data: classes,
	// 	isLoading,
	// 	isError,
	// } = useQuery({
	// 	queryKey: ['classes'],
	// 	queryFn: async () => {
	// 		const { data } = await axios.get(
	// 			`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes`
	// 		);
	// 		return data;
	// 	},
	// });

	// const mutation = useMutation({
	// 	mutationFn: () => {},
	// 	onSuccess: () => {
	// 		// Invalidate and refetch
	// 		queryClient.invalidateQueries({ queryKey: ['todos'] });
	// 	},
	// });

	const classes: any[] = [];

	const dashboardMenuItems = ['Today', 'Upcoming', 'Last Week'].map(
		(str: string, index) => (
			<NavigationMenuItem
				key={str}
				className={`${index === 0 && 'translate-x-1'}`}>
				<NavigationMenuLink asChild>
					<Link href={`/dashboard`}>{str}</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>
		)
	);

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
	else if (classes && classes.length === 0)
		classList = <p>You have no classes yet.</p>;
	// else if (isLoading) classList = <p>Loading...</p>;
	else classList = <p>Error</p>;

	return (
		<NavigationMenu className='-translate-x-64 fixed top-14 z-10 flex flex-col justify-start text-sm shadow-md transition-transform duration-200 sm:sticky sm:translate-x-0 bg-slate-100 dark:bg-slate-900'>
			<NavigationMenuList className='flex flex-col gap-4 items-start w-64 p-4 justify-start'>
				{dashboardMenuItems}
				<NavigationMenuItem className='flex justify-between items-center font-bold mt-5 h-8 w-full'>
					<h3>Your Classes</h3>
					<ClassForm
						disabled={false}
						trigger={<Plus size={20} />}
						type='class'
					/>
				</NavigationMenuItem>
				{classList}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
