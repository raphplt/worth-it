import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

interface Slide1Props {
	name: string;
	description: string;
	priority: number;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onPriorityChange: (value: number) => void;
}

export default function Slide1({
	name,
	description,
	priority,
	onChange,
	onPriorityChange,
}: Slide1Props) {
	return (
		<div className="space-y-6">
			<div>
				<Label htmlFor="name" className="text-lg font-medium">
					Nom du projet
				</Label>
				<Input
					id="name"
					name="name"
					value={name}
					onChange={onChange}
					className="mt-1 p-4"
					placeholder="Entrez le nom de votre projet"
					required
				/>
			</div>

			<div>
				<Label htmlFor="description" className="text-lg font-medium">
					Description
				</Label>
				<Textarea
					id="description"
					name="description"
					value={description}
					onChange={onChange}
					className="mt-1 p-4"
					placeholder="Décrivez votre projet en quelques lignes"
					rows={4}
				/>
			</div>

			<div>
				<Label className="text-lg font-medium">Priorité</Label>
				<div className="mt-3">
					<Slider
						value={[priority]}
						onValueChange={(value) => onPriorityChange(value[0])}
						max={100}
						step={1}
						className="w-full"
					/>
					<div className="mt-2 flex justify-between">
						<span className="text-sm text-gray-500">Faible priorité</span>
						<span className="text-sm font-medium">{priority}%</span>
						<span className="text-sm text-gray-500">Haute priorité</span>
					</div>
				</div>
			</div>
		</div>
	);
}
