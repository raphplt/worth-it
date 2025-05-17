import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { getPriorityName } from "@/helpers/form";

interface Slide1Props {
	name: string;
	description: string;
	priority: number;
	deadline: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onPriorityChange: (value: number) => void;
}

export default function Slide1({
	name,
	description,
	priority,
	deadline,
	onChange,
	onPriorityChange,
}: Slide1Props) {
	return (
		<div className="space-y-6">
			<div>
				<Label htmlFor="name">Nom du projet</Label>
				<Input
					id="name"
					name="name"
					value={name}
					onChange={onChange}
					className="mt-1"
					required
				/>
			</div>

			<div>
				<Label htmlFor="description">Description</Label>
				<Textarea
					id="description"
					name="description"
					value={description}
					onChange={onChange}
					className="mt-1"
					rows={3}
				/>
			</div>

			<div>
				<Label htmlFor="deadline">Date butoir</Label>
				<Input
					id="deadline"
					name="deadline"
					type="date"
					value={deadline}
					onChange={onChange}
					className="mt-1"
					min={new Date().toISOString().split("T")[0]}
					required
				/>
			</div>

			<div>
				<Label>Priorité</Label>
				<div className="mt-2">
					<Slider
						value={[priority]}
						onValueChange={(value) => onPriorityChange(value[0])}
						max={100}
						step={1}
						className="w-full"
					/>
					<div className="mt-2 text-sm text-gray-500">Valeur : {priority}%</div>
				</div>
			</div>
		</div>
	);
}
