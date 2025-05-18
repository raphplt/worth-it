import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/register", "/api/auth"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isPublicPath = publicPaths.some(
		(path) => pathname === path || pathname.startsWith(`${path}/`)
	);

	if (isPublicPath) {
		return NextResponse.next();
	}

	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});

	if (!token) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("callbackUrl", encodeURI(request.url));
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
