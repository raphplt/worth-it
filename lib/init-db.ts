import fs from "fs";
import path from "path";
import { sql } from "@vercel/postgres";

// Fonction pour initialiser la base de données
export async function initDatabase() {
	try {
		// Lire le script SQL
		const sqlScript = fs.readFileSync(
			path.join(process.cwd(), "db-setup.sql"),
			"utf8"
		);

		// Exécuter le script SQL
		await sql.query(sqlScript);

		console.log("✅ Base de données initialisée avec succès");
	} catch (error) {
		console.error(
			"Erreur lors de l'initialisation de la base de données:",
			error
		);
		throw error;
	}
}
