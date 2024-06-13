export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.JWT_SECRET!;

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname; // relative path

	// Rate limiting
	// if (pathname.startsWith('/api')) {
	//   const ip = req.ip ?? '127.0.0.1'
	//   try {
	//     const { success } = await ratelimit.limit(ip)

	//     if (!success) return NextResponse.json({ error: 'Too Many Requests' })
	//     return NextResponse.next()
	//   } catch (error) {
	//     return NextResponse.json({ error: 'Internal Server Error' })
	//   }
	// }

	// Protect routes
	const token = await getToken({ req, secret });

	if (!token) {
		return NextResponse.redirect(new URL('/notfound', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard', '/dashboard/:path*'],
};
