import React from "react";
import TimeGroup from "./TimeGroup";
import { TIME_GROUPS, TimeSlot } from "./hooks/useSchedule";
import { cn } from "@/lib/utils";

interface DayColumnProps {
	day: string;
	expandedGroups: Record<string, boolean>;
	toggleGroupExpansion: (groupName: string) => void;
	getSlotsForDayAndGroup: (day: string, groupName: string) => TimeSlot[];
	hasProjectsInDayGroup: (day: string, groupName: string) => boolean;
	displayMode: "vertical" | "horizontal";
	formattedDate?: string;
	isToday?: boolean;
}

export default function DayColumn({
	day,
	expandedGroups,
	toggleGroupExpansion,
	getSlotsForDayAndGroup,
	hasProjectsInDayGroup,
	displayMode,
	formattedDate = "",
	isToday = false,
}: DayColumnProps) {
	const hasAnyProjects = TIME_GROUPS.some((group) =>
		hasProjectsInDayGroup(day, group.name)
	);

	if (!hasAnyProjects && displayMode === "horizontal") {
		return null;
	}

	return (
		<div className="mb-4">
			<div
				className={cn(
					"p-2 rounded mb-2",
					isToday
						? "bg-blue-100 border border-blue-300 font-semibold"
						: "bg-gray-100 font-semibold"
				)}
			>
				<div className="flex items-center justify-between">
					<span>{day}</span>
					{formattedDate && (
						<span className="text-sm text-gray-600">{formattedDate}</span>
					)}
				</div>
			</div>

			<div>
				{TIME_GROUPS.map((group) => (
					<TimeGroup
						key={`${day}-${group.name}`}
						name={group.name}
						day={day}
						slots={getSlotsForDayAndGroup(day, group.name)}
						isExpanded={expandedGroups[group.name]}
						onToggle={() => toggleGroupExpansion(group.name)}
						hasProjects={hasProjectsInDayGroup(day, group.name)}
						displayMode={displayMode}
					/>
				))}
			</div>
		</div>
	);
}
