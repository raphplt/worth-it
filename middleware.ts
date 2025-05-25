import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {
	DASHBOARD_ROUTE,
	LANDING_ROUTE,
	SETTINGS_ROUTE,
} from "./helpers/routes";

export default auth((req) => {
	const isLoggedIn = !!req.auth;
	const isOnAuthPage = req.nextUrl.pathname.startsWith("/auth");
	const isOnProtectedRoute =
		req.nextUrl.pathname.startsWith(DASHBOARD_ROUTE) ||
		req.nextUrl.pathname.startsWith(SETTINGS_ROUTE);

	if (!isLoggedIn && isOnProtectedRoute) {
		return NextResponse.redirect(new URL(LANDING_ROUTE, req.url));
	}

	if (isLoggedIn && (isOnAuthPage || req.nextUrl.pathname === LANDING_ROUTE)) {
		return NextResponse.redirect(new URL(DASHBOARD_ROUTE, req.url));
	}

	return NextResponse.next();
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
