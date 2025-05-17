import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Slide2Props {
	time: boolean;
	urgent: boolean;
	important: boolean;
	desire: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRadioChange: (name: string, value: boolean) => void;
}

export default function Slide2({
	time,
	urgent,
	important,
	desire,
	onChange,
	onRadioChange,
}: Slide2Props) {
	return (
		<div className="space-y-6">
			<div>
				<Label>As-tu le temps de t&apos;en occuper ?</Label>
				<RadioGroup
					value={time ? "yes" : "no"}
					onValueChange={(value) => onRadioChange("time", value === "yes")}
					className="mt-2"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="yes" id="time-yes" />
						<Label htmlFor="time-yes">Oui</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="no" id="time-no" />
						<Label htmlFor="time-no">Non</Label>
					</div>
				</RadioGroup>
			</div>

			<div>
				<Label>Est-ce urgent ?</Label>
				<RadioGroup
					value={urgent ? "yes" : "no"}
					onValueChange={(value) => onRadioChange("urgent", value === "yes")}
					className="mt-2"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="yes" id="urgent-yes" />
						<Label htmlFor="urgent-yes">Oui</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="no" id="urgent-no" />
						<Label htmlFor="urgent-no">Non</Label>
					</div>
				</RadioGroup>
			</div>

			<div>
				<Label>Est-ce important ?</Label>
				<RadioGroup
					value={important ? "yes" : "no"}
					onValueChange={(value) => onRadioChange("important", value === "yes")}
					className="mt-2"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="yes" id="important-yes" />
						<Label htmlFor="important-yes">Oui</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="no" id="important-no" />
						<Label htmlFor="important-no">Non</Label>
					</div>
				</RadioGroup>
			</div>

			<div>
				<Label>As-tu envie de le faire ?</Label>
				<RadioGroup
					value={desire ? "yes" : "no"}
					onValueChange={(value) => onRadioChange("desire", value === "yes")}
					className="mt-2"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="yes" id="desire-yes" />
						<Label htmlFor="desire-yes">Oui</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="no" id="desire-no" />
						<Label htmlFor="desire-no">Non</Label>
					</div>
				</RadioGroup>
			</div>
		</div>
	);
}
