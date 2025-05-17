import { Button } from "@/components/ui/button";
import {
	LayoutGrid,
	LayoutList,
	RefreshCw,
	ChevronLeft,
	ChevronRight,
	Calendar,
} from "lucide-react";

interface CalendarControlsProps {
	projectCount: number;
	onRegenerate: () => void;
	displayMode: "vertical" | "horizontal";
	onToggleDisplayMode: () => void;
	onPreviousWeek: () => void;
	onNextWeek: () => void;
	onCurrentWeek: () => void;
	currentWeekLabel: string;
}

export default function CalendarControls({
	projectCount,
	onRegenerate,
	displayMode,
	onToggleDisplayMode,
	onPreviousWeek,
	onNextWeek,
	onCurrentWeek,
	currentWeekLabel,
}: CalendarControlsProps) {
	return (
		<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
			<div className="flex items-center space-x-2">
				<span className="text-sm text-gray-600">
					{projectCount} projet{projectCount > 1 ? "s" : ""} dans le calendrier
				</span>
			</div>

			<div className="flex items-center gap-4">
				<div className="flex items-center border rounded-md">
					<Button
						variant="ghost"
						size="sm"
						onClick={onPreviousWeek}
						className="h-8 px-2"
						title="Semaine précédente"
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					<Button
						variant="ghost"
						size="sm"
						onClick={onCurrentWeek}
						className="h-8"
						title="Semaine actuelle"
					>
						<Calendar className="h-4 w-4 mr-1" />
						<span className="text-xs">{currentWeekLabel}</span>
					</Button>

					<Button
						variant="ghost"
						size="sm"
						onClick={onNextWeek}
						className="h-8 px-2"
						title="Semaine suivante"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>

				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={onToggleDisplayMode}
						title={
							displayMode === "vertical"
								? "Passer en vue horizontale"
								: "Passer en vue verticale"
						}
					>
						{displayMode === "vertical" ? (
							<LayoutGrid className="h-4 w-4" />
						) : (
							<LayoutList className="h-4 w-4" />
						)}
						<span className="ml-2">
							{displayMode === "vertical" ? "Horizontal" : "Vertical"}
						</span>
					</Button>

					<Button onClick={onRegenerate} size="sm" className="flex items-center">
						<RefreshCw className="mr-2 h-4 w-4" />
						Régénérer
					</Button>
				</div>
			</div>
		</div>
	);
}
