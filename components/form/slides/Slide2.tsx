import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Slide2Props {
	time: boolean;
	urgent: boolean;
	important: boolean;
	desire: boolean;
	onRadioChange: (name: string, value: boolean) => void;
}

export default function Slide2({
	time,
	urgent,
	important,
	desire,
	onRadioChange,
}: Slide2Props) {
	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-medium mb-2 block">
					As-tu le temps de t&apos;en occuper ?
				</Label>
				<div className="flex gap-3 mt-2">
					<Button
						variant={time ? "default" : "outline"}
						className="flex-1 py-6"
						onClick={() => onRadioChange("time", true)}
					>
						Oui
					</Button>
					<Button
						variant={!time ? "default" : "outline"}
						className="flex-1 py-6"
						onClick={() => onRadioChange("time", false)}
					>
						Non
					</Button>
				</div>
			</div>

			<div>
				<Label className="text-lg font-medium mb-2 block">Est-ce urgent ?</Label>
				<div className="flex gap-3 mt-2">
					<Button
						variant={urgent ? "default" : "outline"}
						className="flex-1 py-6"
						onClick={() => onRadioChange("urgent", true)}
					>
						Oui
					</Button>
					<Button
						variant={!urgent ? "default" : "outline"}
						className="flex-1 py-6"
						onClick={() => onRadioChange("urgent", false)}
					>
						Non
					</Button>
				</div>
			</div>

			<div>
				<Label className="text-lg font-medium mb-2 block">Est-ce important ?</Label>
				<div className="flex gap-3 mt-2">
					<Button
						variant={important ? "default" : "outline"}
						className="flex-1 py-6"
						onClick={() => onRadioChange("important", true)}
					>
						Oui
					</Button>
					<Button
						variant={!important ? "default" : "outline"}
						className="flex-1 py-6"
						onClick={() => onRadioChange("important", false)}
					>
						Non
					</Button>
				</div>
			</div>

			<div>
				<Label className="text-lg font-medium mb-2 block">
					As-tu envie de le faire ?
				</Label>
				<div className="flex gap-3 mt-2">
					<Button
						variant={desire ? "default" : "outline"}
						className="flex-1 py-6"
						onClick={() => onRadioChange("desire", true)}
					>
						Oui
					</Button>
					<Button
						variant={!desire ? "default" : "outline"}
						className="flex-1 py-6"
						onClick={() => onRadioChange("desire", false)}
					>
						Non
					</Button>
				</div>
			</div>
		</div>
	);
}
