// Calcul de la pertinence d'un projet
export const calculateProjectRelevance = (
	priority: number,
	time: boolean,
	urgent: boolean,
	important: boolean,
	desire: boolean
): string => {
	const relevanceScore =
		priority +
		(time ? 1 : 0) +
		(urgent ? 1 : 0) +
		(important ? 1 : 0) +
		(desire ? 1 : 0);

	if (relevanceScore >= 4) {
		return "Hautement pertinent";
	} else if (relevanceScore >= 2) {
		return "Pertinent";
	} else {
		return "Peu pertinent";
	}
};
