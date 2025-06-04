import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";
import NewProject from "@/components/common/NewProject";
import { Project } from "@/type/project";
import ProjectCard from "../common/ProjectCard";

interface ProjectsSectionProps {
	projects: Project[];
	selectedFilter: string;
	onFilterChange: (filter: string) => void;
	onRefresh: () => void;
}

export default function ProjectsSection({
	projects,
	selectedFilter,
	onFilterChange,
	onRefresh,
}: ProjectsSectionProps) {
	const filters = [
		{ key: "all", label: "Tous" },
		{ key: "urgent", label: "Urgents" },
		{ key: "today", label: "Aujourd'hui" },
	];

	return (
		<div className="lg:col-span-2">
			<Card className="border-0 shadow-sm">
				<CardHeader className="pb-4">
					<div className="flex items-center justify-between">
						<CardTitle className="text-xl font-semibold">Projets en cours</CardTitle>
						<div className="flex gap-2">
							{filters.map((filter) => (
								<Button
									key={filter.key}
									variant={selectedFilter === filter.key ? "default" : "ghost"}
									size="sm"
									onClick={() => onFilterChange(filter.key)}
								>
									{filter.label}
								</Button>
							))}
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					{projects.length === 0 ? (
						<div className="text-center py-12">
							<Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								Aucun projet pour le moment
							</h3>
							<p className="text-gray-600 mb-6">
								Créez votre premier projet pour commencer à organiser votre travail.
							</p>
							<NewProject onProjectCreated={onRefresh} />
						</div>
					) : (
						<>
							{projects.slice(0, 6).map((project) => (
								<ProjectCard key={project.id} project={project} />
							))}
							{projects.length > 6 && (
								<Button variant="outline" className="w-full">
									Voir tous les projets ({projects.length})
								</Button>
							)}
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
