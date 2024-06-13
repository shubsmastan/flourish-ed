import {
	Card as UiCard,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export const Card = () => {
	return (
		<UiCard className='shadow-md'>
			<CardHeader>
				<CardDescription>Card Description</CardDescription>
				<CardTitle>Card Title</CardTitle>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</UiCard>
	);
};
