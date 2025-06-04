import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import WeeklyGoals from "./WeeklyGoals";

interface DashboardStats {
	totalProjects: number;
	activeProjects: number;
	completedThisWeek: number;
	hoursThisWeek: number;
	productivity: number;
	streak: number;
}

interface SidebarProps {
	stats: DashboardStats;
}

export default function Sidebar({ stats }: SidebarProps) {
	return (
		<div className="space-y-6">
			<RecentActivity />
			<WeeklyGoals stats={stats} />
			<QuickActions />
		</div>
	);
}
