// Calcul de la pertinence d'un projet
export const calculateProjectRelevance = (
	priority: number,
	time: boolean,
	urgent: boolean,
	important: boolean,
	desire: boolean
): string => {
	// Normaliser la priorité qui est de 0 à 100 en une valeur entre 0 et 2
	const normalizedPriority = (priority / 100) * 2;

	const relevanceScore =
		normalizedPriority +
		(time ? 1 : 0) +
		(urgent ? 1 : 0) +
		(important ? 1 : 0) +
		(desire ? 1 : 0);

	console.log("Calcul de pertinence:", {
		priority,
		normalizedPriority,
		time,
		urgent,
		important,
		desire,
		relevanceScore,
	});

	if (relevanceScore >= 3) {
		return "Hautement pertinent";
	} else if (relevanceScore >= 1.5) {
		return "Pertinent";
	} else {
		return "Peu pertinent";
	}
};
