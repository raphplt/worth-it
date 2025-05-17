import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Info, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
	id: number;
	name: string;
	description: string;
	priority: number;
	relevance: string;
	time: boolean;
	urgent: boolean;
	important: boolean;
	desire: boolean;
	weeklyHours: number | null;
	preferredDays: string[];
	preferredHours: string[];
	deadline: string | null;
}

interface ProjectDetailsProps {
	project: Project;
	asChild?: boolean;
	trigger?: React.ReactNode;
}

export default function ProjectDetails({
	project,
	asChild = true,
	trigger,
}: ProjectDetailsProps) {
	const getRelevanceColor = (relevance: string) => {
		switch (relevance) {
			case "Hautement pertinent":
				return "bg-green-100 text-green-800 border border-green-300";
			case "Pertinent":
				return "bg-blue-100 text-blue-800 border border-blue-300";
			case "Peu pertinent":
				return "bg-orange-100 text-orange-800 border border-orange-300";
			default:
				return "bg-gray-100 text-gray-800 border border-gray-300";
		}
	};

	const formatDate = (dateString: string | null) => {
		if (!dateString) return "Non définie";

		try {
			const date = new Date(dateString);
			return new Intl.DateTimeFormat("fr-FR", {
				day: "2-digit",
				month: "long",
				year: "numeric",
			}).format(date);
		} catch {
			return dateString || "Non définie";
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild={asChild}>
				{trigger || (
					<Button variant="outline" size="sm">
						<Info className="w-4 h-4 mr-2" />
						Détails
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle className="text-xl flex items-center gap-2">
						{project.name}
						<Badge className={`ml-2 ${getRelevanceColor(project.relevance)}`}>
							{project.relevance}
						</Badge>
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4 mt-4">
					{/* Description */}
					{project.description && (
						<div className="bg-gray-50 p-4 rounded-md">
							<h3 className="font-medium mb-2">Description</h3>
							<p className="text-gray-700">{project.description}</p>
						</div>
					)}

					{/* Caractéristiques */}
					<div>
						<h3 className="font-medium mb-2">Caractéristiques du projet</h3>
						<div className="grid grid-cols-2 gap-x-8 gap-y-2">
							<div className="flex items-center">
								<div
									className={`w-2 h-2 rounded-full ${project.time ? "bg-green-500" : "bg-red-500"} mr-2`}
								></div>
								<span>Temps disponible: {project.time ? "Oui" : "Non"}</span>
							</div>
							<div className="flex items-center">
								<div
									className={`w-2 h-2 rounded-full ${project.urgent ? "bg-green-500" : "bg-gray-300"} mr-2`}
								></div>
								<span>Urgent: {project.urgent ? "Oui" : "Non"}</span>
							</div>
							<div className="flex items-center">
								<div
									className={`w-2 h-2 rounded-full ${project.important ? "bg-green-500" : "bg-gray-300"} mr-2`}
								></div>
								<span>Important: {project.important ? "Oui" : "Non"}</span>
							</div>
							<div className="flex items-center">
								<div
									className={`w-2 h-2 rounded-full ${project.desire ? "bg-green-500" : "bg-gray-300"} mr-2`}
								></div>
								<span>Motivation: {project.desire ? "Oui" : "Non"}</span>
							</div>
						</div>
					</div>

					{/* Planning */}
					<div>
						<h3 className="font-medium mb-2">Planning</h3>
						<div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
							<div className="flex items-start gap-2">
								<Calendar className="w-4 h-4 mt-0.5 text-gray-500" />
								<div>
									<span className="font-medium">Date butoir</span>
									<p>{formatDate(project.deadline)}</p>
								</div>
							</div>
							<div className="flex items-start gap-2">
								<Clock className="w-4 h-4 mt-0.5 text-gray-500" />
								<div>
									<span className="font-medium">Heures par semaine</span>
									<p>{project.weeklyHours || 0} heures</p>
								</div>
							</div>
						</div>
					</div>

					{/* Jours préférés */}
					{project.preferredDays && project.preferredDays.length > 0 && (
						<div>
							<h3 className="font-medium mb-2">Jours préférés</h3>
							<div className="flex flex-wrap gap-2">
								{project.preferredDays.map((day) => (
									<Badge key={day} variant="outline">
										{day}
									</Badge>
								))}
							</div>
						</div>
					)}

					{/* Créneaux horaires */}
					{project.preferredHours && project.preferredHours.length > 0 && (
						<div>
							<h3 className="font-medium mb-2">Créneaux horaires</h3>
							<div className="flex flex-wrap gap-2">
								{project.preferredHours.map((hour) => (
									<Badge key={hour} variant="outline">
										{hour}
									</Badge>
								))}
							</div>
						</div>
					)}
				</div>

				<div className="mt-6 flex justify-end">
					<DialogClose asChild>
						<Button>Fermer</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}
