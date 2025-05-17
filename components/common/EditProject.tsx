import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface Project {
	id: number;
	name: string;
	description: string;
	priority: number;
	time: boolean;
	urgent: boolean;
	important: boolean;
	desire: boolean;
	relevance: string;
	weeklyHours: number;
	preferredDays: string[];
	preferredHours: string[];
}

interface EditProjectProps {
	project: Project;
	onProjectUpdated: () => void;
}

export default function EditProject({
	project,
	onProjectUpdated,
}: EditProjectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<Project>(project);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "number" ? Number(value) : value,
		}));
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/projects", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) throw new Error("Failed to update project");

			toast.success("Projet mis à jour avec succès !");
			setIsOpen(false);
			onProjectUpdated();
		} catch (error) {
			console.error("Error updating project:", error);
			toast.error("Erreur lors de la mise à jour du projet");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					Modifier
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Modifier le projet</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					<div>
						<label className="text-sm font-medium">Nom du projet</label>
						<Input
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="mt-1"
						/>
					</div>

					<div>
						<label className="text-sm font-medium">Description</label>
						<Textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							className="mt-1"
							rows={3}
						/>
					</div>

					<div>
						<label className="text-sm font-medium">Priorité</label>
						<Slider
							value={[formData.priority]}
							onValueChange={(value) =>
								setFormData((prev) => ({ ...prev, priority: value[0] }))
							}
							max={100}
							step={1}
							className="mt-2"
						/>
						<div className="mt-1 text-sm text-gray-500">
							Valeur : {formData.priority}%
						</div>
					</div>

					<div>
						<label className="text-sm font-medium">Heures par semaine</label>
						<Input
							name="weeklyHours"
							type="number"
							min="1"
							max="40"
							value={formData.weeklyHours}
							onChange={handleChange}
							className="mt-1"
						/>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={() => setIsOpen(false)}>
						Annuler
					</Button>
					<Button onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? "Mise à jour..." : "Mettre à jour"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
