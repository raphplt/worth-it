import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

interface WeeklyGoalsProps {
	stats: {
		hoursThisWeek: number;
		completedThisWeek: number;
	};
}

export default function WeeklyGoals({ stats }: WeeklyGoalsProps) {
	return (
		<Card className="border-0 shadow-sm">
			<CardHeader className="pb-4">
				<CardTitle className="text-lg font-semibold">
					Objectifs de la semaine
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-3">
					<div>
						<div className="flex justify-between text-sm mb-1">
							<span>Heures travaillées</span>
							<span>{stats.hoursThisWeek}/40h</span>
						</div>
						<Progress value={(stats.hoursThisWeek / 40) * 100} className="h-2" />
					</div>
					<div>
						<div className="flex justify-between text-sm mb-1">
							<span>Projets complétés</span>
							<span>{stats.completedThisWeek}/3</span>
						</div>
						<Progress value={(stats.completedThisWeek / 3) * 100} className="h-2" />
					</div>
				</div>

				<div className="pt-4 border-t">
					<Button size="sm" className="w-full">
						<Plus className="w-4 h-4 mr-2" />
						Ajouter un objectif
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
