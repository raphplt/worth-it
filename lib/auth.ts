import { sql } from "@vercel/postgres";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import crypto from "crypto";

// Schema de validation pour les credentials
const credentialsSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const authOptions: NextAuthOptions = {
	// Note: on n'utilise pas PgAdapter directement ici car il cause des erreurs à l'import dans les routes
	// L'adapter sera configuré dans le fichier route.ts
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Mot de passe", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials) return null;

				try {
					// Valider les credentials
					const { email, password } = credentialsSchema.parse(credentials);

					// Rechercher l'utilisateur dans la base de données
					const result = await sql`
            SELECT * FROM users WHERE email = ${email};
          `;

					const user = result.rows[0];

					if (!user || !user.password) {
						return null;
					}

					// Vérifier le mot de passe
					const passwordMatch = await bcrypt.compare(password, user.password);

					if (!passwordMatch) {
						return null;
					}

					// Retourner l'utilisateur sans le mot de passe
					return {
						id: user.id,
						name: user.name,
						email: user.email,
						image: user.image,
					};
				} catch (error) {
					console.error("Erreur d'authentification:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
};

// Fonctions pour gérer l'inscription d'utilisateur
export async function registerUser(
	name: string,
	email: string,
	password: string
) {
	try {
		// Vérifier si l'utilisateur existe déjà
		const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

		if (existingUser.rows.length > 0) {
			return {
				success: false,
				error: "Cet email est déjà utilisé",
				status: 409,
			};
		}

		// Hachage du mot de passe
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Générer un ID unique
		const id = crypto.randomUUID();

		// Création de l'utilisateur
		await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${id}, ${name}, ${email}, ${hashedPassword})
    `;

		return {
			success: true,
			user: { id, name, email },
			status: 201,
		};
	} catch (error) {
		console.error("Erreur lors de l'inscription:", error);

		if (error instanceof z.ZodError) {
			return {
				success: false,
				error: error.errors,
				status: 400,
			};
		}

		return {
			success: false,
			error: "Une erreur est survenue lors de l'inscription",
			status: 500,
		};
	}
}
