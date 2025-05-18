import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

export const config = {
	adapter: PrismaAdapter(prisma),
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
		async jwt({ token, user }) {
			if (user && token) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user && token?.id) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
		error: "/auth/error",
	},
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
