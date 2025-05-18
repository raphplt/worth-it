"use client";
import { useRefresh } from "@/context/RefreshContext";
import ProjectList from "@/components/common/ProjectList";
import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import AuthCheck from "@/components/auth/AuthCheck";

export default function Home() {
	const { refreshTrigger } = useRefresh();

	return (
		<AuthCheck>
			<main>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg shadow p-6">
							<h2 className="text-xl font-semibold mb-4">Mes Projets</h2>
							<ProjectList key={`projects-${refreshTrigger}`} />
						</div>
					</div>

					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg shadow p-6">
							<h2 className="text-xl font-semibold mb-4">Calendrier Hebdomadaire</h2>
							<WeeklyCalendar key={`calendar-${refreshTrigger}`} />
						</div>
					</div>
				</div>
			</main>
		</AuthCheck>
	);
}
