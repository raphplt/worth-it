"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
	const searchParams = useSearchParams();
	const error = searchParams.get("error");

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-red-600">
						Erreur d&apos;authentification
					</h1>
					<p className="mt-2 text-gray-600">
						Une erreur s&apos;est produite lors de l&apos;authentification
					</p>

					{error && (
						<div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md text-sm">
							{error === "Verification" &&
								"Le lien de vérification a expiré ou est invalide."}
							{error === "AccessDenied" &&
								"Vous n'avez pas les droits d'accès nécessaires."}
							{error === "Configuration" &&
								"Il y a un problème de configuration sur le serveur."}
							{!["Verification", "AccessDenied", "Configuration"].includes(error) &&
								error}
						</div>
					)}
				</div>

				<div className="flex justify-center space-x-4">
					<Button asChild variant="default">
						<Link href="/auth/signin">Réessayer</Link>
					</Button>

					<Button asChild variant="outline">
						<Link href="/">Retour à l&apos;accueil</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
