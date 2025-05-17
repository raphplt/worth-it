import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Project } from "@/type/project";

interface RawProject {
	id: number;
	name: string;
	description: string;
	weekly_hours: number;
	preferred_days: string | string[];
	preferred_hours: string | string[];
	priority: number;
	relevance: string;
	time: boolean;
	urgent: boolean;
	important: boolean;
	desire: boolean;
	deadline: string;
	created_at?: string;
}

export const useProjects = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchProjects = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/projects");
			if (!response.ok) throw new Error("Failed to fetch projects");
			const data = await response.json();

			const processedData = data.map((project: RawProject) => {
				let preferredDays: string[] = [];
				let preferredHours: string[] = [];

				try {
					if (project.preferred_days) {
						if (typeof project.preferred_days === "string") {
							preferredDays = JSON.parse(project.preferred_days);
						} else if (Array.isArray(project.preferred_days)) {
							preferredDays = project.preferred_days;
						}
					}

					if (project.preferred_hours) {
						if (typeof project.preferred_hours === "string") {
							preferredHours = JSON.parse(project.preferred_hours);
						} else if (Array.isArray(project.preferred_hours)) {
							preferredHours = project.preferred_hours;
						}
					}
				} catch {
					console.error("Error parsing project preferences:", project);
				}

				return {
					id: project.id,
					name: project.name,
					description: project.description || "",
					priority: project.priority || 0,
					relevance: project.relevance || "",
					created_at: project.created_at || new Date().toISOString(),
					time: project.time || false,
					urgent: project.urgent || false,
					important: project.important || false,
					desire: project.desire || false,
					weeklyHours: project.weekly_hours || 0,
					preferredDays,
					preferredHours,
					deadline: project.deadline || "",
				};
			});

			setProjects(processedData);
		} catch (err) {
			console.error("Error fetching projects:", err);
			setError("Erreur lors du chargement des projets");
			toast.error("Erreur lors du chargement des projets");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	return { projects, isLoading, error, fetchProjects };
};
