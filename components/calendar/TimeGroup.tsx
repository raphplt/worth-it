import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TimeSlot } from "./hooks/useSchedule";
import ProjectCell from "./ProjectCell";

interface TimeGroupProps {
	name: string;
	day: string;
	slots: TimeSlot[];
	isExpanded: boolean;
	onToggle: () => void;
	hasProjects: boolean;
	displayMode: "vertical" | "horizontal";
}

export default function TimeGroup({
	name,
	day,
	slots,
	isExpanded,
	onToggle,
	hasProjects,
	displayMode,
}: TimeGroupProps) {
	if (slots.length === 0 || !hasProjects) return null;

	return (
		<div className="mb-2">
			<div className="flex items-center">
				<Button
					variant="ghost"
					size="sm"
					onClick={onToggle}
					className={`p-1 h-6 ${!hasProjects ? "opacity-50" : ""}`}
				>
					{isExpanded ? (
						<ChevronDown className="h-4 w-4 mr-1" />
					) : (
						<ChevronRight className="h-4 w-4 mr-1" />
					)}
					<span className="text-xs font-semibold">{name}</span>
				</Button>
			</div>

			{isExpanded && hasProjects && (
				<div
					className={
						displayMode === "horizontal"
							? "grid grid-cols-1 gap-1 pl-4 mt-1"
							: "pl-4 mt-1"
					}
				>
					{slots.map(
						(slot) =>
							slot.project && (
								<div key={`${day}-${slot.hour}`} className="mb-1">
									<div className="flex items-center gap-2">
										<div className="text-xs text-gray-500 w-12">{slot.hour}</div>
										<div className="flex-1">
											<ProjectCell
												project={slot.project}
												compact={displayMode === "horizontal"}
											/>
										</div>
									</div>
								</div>
							)
					)}
				</div>
			)}
		</div>
	);
}
