#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔄 Suppression des fichiers Prisma...");

// Liste des dossiers et fichiers à supprimer
const toDelete = [
	"prisma",
	".env.example",
	"node_modules/.prisma",
	"node_modules/@prisma",
];

// Suppression des fichiers
for (const item of toDelete) {
	const itemPath = path.join(process.cwd(), item);

	if (fs.existsSync(itemPath)) {
		try {
			console.log(`🗑️ Suppression de ${item}...`);
			fs.rmSync(itemPath, { recursive: true, force: true });
		} catch (error) {
			console.error(`❌ Erreur lors de la suppression de ${item}:`, error);
		}
	}
}

console.log("✅ Nettoyage terminé!");
console.log("");
console.log("🔽 Pour finaliser la migration:");
console.log("1. Exécutez: npm run setup-db");
console.log("2. Redémarrez votre serveur Next.js");
console.log("");
console.log(
	"Vous avez maintenant une application sans Prisma, utilisant @vercel/postgres! 👏"
);
