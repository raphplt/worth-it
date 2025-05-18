import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

// Chemins publics qui ne nécessitent pas d'authentification
const publicPaths = ["/auth/signin", "/auth/error", "/api/auth"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Exclure les routes publiques et de ressources statiques de la vérification d'authentification
	if (
		pathname.startsWith("/_next") ||
		pathname.includes("/api/auth/") ||
		pathname === "/favicon.ico" ||
		publicPaths.some((path) => pathname.startsWith(path))
	) {
		return NextResponse.next();
	}

	const session = await auth();

	if (!session) {
		const signInUrl = new URL("/auth/signin", request.url);
		signInUrl.searchParams.set("callbackUrl", request.url);
		return NextResponse.redirect(signInUrl);
	}

	return NextResponse.next();
}

// Définir les routes qui seront gérées par le middleware
export const config = {
	matcher: [
		/*
		 * Correspondance avec toutes les routes sauf:
		 * - Les fichiers statiques (_next)
		 * - Les routes d'authentification (api/auth)
		 * - favicon.ico
		 */
		"/((?!_next/|api/auth/|favicon.ico).*)",
	],
};
