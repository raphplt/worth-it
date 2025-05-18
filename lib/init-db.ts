import { initDb } from "./db";
import { initDbSchema } from "./schema";

export async function initDatabase() {
	try {
		await initDbSchema();

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

// initDatabase()
// 	.then((result) => console.log("Initialisation terminée:", result))
// 	.catch((err) => console.error("Erreur:", err));
