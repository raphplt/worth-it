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
import useForm from "@/hooks/useForm";

function NewProject() {
	const [slideStep, setSlideStep] = useState(0);
	const {
		formData,
		handleChange,
		handleRadioChange,
		handlePriorityChange,
		handleSubmit,
	} = useForm();

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
						onChange={handleChange}
						onRadioChange={handleRadioChange}
					/>
				);
			default:
				return null;
		}
	};

	const renderNextButton = () => {
		if (slideStep < 1) {
			return (
				<Button type="button" onClick={() => setSlideStep((prev) => prev + 1)}>
					Suivant
				</Button>
			);
		}
		if (slideStep === 1) {
			return (
				<div className="flex gap-2">
					<Button type="button" onClick={() => setSlideStep((prev) => prev - 1)}>
						Précédent
					</Button>
					<Button type="button" onClick={handleSubmit}>
						Enregistrer
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