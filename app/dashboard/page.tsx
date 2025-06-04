"use client";
import LoadingSpinner from "@/components/common/Loading";
import DashboardHeader from "@/components/dashboard/HeaderDashboard";
import ProjectsSection from "@/components/dashboard/ProjectsSectionProps";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import { useRefresh } from "@/context/RefreshContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useState } from "react";

export default function Dashboard() {
	const { refreshTrigger, triggerRefresh } = useRefresh();
	const { projects, stats, isLoading } = useDashboardData(refreshTrigger);
	const [selectedFilter, setSelectedFilter] = useState("all");

	if (isLoading) {
		return <LoadingSpinner message="Chargement de votre dashboard..." />;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<DashboardHeader onRefresh={triggerRefresh} />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<StatsCards stats={stats} />

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<ProjectsSection
						projects={projects}
						selectedFilter={selectedFilter}
						onFilterChange={setSelectedFilter}
						onRefresh={triggerRefresh}
					/>
					<Sidebar stats={stats} />
				</div>
			</div>
		</div>
	);
}