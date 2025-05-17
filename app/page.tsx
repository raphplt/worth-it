"use client";
import NewProject from "@/components/common/NewProject";
import ProjectList from "@/components/common/ProjectList";
import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import Link from "next/link";
import { Settings } from "lucide-react";

export default function Home() {
	return (
		<main className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Worth It - Planificateur de Projets</h1>
				<div className="flex items-center gap-4">
					<NewProject />
					<Link href="/settings" className="text-gray-600 hover:text-gray-900">
						<Settings className="w-6 h-6" />
					</Link>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Section des projets */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-lg shadow p-6">
						<h2 className="text-xl font-semibold mb-4">Mes Projets</h2>
						<ProjectList />
					</div>
				</div>

				{/* Section du calendrier */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-lg shadow p-6">
						<h2 className="text-xl font-semibold mb-4">Calendrier Hebdomadaire</h2>
						<WeeklyCalendar />
					</div>
				</div>
			</div>
		</main>
	);
}
