import { execSync } from "child_process";

// Fonction pour initialiser la base de données avec Prisma
export async function initDatabase() {
	try {
		execSync("npx prisma migrate deploy", { stdio: "inherit" });
		console.log("✅ Base de données initialisée avec Prisma");
	} catch (error) {
		console.error(
			"Erreur lors de l'initialisation de la base de données avec Prisma:",
			error
		);
		throw error;
	}
}
