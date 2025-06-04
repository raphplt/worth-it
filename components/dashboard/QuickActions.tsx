import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, BarChart3, Users } from "lucide-react";

export default function QuickActions() {
	const actions = [
		{ icon: Calendar, label: "Planifier la semaine" },
		{ icon: BarChart3, label: "Voir les statistiques" },
		{ icon: Users, label: "Partager un projet" },
	];

	return (
		<Card className="border-0 shadow-sm">
			<CardHeader className="pb-4">
				<CardTitle className="text-lg font-semibold">Actions rapides</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				{actions.map((action, index) => (
					<Button
						key={index}
						variant="outline"
						size="sm"
						className="w-full justify-start"
					>
						<action.icon className="w-4 h-4 mr-2" />
						{action.label}
					</Button>
				))}
			</CardContent>
		</Card>
	);
}
