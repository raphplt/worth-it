import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
	Calendar,
	Clock,
	AlertCircle,
	Flame,
	MoreHorizontal,
} from "lucide-react";

interface Project {
	id: number;
	name: string;
	description: string;
	priority: number;
	deadline: string;
	progress?: number;
	status: "active" | "completed" | "paused";
	weeklyHours: number;
	completedHours?: number;
	timeSpent?: number;
}

interface ProjectCardProps {
	project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-blue-100 text-blue-800";
			case "completed":
				return "bg-green-100 text-green-800";
			case "paused":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getPriorityIcon = (priority: number) => {
		if (priority >= 80) return <Flame className="w-4 h-4 text-red-500" />;
		if (priority >= 60)
			return <AlertCircle className="w-4 h-4 text-orange-500" />;
		return <Clock className="w-4 h-4 text-blue-500" />;
	};

	return (
		<div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
			<div className="flex items-start justify-between mb-3">
				<div className="flex items-center gap-2">
					{getPriorityIcon(project.priority)}
					<h3 className="font-medium text-gray-900">{project.name}</h3>
					<Badge className={getStatusColor(project.status)}>{project.status}</Badge>
				</div>
				<Button variant="ghost" size="sm">
					<MoreHorizontal className="w-4 h-4" />
				</Button>
			</div>

			<p className="text-sm text-gray-600 mb-4 line-clamp-2">
				{project.description}
			</p>

			<div className="space-y-3">
				<div>
					<div className="flex justify-between text-sm mb-1">
						<span className="text-gray-600">Progression</span>
						<span className="font-medium">{project.progress}%</span>
					</div>
					<Progress value={project.progress} className="h-2" />
				</div>

				<div className="flex items-center justify-between text-sm">
					<div className="flex items-center gap-4">
						<span className="text-gray-600">
							{project.completedHours}h / {project.weeklyHours}h par semaine
						</span>
						{project.deadline && (
							<span className="text-gray-600 flex items-center gap-1">
								<Calendar className="w-3 h-3" />
								{new Date(project.deadline).toLocaleDateString("fr-FR")}
							</span>
						)}
					</div>
					<span className="text-blue-600 font-medium">
						{project.timeSpent}h cette semaine
					</span>
				</div>
			</div>
		</div>
	);
}
