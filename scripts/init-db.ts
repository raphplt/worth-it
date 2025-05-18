import { Pool } from "pg";
import { readFileSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL,
});

async function initDatabase() {
	try {
		const schemaPath = join(process.cwd(), "lib", "db", "schema.sql");
		const schema = readFileSync(schemaPath, "utf8");

		await pool.query(schema);
		console.log("Base de données initialisée avec succès");
	} catch (error) {
		console.error(
			"Erreur lors de l'initialisation de la base de données:",
			error
		);
		process.exit(1);
	} finally {
		await pool.end();
	}
}

initDatabase();
