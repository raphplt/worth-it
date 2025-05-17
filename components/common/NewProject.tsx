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
import useForm from "@/hooks/useForm";
import { toast } from "sonner";

function NewProject() {
	const [slideStep, setSlideStep] = useState(0);
	const [relevance, setRelevance] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const {
		formData,
		handleChange,
		handleRadioChange,
		handlePriorityChange,
		handleSubmit: originalHandleSubmit,
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
			const relevanceScore = await checkRelevance();
			if (relevanceScore === null) return;
		}
		setSlideStep((prev) => prev + 1);
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
			originalHandleSubmit();
		} catch (error) {
			console.error("Error saving project:", error);
			toast.error("Erreur lors de l'enregistrement du projet");
		} finally {
			setIsLoading(false);
		}
	};

	const getRelevanceMessage = (relevance: string) => {
		switch (relevance) {
			case "Hautement pertinent":
				return "Ce projet est très pertinent !";
			case "Pertinent":
				return "Ce projet est assez pertinent.";
			case "Peu pertinent":
				return "Ce projet n'est pas très pertinent.";
			default:
				return "Pertinence non déterminée.";
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
						deadline={formData.deadline}
						onChange={handleChange}
						onPriorityChange={handlePriorityChange}
					/>
				);
			case 1:
				return (
					<>
						<Slide2
							time={formData.time}
							urgent={formData.urgent}
							important={formData.important}
							desire={formData.desire}
							onChange={handleChange}
							onRadioChange={handleRadioChange}
						/>
						{relevance !== null && (
							<div className="mt-4 p-4 bg-gray-100 rounded-lg">
								<p className="font-semibold">Niveau de pertinence : {relevance}</p>
								<p>{getRelevanceMessage(relevance)}</p>
							</div>
						)}
					</>
				);
			case 2:
				return (
					<Slide3
						weeklyHours={formData.weeklyHours}
						preferredDays={formData.preferredDays}
						preferredHours={formData.preferredHours}
						onChange={handleChange}
					/>
				);
			default:
				return null;
		}
	};

	const renderNextButton = () => {
		if (slideStep < 2) {
			return (
				<Button type="button" onClick={handleNext}>
					Suivant
				</Button>
			);
		}
		if (slideStep === 2) {
			return (
				<div className="flex gap-2">
					<Button type="button" onClick={() => setSlideStep((prev) => prev - 1)}>
						Précédent
					</Button>
					<Button type="button" onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? "Enregistrement..." : "Enregistrer"}
					</Button>
				</div>
			);
		}
		return null;
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Commencer un projet</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Commencer un nouveau projet</DialogTitle>
				</DialogHeader>

				{renderStep()}

				<DialogFooter>
					<Button variant="secondary" onClick={() => console.log("Annuler")}>
						Annuler
					</Button>
					{renderNextButton()}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default NewProject;