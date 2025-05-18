import { sql } from "@vercel/postgres";

export async function initDbSchema() {
	try {
		await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        email_verified TIMESTAMP WITH TIME ZONE,
        image TEXT,
        password TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

		await sql`
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        provider_account_id TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at BIGINT,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        UNIQUE(provider, provider_account_id)
      )
    `;

		await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        session_token TEXT UNIQUE NOT NULL,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires TIMESTAMP WITH TIME ZONE NOT NULL
      )
    `;

		await sql`
      CREATE TABLE IF NOT EXISTS verification_tokens (
        identifier TEXT NOT NULL,
        token TEXT NOT NULL,
        expires TIMESTAMP WITH TIME ZONE NOT NULL,
        UNIQUE(identifier, token)
      )
    `;

		console.log("Schéma de base de données initialisé avec succès");
		return { success: true };
	} catch (error) {
		console.error(
			"Erreur lors de l'initialisation du schéma de la base de données:",
			error
		);
		return { success: false, error };
	}
}
