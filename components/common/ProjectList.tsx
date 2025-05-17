import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EditProject from "./EditProject";

interface Project {
	id: number;
	name: string;
	description: string;
	priority: number;
	relevance: string;
	created_at: string;
	weeklyHours: number;
	preferredDays: string[];
	preferredHours: string[];
}

export default function ProjectList() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchProjects = async () => {
		try {
			const response = await fetch("/api/projects");
			if (!response.ok) throw new Error("Failed to fetch projects");
			const data = await response.json();
			setProjects(data);
		} catch (error) {
			console.error("Error fetching projects:", error);
			toast.error("Erreur lors du chargement des projets");
		} finally {
			setIsLoading(false);
		}
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
		<div className="space-y-4">
			{projects.map((project) => (
				<div
					key={project.id}
					className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
				>
					<div className="flex justify-between items-start">
						<div>
							<h3 className="font-semibold text-lg">{project.name}</h3>
							<p className="text-gray-600 mt-1">{project.description}</p>
						</div>
						<div className="flex gap-2">
							<EditProject project={project} onProjectUpdated={fetchProjects} />
							<Button
								variant="destructive"
								size="sm"
								onClick={() => handleDelete(project.id)}
							>
								Supprimer
							</Button>
						</div>
					</div>
					<div className="mt-2 flex items-center justify-between">
						<div className="space-y-1">
							<span className="text-sm text-gray-500 block">
								Priorité: {project.priority}%
							</span>
							<span className="text-sm text-gray-500 block">
								Heures/semaine: {project.weeklyHours}h
							</span>
						</div>
						<span className="text-sm font-medium text-blue-600">
							{project.relevance}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}
