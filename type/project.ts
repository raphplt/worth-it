export interface Project {
	id: number;
	name: string;
	description: string;
	priority: number;
	relevance: string;
	created_at: string;
	weeklyHours: number;
	preferredDays: string[];
	preferredHours: string[];
	time: boolean;
	urgent: boolean;
	important: boolean;
	desire: boolean;
	deadline: string;
	completedHours: number;
	status: "active" | "completed";
}
