import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { sql } from "./db";

export const authOptions: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const result = await sql`
					SELECT * FROM users WHERE email = ${credentials.email}
				`;

				const user = result.rows[0];

				if (!user) {
					return null;
				}

				const passwordMatch = await bcrypt.compare(
					credentials.password,
					user.password
				);

				if (!passwordMatch) {
					return null;
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
				};
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === "github") {
				try {
					const result = await sql`
						SELECT * FROM users WHERE email = ${user.email}
					`;

					if (result.rows.length === 0) {
						await sql`
							INSERT INTO users (id, name, email, password)
							VALUES (${crypto.randomUUID()}, ${user.name}, ${user.email}, '')
						`;
					}
					return true;
				} catch (error) {
					console.error("Erreur lors de la connexion avec GitHub:", error);
					return false;
				}
			}
			return true;
		},
	},
};
