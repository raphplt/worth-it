import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import type { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";

type PrismaClientWithExtensions = PrismaClient & {
	[key: string]: unknown;
};

const prismaClient = prisma as PrismaClientWithExtensions;
const prismaAdapter = PrismaAdapter(prismaClient);

export const config = {
	adapter: prismaAdapter,
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (user) {
				token.id = user.id;
			}
			if (account) {
				token.provider = account.provider;
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id;
				session.user.provider = token.provider;
			}
			return session;
		},
		async signIn() {
			return true;
		},
	},
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
		error: "/auth/error",
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
	},
	cookies: {
		sessionToken: {
			name: `__Secure-next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: true,
			},
		},
		callbackUrl: {
			name: `__Secure-next-auth.callback-url`,
			options: {
				sameSite: "lax",
				path: "/",
				secure: true,
			},
		},
		csrfToken: {
			name: `__Host-next-auth.csrf-token`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: true,
			},
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);