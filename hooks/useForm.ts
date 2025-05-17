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

interface CustomChangeEvent {
	target: {
		name: string;
		value: string | number | string[];
	};
}

const defaultFormData: ProjectFormData = {
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
};

const useForm = (initialData?: Partial<ProjectFormData>) => {
	const [formData, setFormData] = useState<ProjectFormData>({
		...defaultFormData,
		...initialData,
	});

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| CustomChangeEvent
	) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		const type = "type" in target ? target.type : null;

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

	const resetForm = () => {
		setFormData({
			...defaultFormData,
		});
	};

	const handleSubmit = async (
		e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
	) => {
		if (e) e.preventDefault();

		try {
			const res = await fetch(`/api/projects`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				throw new Error("Failed to submit form");
			}

			console.log("Form submitted:", formData);

			// Réinitialiser le formulaire
			resetForm();

			return res;
		} catch (error) {
			console.error("Form submission error:", error);
			throw error;
		}
	};

	return {
		formData,
		setFormData,
		handleChange,
		handleRadioChange,
		handlePriorityChange,
		handleSubmit,
		resetForm,
	};
};

export default useForm;
