export const getPriorityName = (priority: number) => {
	if (priority < 1 || priority > 100) {
		return "Invalid priority";
	}
	if (priority <= 20) {
		return "Très Bas";
	} else if (priority <= 40) {
		return "Bas";
	} else if (priority <= 60) {
		return "Moyen";
	} else if (priority <= 80) {
		return "Haut";
	} else {
		return "Très Haut";
	}
};
