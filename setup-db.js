#!/usr/bin/env node

require("dotenv").config();
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

async function main() {
	console.log("🔄 Initialisation de la base de données Neon...");

	try {
		// Connexion à la base de données
		const client = new Client({
			connectionString: process.env.POSTGRES_URL,
		});

		await client.connect();
		console.log("✅ Connexion à la base de données établie");

		// Lecture du script SQL
		const sqlScript = fs.readFileSync(
			path.join(process.cwd(), "db-setup.sql"),
			"utf8"
		);

		// Exécution du script SQL
		console.log("🔄 Création des tables...");
		await client.query(sqlScript);

		console.log("✅ Base de données initialisée avec succès!");

		await client.end();
	} catch (error) {
		console.error(
			"❌ Erreur lors de l'initialisation de la base de données:",
			error
		);
		process.exit(1);
	}
}

main();
