import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Slide3Props {
	weeklyHours: number;
	preferredDays: string[];
	preferredHours: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
	"9h-10h",
	"10h-11h",
	"11h-12h",
	"14h-15h",
	"15h-16h",
	"16h-17h",
	"17h-18h",
];

export default function Slide3({
	weeklyHours,
	preferredDays,
	preferredHours,
	onChange,
}: Slide3Props) {
	const handleDayChange = (day: string) => {
		const event = {
			target: {
				name: "preferredDays",
				value: preferredDays.includes(day)
					? preferredDays.filter((d) => d !== day)
					: [...preferredDays, day],
			},
		} as React.ChangeEvent<HTMLInputElement>;
		onChange(event);
	};

	const handleTimeSlotChange = (timeSlot: string) => {
		const event = {
			target: {
				name: "preferredHours",
				value: preferredHours.includes(timeSlot)
					? preferredHours.filter((t) => t !== timeSlot)
					: [...preferredHours, timeSlot],
			},
		} as React.ChangeEvent<HTMLInputElement>;
		onChange(event);
	};

	return (
		<div className="space-y-6">
			<div>
				<Label htmlFor="weeklyHours">Nombre d'heures par semaine</Label>
				<Input
					id="weeklyHours"
					name="weeklyHours"
					type="number"
					min="1"
					max="40"
					value={weeklyHours}
					onChange={onChange}
					className="mt-1"
				/>
			</div>

			<div>
				<Label>Jours préférés</Label>
				<div className="grid grid-cols-2 gap-2 mt-2">
					{DAYS.map((day) => (
						<div key={day} className="flex items-center space-x-2">
							<Checkbox
								id={`day-${day}`}
								checked={preferredDays.includes(day)}
								onCheckedChange={() => handleDayChange(day)}
							/>
							<Label htmlFor={`day-${day}`}>{day}</Label>
						</div>
					))}
				</div>
			</div>

			<div>
				<Label>Créneaux horaires préférés</Label>
				<div className="grid grid-cols-2 gap-2 mt-2">
					{TIME_SLOTS.map((timeSlot) => (
						<div key={timeSlot} className="flex items-center space-x-2">
							<Checkbox
								id={`time-${timeSlot}`}
								checked={preferredHours.includes(timeSlot)}
								onCheckedChange={() => handleTimeSlotChange(timeSlot)}
							/>
							<Label htmlFor={`time-${timeSlot}`}>{timeSlot}</Label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
