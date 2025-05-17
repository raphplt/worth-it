import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Project {
	id: number;
	name: string;
	weeklyHours: number;
	preferredDays: string[];
	preferredHours: string[];
}

interface TimeSlot {
	day: string;
	hour: string;
	project: Project | null;
}

const DAYS = [
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi",
	"Dimanche",
];

const TIME_SLOTS = [
	"9h-10h",
	"10h-11h",
	"11h-12h",
	"14h-15h",
	"15h-16h",
	"16h-17h",
	"17h-18h",
];

export default function WeeklyCalendar() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [schedule, setSchedule] = useState<TimeSlot[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			const response = await fetch("/api/projects");
			if (!response.ok) throw new Error("Failed to fetch projects");
			const data = await response.json();
			setProjects(data);
			generateSchedule(data);
		} catch (error) {
			console.error("Error fetching projects:", error);
			toast.error("Erreur lors du chargement des projets");
		} finally {
			setIsLoading(false);
		}
	};

	const generateSchedule = (projects: Project[]) => {
		// Créer une grille vide
		const emptySchedule: TimeSlot[] = [];
		DAYS.forEach((day) => {
			TIME_SLOTS.forEach((hour) => {
				emptySchedule.push({ day, hour, project: null });
			});
		});

		// Trier les projets par priorité (à implémenter)
		const sortedProjects = [...projects].sort(
			(a, b) => b.weeklyHours - a.weeklyHours
		);

		// Assigner les créneaux
		const newSchedule = [...emptySchedule];
		sortedProjects.forEach((project) => {
			let hoursAssigned = 0;
			const preferredSlots = newSchedule.filter(
				(slot) =>
					project.preferredDays.includes(slot.day) &&
					project.preferredHours.includes(slot.hour) &&
					slot.project === null
			);

			while (hoursAssigned < project.weeklyHours && preferredSlots.length > 0) {
				const randomIndex = Math.floor(Math.random() * preferredSlots.length);
				const slot = preferredSlots[randomIndex];
				const scheduleIndex = newSchedule.findIndex(
					(s) => s.day === slot.day && s.hour === slot.hour
				);
				newSchedule[scheduleIndex].project = project;
				preferredSlots.splice(randomIndex, 1);
				hoursAssigned++;
			}
		});

		setSchedule(newSchedule);
	};

	const handleRegenerate = () => {
		generateSchedule(projects);
		toast.success("Emploi du temps régénéré");
	};

	if (isLoading) {
		return <div>Chargement du calendrier...</div>;
	}

	return (
		<div>
			<div className="flex justify-end mb-4">
				<Button onClick={handleRegenerate}>Régénérer l&apos;emploi du temps</Button>
			</div>
			<div className="grid grid-cols-8 gap-2">
				{/* En-têtes */}
				<div className="col-span-1"></div>
				{DAYS.map((day) => (
					<div
						key={day}
						className="text-center font-semibold p-2 bg-gray-100 rounded"
					>
						{day}
					</div>
				))}

				{/* Créneaux horaires */}
				{TIME_SLOTS.map((timeSlot) => (
					<React.Fragment key={timeSlot}>
						<div className="text-center p-2 bg-gray-50">{timeSlot}</div>
						{DAYS.map((day) => {
							const slot = schedule.find((s) => s.day === day && s.hour === timeSlot);
							return (
								<div
									key={`${day}-${timeSlot}`}
									className={`p-2 rounded ${
										slot?.project ? "bg-blue-100 border border-blue-200" : "bg-gray-50"
									}`}
								>
									{slot?.project && (
										<div className="text-sm">
											<div className="font-medium">{slot.project.name}</div>
											<div className="text-xs text-gray-500">
												{slot.project.weeklyHours}h/semaine
											</div>
										</div>
									)}
								</div>
							);
						})}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}
