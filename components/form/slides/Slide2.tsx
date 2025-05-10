import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Label } from "@/components/ui/label";

interface Slide2Props {
	time: boolean;
	urgent: boolean;
	important: boolean;
	desire: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRadioChange: (name: string, value: string) => void;
}

function Slide2({ onRadioChange }: Slide2Props) {
	return (
		<div>
			<p className="mb">Ai-je le temps</p>
			<RadioGroup
				onValueChange={(value) => onRadioChange("time", value)}
				defaultValue="option-one"
				orientation="horizontal"
			>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="option-one" id="option-one" />
					<Label htmlFor="option-one">Oui</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="option-two" id="option-two" />
					<Label htmlFor="option-two">Non</Label>
				</div>
			</RadioGroup>

			<p className="mb">Est-ce urgent ?</p>
			<RadioGroup
				defaultValue="option-one"
				orientation="horizontal"
				onValueChange={(value) => onRadioChange("urgent", value)}
			>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="option-one" id="option-one" />
					<Label htmlFor="option-one">Oui</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="option-two" id="option-two" />
					<Label htmlFor="option-two">Non</Label>
				</div>
			</RadioGroup>

			<p className="mb">Est-ce important pour moi ?</p>
			<RadioGroup
				defaultValue="option-one"
				orientation="horizontal"
				onValueChange={(value) => onRadioChange("important", value)}
			>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="option-one" id="option-one" />
					<Label htmlFor="option-one">Oui</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="option-two" id="option-two" />
					<Label htmlFor="option-two">Non</Label>
				</div>
			</RadioGroup>

			<p className="mb">Ai-je envie d’y penser chaque jour ?</p>
			<RadioGroup
				defaultValue="option-one"
				orientation="horizontal"
				onValueChange={(value) => onRadioChange("desire", value)}
			>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="option-one" id="option-one" />
					<Label htmlFor="option-one">Oui</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="option-two" id="option-two" />
					<Label htmlFor="option-two">Non</Label>
				</div>
			</RadioGroup>
		</div>
	);
}

export default Slide2;
