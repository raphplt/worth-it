"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function LoginPage() {
	const { signIn } = useAuth();

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-lg">
				<div className="text-center">
					<h2 className="text-3xl font-bold">Connexion</h2>
					<p className="mt-2 text-gray-600">
						Connectez-vous pour accéder à votre compte
					</p>
				</div>

				<div className="mt-8 space-y-4">
					<Button className="w-full" onClick={() => signIn("github")}>
						<Github className="w-5 h-5 mr-2" />
						Continuer avec GitHub
					</Button>
				</div>
			</div>
		</div>
	);
}
