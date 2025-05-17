import { useState, useCallback } from "react";
import { Project } from "@/type/project";

export interface TimeSlot {
	day: string;
	hour: string;
	project: Project | null;
	date?: Date;
}

export interface TimeGroup {
	name: string;
	slots: string[];
}

export interface CalendarDay {
	name: string;
	date: Date;
}

const getCurrentWeekDates = (): CalendarDay[] => {
	const days = [
		"Lundi",
		"Mardi",
		"Mercredi",
		"Jeudi",
		"Vendredi",
		"Samedi",
		"Dimanche",
	];
	const today = new Date();

	const currentDay = today.getDay();

	const daysToMonday = currentDay === 0 ? 6 : currentDay - 1;

	const monday = new Date(today);
	monday.setDate(today.getDate() - daysToMonday);

	return days.map((dayName, index) => {
		const date = new Date(monday);
		date.setDate(monday.getDate() + index);
		return { name: dayName, date };
	});
};

export const DAYS = [
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi",
	"Dimanche",
];

export const TIME_GROUPS: TimeGroup[] = [
	{
		name: "Matin",
		slots: ["6h-7h", "7h-8h", "8h-9h", "9h-10h", "10h-11h", "11h-12h"],
	},
	{
		name: "Après-midi",
		slots: ["12h-13h", "13h-14h", "14h-15h", "15h-16h", "16h-17h", "17h-18h"],
	},
	{
		name: "Soir",
		slots: ["18h-19h", "19h-20h", "20h-21h", "21h-22h", "22h-23h", "23h-0h"],
	},
];

export const TIME_SLOTS = TIME_GROUPS.flatMap((group) => group.slots);

export const useSchedule = (projects: Project[]) => {
	const [schedule, setSchedule] = useState<TimeSlot[]>([]);
	const [displayMode, setDisplayMode] = useState<"vertical" | "horizontal">(
		"horizontal"
	);
	const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
		Matin: true,
		"Après-midi": true,
		Soir: true,
	});
	const [currentWeek, setCurrentWeek] = useState<CalendarDay[]>(
		getCurrentWeekDates()
	);

	const toggleDisplayMode = useCallback(() => {
		setDisplayMode((prev) => (prev === "vertical" ? "horizontal" : "vertical"));
	}, []);

	const toggleGroupExpansion = useCallback((groupName: string) => {
		setExpandedGroups((prev) => ({
			...prev,
			[groupName]: !prev[groupName],
		}));
	}, []);

	const getFormattedDate = useCallback(
		(day: string) => {
			const dayObj = currentWeek.find((d) => d.name === day);
			if (!dayObj) return "";

			return new Intl.DateTimeFormat("fr-FR", {
				day: "numeric",
				month: "short",
			}).format(dayObj.date);
		},
		[currentWeek]
	);

	const isToday = useCallback(
		(day: string) => {
			const today = new Date();
			const dayObj = currentWeek.find((d) => d.name === day);
			if (!dayObj) return false;

			return (
				dayObj.date.getDate() === today.getDate() &&
				dayObj.date.getMonth() === today.getMonth() &&
				dayObj.date.getFullYear() === today.getFullYear()
			);
		},
		[currentWeek]
	);

	const isProjectInTimeRange = useCallback(
		(project: Project) => {
			// Vérifier si le projet a une date de création et une échéance
			if (!project.created_at || !project.deadline) {
				return true; // Si aucune date n'est spécifiée, on l'affiche par défaut
			}

			const creationDate = new Date(project.created_at);
			const deadlineDate = new Date(project.deadline);

			// Obtenir les dates de début et de fin de la semaine courante
			const weekStartDate = new Date(currentWeek[0].date);
			const weekEndDate = new Date(currentWeek[6].date);
			weekEndDate.setHours(23, 59, 59, 999); // Fin de la journée

			// Un projet est dans l'intervalle si:
			// - La date de création est antérieure ou égale à la fin de la semaine courante
			// ET
			// - La date d'échéance est postérieure ou égale au début de la semaine courante
			return creationDate <= weekEndDate && deadlineDate >= weekStartDate;
		},
		[currentWeek]
	);

	const generateSchedule = useCallback(() => {
		const emptySchedule: TimeSlot[] = [];
		currentWeek.forEach((dayObj) => {
			TIME_SLOTS.forEach((hour) => {
				emptySchedule.push({
					day: dayObj.name,
					hour,
					project: null,
					date: new Date(dayObj.date),
				});
			});
		});

		// Filtrer les projets pour ne garder que ceux dans l'intervalle de dates
		const filteredProjects = projects.filter(isProjectInTimeRange);

		const sortedProjects = [...filteredProjects].sort(
			(a, b) => b.priority - a.priority || b.weeklyHours - a.weeklyHours
		);

		const newSchedule = [...emptySchedule];

		sortedProjects.forEach((project) => {
			let hoursAssigned = 0;

			if (!project.preferredDays?.length || !project.preferredHours?.length) {
				console.warn(
					`Project ${project.id} (${project.name}) has no preferred days or hours`
				);
				return;
			}

			const preferredSlots = newSchedule.filter(
				(slot) =>
					project.preferredDays.includes(slot.day) &&
					project.preferredHours.includes(slot.hour) &&
					slot.project === null
			);

			if (preferredSlots.length === 0 && project.weeklyHours > 0) {
				while (hoursAssigned < project.weeklyHours) {
					const availableSlots = newSchedule.filter((slot) => slot.project === null);
					if (availableSlots.length === 0) {
						break;
					}

					const randomIndex = Math.floor(Math.random() * availableSlots.length);
					const slot = availableSlots[randomIndex];
					const scheduleIndex = newSchedule.findIndex(
						(s) => s.day === slot.day && s.hour === slot.hour
					);

					newSchedule[scheduleIndex].project = project;
					hoursAssigned++;

					if (hoursAssigned >= project.weeklyHours) break;
				}
			} else {
				const slotsCopy = [...preferredSlots];
				while (hoursAssigned < project.weeklyHours && slotsCopy.length > 0) {
					const randomIndex = Math.floor(Math.random() * slotsCopy.length);
					const slot = slotsCopy[randomIndex];
					const scheduleIndex = newSchedule.findIndex(
						(s) => s.day === slot.day && s.hour === slot.hour
					);

					newSchedule[scheduleIndex].project = project;
					slotsCopy.splice(randomIndex, 1);
					hoursAssigned++;
				}
			}
		});

		setSchedule(newSchedule);
	}, [projects, currentWeek, isProjectInTimeRange]);

	const goToPreviousWeek = useCallback(() => {
		setCurrentWeek((prevWeek) => {
			const newWeek = prevWeek.map((day) => {
				const newDate = new Date(day.date);
				newDate.setDate(newDate.getDate() - 7);
				return { ...day, date: newDate };
			});
			return newWeek;
		});
	}, []);

	const goToNextWeek = useCallback(() => {
		setCurrentWeek((prevWeek) => {
			const newWeek = prevWeek.map((day) => {
				const newDate = new Date(day.date);
				newDate.setDate(newDate.getDate() + 7);
				return { ...day, date: newDate };
			});
			return newWeek;
		});
	}, []);

	const goToCurrentWeek = useCallback(() => {
		setCurrentWeek(getCurrentWeekDates());
	}, []);

	const getSlotsForDayAndGroup = useCallback(
		(day: string, groupName: string) => {
			const group = TIME_GROUPS.find((g) => g.name === groupName);
			if (!group) return [];

			return schedule.filter(
				(slot) => slot.day === day && group.slots.includes(slot.hour)
			);
		},
		[schedule]
	);

	const hasProjectsInDayGroup = useCallback(
		(day: string, groupName: string) => {
			const slots = getSlotsForDayAndGroup(day, groupName);
			return slots.some((slot) => slot.project !== null);
		},
		[getSlotsForDayAndGroup]
	);

	return {
		schedule,
		displayMode,
		expandedGroups,
		currentWeek,
		generateSchedule,
		toggleDisplayMode,
		toggleGroupExpansion,
		getSlotsForDayAndGroup,
		hasProjectsInDayGroup,
		getFormattedDate,
		isToday,
		goToPreviousWeek,
		goToNextWeek,
		goToCurrentWeek,
	};
};
