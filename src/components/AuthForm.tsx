'use client';

import { useEffect, useState } from 'react';
import { useRouter, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const AuthForm = () => {
	const { data: session, status } = useSession();
	const { push } = useRouter();

	useEffect(() => {
		if (session?.user._id) redirect('/dashboard');
		if (!(status === 'loading')) setIsLoading(false);
	}, [session, status]);

	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const logIn = async (
		e: React.MouseEvent<HTMLButtonElement>,
		guest: boolean
	) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const res = await signIn('credentials', {
				email: guest ? 'guest' : email,
				password: guest ? 'guest123' : pwd,
				redirect: false,
				callbackUrl: '/dashboard',
			});
			if (res?.error) {
				setIsLoading(false);
				setError('Invalid username and password combination.');
				return;
			}
			push('/dashboard');
		} catch (err) {
			setIsLoading(false);
			setError('Something went wrong, please try again.');
			console.log(err);
		}
	};

	const form = (
		<>
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
					Log In
				</Button>
				<Button
					onClick={e => {
						logIn(e, true);
					}}
					disabled={isLoading}>
					Guest Login
				</Button>
			</form>
		</>
	);

	return (
		<div className='flex flex-1 justify-center items-center'>
			<div className='flex flex-col gap-3 justify-centre p-20 text-center'>
				{isLoading && <p>Loading...</p>}
				{!isLoading && form}
				{error && (
					<p className='mb-1 text-rose-700 dark:text-rose-300'>
						{error}
					</p>
				)}
			</div>
		</div>
	);
};
