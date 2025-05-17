"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
	const router = useRouter();

	const handleDeleteAllProjects = async () => {
		if (
			!confirm(
				"Êtes-vous sûr de vouloir supprimer tous les projets ? Cette action est irréversible."
			)
		) {
			return;
		}

		try {
			const response = await fetch("/api/projects?deleteAll=true", {
				method: "DELETE",
			});

			if (!response.ok) throw new Error("Failed to delete all projects");

			toast.success("Tous les projets ont été supprimés avec succès");
			router.push("/");
		} catch (error) {
			console.error("Error deleting all projects:", error);
			toast.error("Erreur lors de la suppression des projets");
		}
	};

	return (
		<main className="container mx-auto p-4">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Paramètres</h1>

				<div className="bg-white rounded-lg shadow p-6 space-y-6">
					<div>
						<h2 className="text-xl font-semibold mb-4">Gestion des projets</h2>
						<div className="space-y-4">
							<div className="p-4 border border-red-200 rounded-lg bg-red-50">
								<h3 className="font-medium text-red-800 mb-2">Zone dangereuse</h3>
								<p className="text-red-600 mb-4">
									Cette action supprimera définitivement tous vos projets. Cette action
									est irréversible.
								</p>
								<Button variant="destructive" onClick={handleDeleteAllProjects}>
									Supprimer tous les projets
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
