import React, { useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useProjects } from "./hooks/useProjects";
import { useSchedule } from "./hooks/useSchedule";
import CalendarControls from "./CalendarControls";
import DayColumn from "./DayColumn";

export default function WeeklyCalendar() {
	const { projects, isLoading, error } = useProjects();
	const {
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
	} = useSchedule(projects);

	// Memoize the effect callback to prevent unnecessary rerenders
	const initializeSchedule = useCallback(() => {
		if (projects.length > 0) {
			generateSchedule();
		}
	}, [projects.length, generateSchedule]);

	useEffect(() => {
		initializeSchedule();
	}, [initializeSchedule]);

	const handleRegenerate = () => {
		generateSchedule();
		toast.success("Emploi du temps régénéré");
	};

	// Create week label from currentWeek
	const getWeekLabel = () => {
		if (currentWeek.length === 0) return "";

		const startDate = currentWeek[0].date;
		const endDate = currentWeek[6].date;

		const formatter = new Intl.DateTimeFormat("fr-FR", {
			day: "numeric",
			month: "short",
		});

		return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
	};

	// Handle week navigation
	const handlePreviousWeek = () => {
		goToPreviousWeek();
		// We need to regenerate the schedule after changing the week
		setTimeout(() => generateSchedule(), 0);
	};

	const handleNextWeek = () => {
		goToNextWeek();
		setTimeout(() => generateSchedule(), 0);
	};

	const handleCurrentWeek = () => {
		goToCurrentWeek();
		setTimeout(() => generateSchedule(), 0);
	};

	if (isLoading) {
		return <div className="p-4 text-center">Chargement du calendrier...</div>;
	}

	if (error) {
		return <div className="p-4 text-center text-red-500">{error}</div>;
	}

	if (projects.length === 0) {
		return (
			<div className="p-4 text-center">
				Aucun projet à afficher dans le calendrier
			</div>
		);
	}

	return (
		<div>
			<CalendarControls
				projectCount={projects.length}
				onRegenerate={handleRegenerate}
				displayMode={displayMode}
				onToggleDisplayMode={toggleDisplayMode}
				onPreviousWeek={handlePreviousWeek}
				onNextWeek={handleNextWeek}
				onCurrentWeek={handleCurrentWeek}
				currentWeekLabel={getWeekLabel()}
			/>

			{displayMode === "horizontal" ? (
				<div className="space-y-4">
					{currentWeek.map((dayObj) => (
						<DayColumn
							key={dayObj.name}
							day={dayObj.name}
							expandedGroups={expandedGroups}
							toggleGroupExpansion={toggleGroupExpansion}
							getSlotsForDayAndGroup={getSlotsForDayAndGroup}
							hasProjectsInDayGroup={hasProjectsInDayGroup}
							displayMode={displayMode}
							formattedDate={getFormattedDate(dayObj.name)}
							isToday={isToday(dayObj.name)}
						/>
					))}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{currentWeek.map((dayObj) => (
						<div key={dayObj.name} className="border rounded-lg p-3 shadow-sm">
							<DayColumn
								day={dayObj.name}
								expandedGroups={expandedGroups}
								toggleGroupExpansion={toggleGroupExpansion}
								getSlotsForDayAndGroup={getSlotsForDayAndGroup}
								hasProjectsInDayGroup={hasProjectsInDayGroup}
								displayMode={displayMode}
								formattedDate={getFormattedDate(dayObj.name)}
								isToday={isToday(dayObj.name)}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
