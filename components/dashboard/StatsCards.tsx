import { Card, CardContent } from "@/components/ui/card";
import {
	Target,
	CheckCircle2,
	Clock,
	BarChart3,
	ArrowUpRight,
	TrendingUp,
	Zap,
} from "lucide-react";

interface DashboardStats {
	totalProjects: number;
	activeProjects: number;
	completedThisWeek: number;
	hoursThisWeek: number;
	productivity: number;
	streak: number;
}

interface StatsCardsProps {
	stats: DashboardStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
	//TODO : Replace with real data fetching logics
	const statsData = [
		{
			title: "Projets Actifs",
			value: stats.activeProjects,
			icon: Target,
			gradient: "from-blue-50 to-blue-100",
			textColor: "text-blue-600",
			valueColor: "text-blue-900",
			bgColor: "bg-blue-600",
			trend: "+2 cette semaine",
			trendIcon: ArrowUpRight,
		},
		{
			title: "Complétés",
			value: stats.completedThisWeek,
			icon: CheckCircle2,
			gradient: "from-green-50 to-green-100",
			textColor: "text-green-600",
			valueColor: "text-green-900",
			bgColor: "bg-green-600",
			trend: "Cette semaine",
			trendIcon: CheckCircle2,
		},
		{
			title: "Heures/Semaine",
			value: `${stats.hoursThisWeek}h`,
			icon: Clock,
			gradient: "from-purple-50 to-purple-100",
			textColor: "text-purple-600",
			valueColor: "text-purple-900",
			bgColor: "bg-purple-600",
			trend: "+15% vs dernière",
			trendIcon: TrendingUp,
		},
		{
			title: "Productivité",
			value: `${stats.productivity}%`,
			icon: BarChart3,
			gradient: "from-orange-50 to-orange-100",
			textColor: "text-orange-600",
			valueColor: "text-orange-900",
			bgColor: "bg-orange-600",
			trend: `${stats.streak} jours de suite`,
			trendIcon: Zap,
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			{statsData.map((stat, index) => (
				<Card
					key={index}
					className={`border-0 shadow-sm bg-gradient-to-br ${stat.gradient}`}
				>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className={`text-sm font-medium ${stat.textColor}`}>{stat.title}</p>
								<p className={`text-3xl font-bold ${stat.valueColor}`}>{stat.value}</p>
								<p className={`text-xs ${stat.textColor} flex items-center mt-1`}>
									<stat.trendIcon className="w-3 h-3 mr-1" />
									{stat.trend}
								</p>
							</div>
							<div
								className={`h-12 w-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
							>
								<stat.icon className="w-6 h-6 text-white" />
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
