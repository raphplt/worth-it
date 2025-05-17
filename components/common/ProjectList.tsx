import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Project } from "@/type/project";
import ProjectCard from "./ProjectCard";

export default function ProjectList() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Catégorisation des projets
	const [upcomingProjects, setUpcomingProjects] = useState<Project[]>([]);
	const [currentProjects, setCurrentProjects] = useState<Project[]>([]);
	const [pastProjects, setPastProjects] = useState<Project[]>([]);

	const fetchProjects = async () => {
		try {
			const response = await fetch("/api/projects");
			if (!response.ok) throw new Error("Failed to fetch projects");
			const data = await response.json();

			interface RawProject {
				id: number;
				name: string;
				description: string;
				priority: number;
				relevance: string;
				created_at: string;
				weekly_hours: number;
				preferred_days: string | string[];
				preferred_hours: string | string[];
				time: boolean;
				urgent: boolean;
				important: boolean;
				desire: boolean;
				deadline: string;
			}

			const processedData = data.map((project: RawProject) => ({
				...project,
				preferredDays: project.preferred_days
					? typeof project.preferred_days === "string"
						? JSON.parse(project.preferred_days)
						: project.preferred_days
					: [],
				preferredHours: project.preferred_hours
					? typeof project.preferred_hours === "string"
						? JSON.parse(project.preferred_hours)
						: project.preferred_hours
					: [],
				weeklyHours: project.weekly_hours || 0,
			}));

			setProjects(processedData);
			categorizeProjects(processedData);
		} catch (error) {
			console.error("Error fetching projects:", error);
			toast.error("Erreur lors du chargement des projets");
		} finally {
			setIsLoading(false);
		}
	};

	// Fonction pour catégoriser les projets selon leurs dates
	const categorizeProjects = (projects: Project[]) => {
		const today = new Date();

		const upcoming: Project[] = [];
		const current: Project[] = [];
		const past: Project[] = [];

		projects.forEach((project) => {
			const creationDate = project.created_at
				? new Date(project.created_at)
				: null;
			const deadlineDate = project.deadline ? new Date(project.deadline) : null;

			if (creationDate && creationDate > today) {
				// Projet futur (date de création pas encore atteinte)
				upcoming.push(project);
			} else if (deadlineDate && deadlineDate < today) {
				// Projet passé (date d'échéance dépassée)
				past.push(project);
			} else {
				// Projet en cours (entre date de création et date d'échéance)
				current.push(project);
			}
		});

		// Tri par priorité
		const sortByPriority = (a: Project, b: Project) => b.priority - a.priority;

		setUpcomingProjects(upcoming.sort(sortByPriority));
		setCurrentProjects(current.sort(sortByPriority));
		setPastProjects(past.sort(sortByPriority));
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	const handleDelete = async (id: number) => {
		if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

		try {
			const response = await fetch(`/api/projects?id=${id}`, {
				method: "DELETE",
			});

			if (!response.ok) throw new Error("Failed to delete project");

			toast.success("Projet supprimé avec succès");
			fetchProjects();
		} catch (error) {
			console.error("Error deleting project:", error);
			toast.error("Erreur lors de la suppression du projet");
		}
	};

	if (isLoading) {
		return <div>Chargement des projets...</div>;
	}

	if (projects.length === 0) {
		return <p className="text-gray-500">Aucun projet pour le moment</p>;
	}

	return (
		<div className="space-y-6">
			{/* Projets en cours */}
			<div>
				<h3 className="text-lg font-medium mb-2 text-green-700">
					Projets en cours
				</h3>
				{currentProjects.length > 0 ? (
					<div className="space-y-4">
						{currentProjects.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								fetchProjects={fetchProjects}
								handleDelete={handleDelete}
							/>
						))}
					</div>
				) : (
					<p className="text-sm text-gray-500">Aucun projet en cours</p>
				)}
			</div>

			{/* Projets à venir */}
			<div>
				<h3 className="text-lg font-medium mb-2 text-blue-700">Projets à venir</h3>
				{upcomingProjects.length > 0 ? (
					<div className="space-y-4">
						{upcomingProjects.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								fetchProjects={fetchProjects}
								handleDelete={handleDelete}
							/>
						))}
					</div>
				) : (
					<p className="text-sm text-gray-500">Aucun projet à venir</p>
				)}
			</div>

			{/* Projets terminés */}
			<div>
				<h3 className="text-lg font-medium mb-2 text-gray-700">Projets terminés</h3>
				{pastProjects.length > 0 ? (
					<div className="space-y-4 opacity-70">
						{pastProjects.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								fetchProjects={fetchProjects}
								handleDelete={handleDelete}
							/>
						))}
					</div>
				) : (
					<p className="text-sm text-gray-500">Aucun projet terminé</p>
				)}
			</div>
		</div>
	);
}
