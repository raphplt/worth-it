import { Project } from "@/type/project";
import { useState, useEffect } from "react";

interface DashboardStats {
	totalProjects: number;
	activeProjects: number;
	completedThisWeek: number;
	hoursThisWeek: number;
	productivity: number;
	streak: number;
}

export function useDashboardData(refreshTrigger: unknown) {
	const [projects, setProjects] = useState<Project[]>([]);
	const [stats, setStats] = useState<DashboardStats>({
		totalProjects: 0,
		activeProjects: 0,
		completedThisWeek: 0,
		hoursThisWeek: 0,
		productivity: 0,
		streak: 0,
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchDashboardData();
	}, [refreshTrigger]);

	const fetchDashboardData = async () => {
		try {
			const response = await fetch("/api/projects");
			if (!response.ok) throw new Error("Failed to fetch projects");
			const data = await response.json();

			const processedProjects = data.map((project: Project) => ({
				...project,
				progress: Math.floor(Math.random() * 100),
				status:
					project.deadline && new Date(project.deadline) < new Date()
						? "completed"
						: "active",
				completedHours: Math.floor(Math.random() * project.weeklyHours),
				timeSpent: Math.floor(Math.random() * 20),
			}));

			setProjects(processedProjects);

			const activeProjects = processedProjects.filter(
				(p: Project) => p.status === "active"
			);
			const completedThisWeek = processedProjects.filter(
				(p: Project) =>
					p.status === "completed" &&
					new Date(p.deadline) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
			).length;

			setStats({
				totalProjects: processedProjects.length,
				activeProjects: activeProjects.length,
				completedThisWeek,
				hoursThisWeek: activeProjects.reduce(
					(acc: number, p: Project) => acc + (p.completedHours || 0),
					0
				),
				productivity: 85,
				streak: 7,
			});
		} catch (error) {
			console.error("Error fetching dashboard data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return { projects, stats, isLoading };
}
