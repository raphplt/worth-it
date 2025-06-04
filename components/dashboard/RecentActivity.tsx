import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentActivity() {
	const activities = [
		{
			action: "Projet complété",
			project: "Design System",
			time: "Il y a 2h",
			type: "success",
		},
		{
			action: "Échéance approche",
			project: "App Mobile",
			time: "Demain",
			type: "warning",
		},
		{
			action: "Nouveau projet",
			project: "Site Web",
			time: "Il y a 1 jour",
			type: "info",
		},
	];

	return (
		<Card className="border-0 shadow-sm">
			<CardHeader className="pb-4">
				<CardTitle className="text-lg font-semibold">Activité récente</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{activities.map((activity, index) => (
					<div key={index} className="flex items-start gap-3">
						<div
							className={`w-2 h-2 rounded-full mt-2 ${
								activity.type === "success"
									? "bg-green-500"
									: activity.type === "warning"
										? "bg-orange-500"
										: "bg-blue-500"
							}`}
						/>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-gray-900">{activity.action}</p>
							<p className="text-sm text-gray-600">{activity.project}</p>
							<p className="text-xs text-gray-500">{activity.time}</p>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
