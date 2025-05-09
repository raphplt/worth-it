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

function NewProject() {
	const [slideStep, setSlideStep] = useState(0);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		priority: 1,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handlePriorityChange = (value: number) => {
		setFormData((prev) => ({
			...prev,
			priority: value,
		}));
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
			default:
				return null;
		}
	};

	const renderNextButton = () => {
		if (slideStep === 0) {
			return (
				<Button type="button" onClick={() => setSlideStep((prev) => prev + 1)}>
					Suivant
				</Button>
			);
		}
		return (
			<Button type="button" onClick={() => setSlideStep((prev) => prev - 1)}>
				Précédent
			</Button>
		);
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
