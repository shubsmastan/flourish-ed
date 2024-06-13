'use client';

import { useParams } from 'next/navigation';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const Breadcrumbs = () => {
	const params = useParams();

	const paramArray = params ? Object.keys(params) : [];

	const getBreadcrumbsList = () => {
		if (paramArray.length === 0)
			return (
				<BreadcrumbItem>
					<BreadcrumbPage>Dashboard</BreadcrumbPage>
				</BreadcrumbItem>
			);
		return (
			<>
				<BreadcrumbItem>
					<BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{paramArray.map((param, index) => {
					if (paramArray.length === index + 1) {
						return (
							<>
								<BreadcrumbItem
									key={`breadcrumb-item-${param}`}>
									<BreadcrumbPage>
										{params[param]}
									</BreadcrumbPage>
								</BreadcrumbItem>
							</>
						);
					}
					return (
						<>
							<BreadcrumbItem key={`breadcrumb-item-${param}`}>
								<BreadcrumbLink
									href={`/dashboard/${params[param]}`}>
									{params[param]}
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</>
					);
				})}
			</>
		);
	};

	const breadcrumbsList = getBreadcrumbsList();

	return (
		<Breadcrumb className='mb-5'>
			<BreadcrumbList>{breadcrumbsList}</BreadcrumbList>
		</Breadcrumb>
	);
};
