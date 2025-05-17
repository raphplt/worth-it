import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Slide3Props {
	weeklyHours: number;
	preferredDays: string[];
	preferredHours: string[];
	deadline: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent) => void;
}

interface CustomChangeEvent {
	target: {
		name: string;
		value: string | number | string[];
	};
}

const DAYS = [
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi",
	"Dimanche",
];

const TIME_SLOTS = [
	"6h-7h",
	"7h-8h",
	"8h-9h",
	"9h-10h",
	"10h-11h",
	"11h-12h",
	"12h-13h",
	"13h-14h",
	"14h-15h",
	"15h-16h",
	"16h-17h",
	"17h-18h",
	"18h-19h",
	"19h-20h",
	"20h-21h",
	"21h-22h",
	"22h-23h",
	"23h-0h",
];

export default function Slide3({
	weeklyHours,
	preferredDays,
	preferredHours,
	deadline,
	onChange,
}: Slide3Props) {
	const handleDayChange = (day: string) => {
		const event: CustomChangeEvent = {
			target: {
				name: "preferredDays",
				value: preferredDays.includes(day)
					? preferredDays.filter((d) => d !== day)
					: [...preferredDays, day],
			},
		};
		onChange(event);
	};

	const handleTimeSlotChange = (timeSlot: string) => {
		const event: CustomChangeEvent = {
			target: {
				name: "preferredHours",
				value: preferredHours.includes(timeSlot)
					? preferredHours.filter((t) => t !== timeSlot)
					: [...preferredHours, timeSlot],
			},
		};
		onChange(event);
	};

	return (
		<div className="space-y-6">
			<div>
				<Label htmlFor="deadline" className="text-lg font-medium">
					Date butoir
				</Label>
				<Input
					id="deadline"
					name="deadline"
					type="date"
					value={deadline}
					onChange={onChange}
					className="mt-1 p-4"
					min={new Date().toISOString().split("T")[0]}
					required
				/>
			</div>

			<div>
				<Label htmlFor="weeklyHours" className="text-lg font-medium">
					Nombre d&apos;heures par semaine
				</Label>
				<Input
					id="weeklyHours"
					name="weeklyHours"
					type="number"
					min="1"
					max="80"
					value={weeklyHours}
					onChange={onChange}
					className="mt-1 p-4"
				/>
			</div>

			<div>
				<Label className="text-lg font-medium mb-2 block">Jours préférés</Label>
				<div className="flex flex-wrap gap-2 mt-2">
					{DAYS.map((day) => (
						<Button
							key={day}
							type="button"
							variant={preferredDays.includes(day) ? "default" : "outline"}
							className="flex-grow"
							onClick={() => handleDayChange(day)}
						>
							{day}
						</Button>
					))}
				</div>
			</div>

			<div>
				<Label className="text-lg font-medium mb-2 block">
					Créneaux horaires préférés
				</Label>
				<div className="grid grid-cols-3 gap-2 mt-2">
					{TIME_SLOTS.map((timeSlot) => (
						<Button
							key={timeSlot}
							type="button"
							variant={preferredHours.includes(timeSlot) ? "default" : "outline"}
							className="w-full"
							onClick={() => handleTimeSlotChange(timeSlot)}
						>
							{timeSlot}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}
