import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import NewProject from "@/components/common/NewProject";

interface DashboardHeaderProps {
	onRefresh: () => void;
}

export default function DashboardHeader({ onRefresh }: DashboardHeaderProps) {
	return (
		<div className="bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-6">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
						<p className="text-gray-600 mt-1">
							Bienvenue ! Voici un aperçu de vos projets et de votre progression.
						</p>
					</div>
					<div className="flex gap-3">
						<NewProject onProjectCreated={onRefresh} />
						<Button variant="outline" size="sm">
							<Filter className="w-4 h-4 mr-2" />
							Filtrer
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
