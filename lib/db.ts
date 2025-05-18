import { sql } from "@vercel/postgres";

export async function initDb() {
	try {
		// Table users
		await sql`
			CREATE TABLE IF NOT EXISTS users (
				id TEXT PRIMARY KEY,
				name TEXT,
				email TEXT UNIQUE,
				image TEXT,
				password TEXT
			)
		`;

		// Table projects
		await sql`
			CREATE TABLE IF NOT EXISTS projects (
				id SERIAL PRIMARY KEY,
				name TEXT NOT NULL,
				description TEXT,
				priority INTEGER,
				time BOOLEAN,
				urgent BOOLEAN,
				important BOOLEAN,
				desire BOOLEAN,
				relevance TEXT,
				weekly_hours INTEGER,
				preferred_days TEXT,
				preferred_hours TEXT,
				created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
				user_id TEXT REFERENCES users(id) ON DELETE CASCADE
			)
		`;

		console.log("Base de données initialisée avec succès");
		return { success: true };
	} catch (error) {
		console.error(
			"Erreur lors de l'initialisation de la base de données:",
			error
		);
		return { success: false, error };
	}
}

export { sql };
