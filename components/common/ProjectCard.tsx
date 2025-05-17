import React from "react";
import ProjectDetails from "./ProjectDetails";
import { Project } from "@/type/project";
import EditProject from "./EditProject";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreVertical, Trash } from "lucide-react";

type ProjectCardProps = {
	project: Project;
	fetchProjects: () => void;
	handleDelete: (id: number) => void;
};

const ProjectCard = ({
	project,
	fetchProjects,
	handleDelete,
}: ProjectCardProps) => {
	return (
		<div
			key={project.id}
			className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
		>
			<div className="flex justify-between items-start">
				<div>
					<h3 className="font-semibold text-lg">{project.name}</h3>
					{project.description && (
						<p className="text-gray-600 mt-1 line-clamp-2">{project.description}</p>
					)}
				</div>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="ghost" size="sm">
							<MoreVertical className="w-4 h-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="flex flex-col gap-4">
						<ProjectDetails project={project} />
						<EditProject project={project} onProjectUpdated={fetchProjects} />
						<Button
							variant="destructive"
							size="sm"
							onClick={() => handleDelete(project.id)}
						>
							<Trash className="w-4 h-4 mr-2" />
							Supprimer
						</Button>
					</PopoverContent>
				</Popover>
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
				<span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
					{project.relevance}
				</span>
			</div>
		</div>
	);
};

export default ProjectCard;
