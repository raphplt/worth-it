import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Slide1 from "../form/slides/Slide1";
import Slide2 from "../form/slides/Slide2";
import Slide3 from "../form/slides/Slide3";
import Slide4 from "../form/slides/Slide4";
import useForm from "@/hooks/useForm";
import { toast } from "sonner";

interface NewProjectProps {
	onProjectCreated?: () => void;
}

function NewProject({ onProjectCreated }: NewProjectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [slideStep, setSlideStep] = useState(0);
	const [relevance, setRelevance] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const {
		formData,
		handleChange,
		handleRadioChange,
		handlePriorityChange,
		resetForm,
	} = useForm();

	const checkRelevance = async () => {
		try {
			const response = await fetch("/api/projects/relevance", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					priority: formData.priority,
					time: formData.time,
					urgent: formData.urgent,
					important: formData.important,
					desire: formData.desire,
				}),
			});

			const data = await response.json();
			setRelevance(data.relevance);
			return data.relevance;
		} catch (error) {
			console.error("Error checking relevance:", error);
			toast.error("Erreur lors de la vérification de la pertinence");
			return null;
		}
	};

	const handleNext = async () => {
		if (slideStep === 1) {
			setIsLoading(true);
			try {
				const relevanceScore = await checkRelevance();
				if (relevanceScore === null) {
					toast.error(
						"Impossible de déterminer la pertinence du projet. Veuillez réessayer."
					);
					return;
				}
				setSlideStep(2); // Go to results slide
			} catch (error) {
				console.error("Error in handleNext:", error);
				toast.error("Une erreur est survenue. Veuillez réessayer.");
			} finally {
				setIsLoading(false);
			}
		} else if (slideStep === 0 || slideStep === 2) {
			setSlideStep((prev) => prev + 1);
		} else if (slideStep === 3) {
			handleSubmit();
		}
	};

	const resetState = () => {
		setSlideStep(0);
		setRelevance(null);
		resetForm();
	};

	const handleDialogChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			// Réinitialiser le formulaire quand on ferme la modale
			resetState();
		}
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/projects", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					relevance,
				}),
			});

			if (!response.ok) throw new Error("Erreur lors de l'enregistrement");

			toast.success("Projet enregistré avec succès !");

			// Appel au callback parent pour refresh ProjectList & Calendar
			if (onProjectCreated) {
				onProjectCreated();
			}

			// Fermer la modale et réinitialiser le formulaire
			setIsOpen(false);
			resetState();
		} catch (error) {
			console.error("Error saving project:", error);
			toast.error("Erreur lors de l'enregistrement du projet");
		} finally {
			setIsLoading(false);
		}
	};

	const renderStep = () => {
		switch (slideStep) {
			case 0:
				return (
					<Slide1
						name={formData.name}
						description={formData.description}
						priority={formData.priority}
						onChange={handleChange}
						onPriorityChange={handlePriorityChange}
					/>
				);
			case 1:
				return (
					<Slide2
						time={formData.time}
						urgent={formData.urgent}
						important={formData.important}
						desire={formData.desire}
						onRadioChange={handleRadioChange}
					/>
				);
			case 2:
				return (
					<Slide4
						relevance={relevance}
						name={formData.name}
						priority={formData.priority}
						time={formData.time}
						urgent={formData.urgent}
						important={formData.important}
						desire={formData.desire}
					/>
				);
			case 3:
				return (
					<Slide3
						weeklyHours={formData.weeklyHours}
						preferredDays={formData.preferredDays}
						preferredHours={formData.preferredHours}
						deadline={formData.deadline}
						onChange={handleChange}
					/>
				);
			default:
				return null;
		}
	};

	const getStepTitle = () => {
		switch (slideStep) {
			case 0:
				return "Informations générales";
			case 1:
				return "Évaluation";
			case 2:
				return "Résultats d'analyse";
			case 3:
				return "Planification";
			default:
				return "Nouveau projet";
		}
	};

	const renderButtons = () => {
		return (
			<div className="flex gap-2 justify-end">
				{slideStep > 0 && (
					<Button
						type="button"
						variant="outline"
						onClick={() => setSlideStep((prev) => prev - 1)}
					>
						Précédent
					</Button>
				)}

				<Button type="button" onClick={handleNext} disabled={isLoading}>
					{slideStep === 3
						? isLoading
							? "Enregistrement..."
							: "Enregistrer"
						: "Suivant"}
				</Button>
			</div>
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleDialogChange}>
			<DialogTrigger asChild>
				<Button>Commencer un projet</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[550px] p-6">
				<DialogHeader>
					<DialogTitle className="text-xl">{getStepTitle()}</DialogTitle>
				</DialogHeader>

				<div className="py-4">{renderStep()}</div>

				<DialogFooter>{renderButtons()}</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default NewProject;