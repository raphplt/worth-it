import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { getPriorityName } from "@/helpers/form";
import React from "react";

interface Slide1Props {
	name: string;
	description: string;
	priority: number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onPriorityChange: (value: number) => void;
}

function Slide1({
	name,
	description,
	priority,
	onChange,
	onPriorityChange,
}: Slide1Props) {
	return (
		<div>
			<Input
				placeholder="Nom du projet"
				className="mb-4"
				name="name"
				value={name}
				onChange={onChange}
			/>
			<Input
				placeholder="Description du projet"
				className="mb-4"
				name="description"
				value={description}
				onChange={onChange}
			/>

			<p className="mb-4">Priorité</p>
			<Slider
				defaultValue={[priority]}
				max={100}
				min={1}
				value={[priority]}
				onValueChange={(value) => onPriorityChange(value[0])}
				step={1}
				className="mb-4"
				color="red"
			/>
			<p>{getPriorityName(priority)}</p>
		</div>
	);
}

export default Slide1;
