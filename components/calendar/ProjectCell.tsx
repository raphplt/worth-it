import { Button } from "@/components/ui/button";
import ProjectDetails from "@/components/common/ProjectDetails";
import { Project } from "@/type/project";
import { cn } from "@/lib/utils";

interface ProjectCellProps {
	project: Project;
	compact?: boolean;
}

export default function ProjectCell({
	project,
	compact = false,
}: ProjectCellProps) {
	const getPriorityColor = (priority: number) => {
		switch (true) {
			case priority >= 8:
				return "border-l-4 border-l-red-500";
			case priority >= 5:
				return "border-l-4 border-l-orange-500";
			case priority >= 3:
				return "border-l-4 border-l-yellow-500";
			default:
				return "border-l-4 border-l-blue-300";
		}
	};

	return (
		<div
			className={cn(
				"p-2 rounded bg-white border border-blue-200 shadow-sm",
				getPriorityColor(project.priority),
				compact ? "h-full" : ""
			)}
		>
			<div className="text-sm">
				<div className="font-medium truncate">{project.name}</div>
				<div className="flex justify-between items-center mt-1">
					<div className="text-xs text-gray-500">{project.weeklyHours}h/semaine</div>
					<ProjectDetails
						project={project}
						asChild
						trigger={
							<Button
								variant="ghost"
								size="sm"
								className="h-6 w-6 p-0 rounded-full bg-blue-50 hover:bg-blue-100"
							>
								<span className="sr-only">Voir détails</span>
								<span className="text-xs text-blue-600">i</span>
							</Button>
						}
					/>
				</div>
			</div>
		</div>
	);
}
