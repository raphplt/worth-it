import { z } from "zod";
import bcrypt from "bcrypt";
import { pool } from "./db";

const registerSchema = z.object({
	name: z.string().min(1, "Le nom est requis"),
	email: z.string().email("Email invalide"),
	password: z
		.string()
		.min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export type RegisterData = z.infer<typeof registerSchema>;

export async function registerUser(data: RegisterData) {
	try {
		const { name, email, password } = registerSchema.parse(data);

		const { rows: existingUsers } = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);

		if (existingUsers.length > 0) {
			return {
				success: false,
				error: "Un utilisateur avec cet email existe déjà",
			};
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const { rows } = await pool.query(
			"INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
			[name, email, hashedPassword]
		);

		return {
			success: true,
			user: {
				id: rows[0].id,
				name: rows[0].name,
				email: rows[0].email,
			},
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				success: false,
				error: error.errors,
			};
		}

		console.error("Erreur lors de l'inscription:", error);
		return {
			success: false,
			error: "Une erreur est survenue lors de l'inscription",
		};
	}
}
