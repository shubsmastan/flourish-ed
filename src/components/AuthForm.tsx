'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import Loading from "./Loading";

export const AuthForm = () => {
	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const { push } = useRouter();

	const logIn = async (
		e: React.MouseEvent<HTMLButtonElement>,
		guest: boolean
	) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			setOpen(true);
			const res = await signIn('credentials', {
				email: guest ? 'guest' : email,
				password: guest ? 'guest123' : pwd,
				redirect: false,
				callbackUrl: '/dashboard',
			});
			if (res?.error) {
				setIsLoading(false);
				setOpen(false);
				setError('Invalid username and password combination.');
				return;
			}
			setIsLoading(false);
			setOpen(false);
			push('/dashboard');
		} catch (err) {
			setIsLoading(false);
			setOpen(false);
			setError('Something went wrong, please try again.');
			console.log(err);
		}
	};

	return (
		<div className='flex flex-col gap-3 justify-centre p-20 text-center max-w-96'>
			<p>Welcome to FlourishEd - the productivity app for teachers.</p>
			<p>Please log in to continue.</p>
			<form className='flex flex-col gap-4'>
				<Input
					type='text'
					placeholder='Email'
					// required={true}
					onChange={e => setEmail(e.target.value)}
				/>
				<Input
					type='password'
					placeholder='Password'
					// required={true}
					onChange={e => setPwd(e.target.value)}
				/>
				<Button variant='default' disabled={isLoading}>
					<Link href='/dashboard'>Log In</Link>
				</Button>
				<Button disabled={isLoading}>
					{' '}
					<Link href='/dashboard'>Guest Login</Link>
				</Button>
			</form>
			{error && <p className='mb-1 text-rose-800'>{error}</p>}
			{/* <Loading open={open} /> */}
		</div>
	);
};
