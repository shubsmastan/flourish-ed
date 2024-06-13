import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const handler = NextAuth({
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
				const { data } = await axios.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/sign-in`,
					credentials
				);
				const { user } = data;
				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],

	pages: {
		signIn: '/',
		error: '/',
		signOut: '/',
		// verifyRequest: '/auth/verify-request', // (used for check email message)
		// newUser: '/auth/new-user', // New users will be directed here on first sign in
	},

	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},

		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
	},
});

export { handler as GET, handler as POST };
