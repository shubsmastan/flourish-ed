import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';
import { dbConnect } from './dbConnect';
import { User } from '@/models/User';

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/',
		error: '/',
		signOut: '/',
		// verifyRequest: '/auth/verify-request', // (used for check email message)
		// newUser: '/auth/new-user', // New users will be directed here on first sign in
	},
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'Email' },
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			async authorize(credentials) {
				await dbConnect();
				const user = await User.findOne({
					email: credentials?.email,
				});
				let match;
				if (user) {
					match = await bcrypt.compare(
						credentials?.password as string,
						user.password
					);
				}
				if (!user || !match) {
					throw new Error(
						'Invalid username and password combination.'
					);
				} else {
					return user;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			await dbConnect();
			const foundUser = await User.findOne({
				email: token.email,
			});

			if (!foundUser) {
				token._id = user!.id;
				return token;
			}

			return {
				_id: foundUser.id,
				firstName: foundUser.firstName,
				lastName: foundUser.lastName,
				email: foundUser.email,
				...token,
			};
		},

		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
	},
};
