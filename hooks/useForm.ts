import { useState } from "react";

interface ProjectFormData {
	name: string;
	description: string;
	priority: number;
	time: boolean;
	urgent: boolean;
	important: boolean;
	desire: boolean;
	weeklyHours: number;
	preferredDays: string[];
	preferredHours: string[];
	deadline: string;
}

const useForm = (initialData?: Partial<ProjectFormData>) => {
	const [formData, setFormData] = useState<ProjectFormData>({
		name: "",
		description: "",
		priority: 0,
		time: false,
		urgent: false,
		important: false,
		desire: false,
		weeklyHours: 0,
		preferredDays: [],
		preferredHours: [],
		deadline: "",
		...initialData,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "number" ? Number(value) : value,
		}));
	};

	const handleRadioChange = (name: string, value: boolean) => {
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

	const handleSubmit = async (
		e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
	) => {
		if (e) e.preventDefault();
		const res = await fetch(`/api/projects`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		console.log("Form submitted:", formData);

		if (!res.ok) {
			throw new Error("Failed to submit form");
		}
		console.log("Form submitted:", formData);

		// Réinitialiser le formulaire
		setFormData({
			name: "",
			description: "",
			priority: 0,
			time: false,
			urgent: false,
			important: false,
			desire: false,
			weeklyHours: 0,
			preferredDays: [],
			preferredHours: [],
			deadline: "",
		});
	};
	return {
		formData,
		setFormData,
		handleChange,
		handleRadioChange,
		handlePriorityChange,
		handleSubmit,
	};
};

export default useForm;
