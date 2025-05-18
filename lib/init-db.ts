import { initDb } from "./db";
import { initDbSchema } from "./schema";

export async function initDatabase() {
	try {
		// Initialiser les tables pour l'authentification et les sessions
		await initDbSchema();

		// Initialiser les tables pour les projets
		await initDb();

		return { success: true };
	} catch (error) {
		console.error(
			"Erreur lors de l'initialisation complète de la base de données:",
			error
		);
		return { success: false, error };
	}
}

// Pour exécuter l'initialisation de la DB manuellement, décommentez ceci:
// initDatabase()
//   .then(result => console.log('Initialisation terminée:', result))
//   .catch(err => console.error('Erreur:', err));
