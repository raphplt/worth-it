import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface Slide4Props {
	relevance: string | null;
	name: string;
	priority: number;
	time: boolean;
	urgent: boolean;
	important: boolean;
	desire: boolean;
}

export default function Slide4({
	relevance,
	name,
	priority,
	time,
	urgent,
	important,
	desire,
}: Slide4Props) {
	const isViable =
		relevance === "Hautement pertinent" || relevance === "Pertinent";

	const getRelevanceColor = () => {
		switch (relevance) {
			case "Hautement pertinent":
				return "bg-green-100 text-green-800 border-green-300";
			case "Pertinent":
				return "bg-blue-100 text-blue-800 border-blue-300";
			case "Peu pertinent":
				return "bg-orange-100 text-orange-800 border-orange-300";
			default:
				return "bg-gray-100 text-gray-800 border-gray-300";
		}
	};

	const getRelevanceMessage = () => {
		switch (relevance) {
			case "Hautement pertinent":
				return "Ce projet est très pertinent ! Il mérite d'être réalisé en priorité.";
			case "Pertinent":
				return "Ce projet est assez pertinent. Il peut être entrepris si vous avez les ressources nécessaires.";
			case "Peu pertinent":
				return "Ce projet n&apos;est pas très pertinent. Vous pourriez reconsidérer sa réalisation ou ses modalités.";
			default:
				return "La pertinence de ce projet n&apos;a pas pu être déterminée.";
		}
	};

	return (
		<div className="space-y-6">
			<div className="bg-gray-50 p-6 rounded-lg border">
				<h2 className="text-xl font-bold mb-4">Résultats d&apos;analyse</h2>

				<div className="flex items-center gap-2 mb-6">
					<div className="text-lg font-medium">Projet : {name}</div>
					<span
						className={`px-2 py-1 rounded-full text-sm font-medium ${getRelevanceColor()}`}
					>
						{relevance || "Non défini"}
					</span>
				</div>

				<div className="mb-4">
					<p className="text-gray-700">{getRelevanceMessage()}</p>
				</div>

				<div className="mb-6">
					<p className="text-sm text-gray-600">Priorité définie : {priority}%</p>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex items-center gap-2">
						<div className={time ? "text-green-500" : "text-red-500"}>
							{time ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
						</div>
						<span>Temps disponible</span>
					</div>
					<div className="flex items-center gap-2">
						<div className={urgent ? "text-green-500" : "text-gray-400"}>
							{urgent ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
						</div>
						<span>Urgence</span>
					</div>
					<div className="flex items-center gap-2">
						<div className={important ? "text-green-500" : "text-gray-400"}>
							{important ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
						</div>
						<span>Importance</span>
					</div>
					<div className="flex items-center gap-2">
						<div className={desire ? "text-green-500" : "text-gray-400"}>
							{desire ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
						</div>
						<span>Motivation</span>
					</div>
				</div>
			</div>

			<div className="mt-6 p-4 border rounded-lg bg-blue-50">
				<h3 className="font-medium mb-2">Prochaine étape :</h3>
				<p>
					{isViable
						? "Passez à la planification de votre projet."
						: "Reconsidérez les paramètres de votre projet ou envisagez de le reporter."}
				</p>
			</div>
		</div>
	);
}
