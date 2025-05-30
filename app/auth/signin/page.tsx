"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthCheck from "@/components/auth/AuthCheck";
import { useState, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

function SignInContent() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";
	const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
		github: false,
		google: false,
	});

	const handleSignIn = async (provider: string) => {
		try {
			setIsLoading((prev) => ({ ...prev, [provider]: true }));

			await signIn(provider, {
				callbackUrl,
				redirect: true,
			});
		} catch (error) {
			console.error(`Erreur de connexion avec ${provider}:`, error);
			setIsLoading((prev) => ({ ...prev, [provider]: false }));
		}
	};

	return (
		<AuthCheck allowUnauthenticated redirectTo="/">
			<div className="flex items-center justify-center min-h-screen bg-gray-50">
				<div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
					<div className="text-center">
						<h1 className="text-3xl font-bold">Connectez-vous à Worth It</h1>
						<p className="mt-2 text-gray-600">
							L&apos;application qui vous aide à prioriser vos projets
						</p>
					</div>

					<div className="space-y-4">
						<Button
							variant="outline"
							className="w-full relative"
							onClick={() => handleSignIn("github")}
							disabled={isLoading.github}
						>
							{isLoading.github ? (
								<span className="absolute left-4">
									<Spinner size="small" />
								</span>
							) : (
								<Github className="w-5 h-5 mr-2" />
							)}
							{isLoading.github ? "Connexion en cours..." : "Continuer avec GitHub"}
						</Button>

						<Button
							variant="outline"
							className="w-full relative"
							onClick={() => handleSignIn("google")}
							disabled={isLoading.google}
						>
							{isLoading.google ? (
								<span className="absolute left-4">
									<Spinner size="small" />
								</span>
							) : (
								<Mail className="w-5 h-5 mr-2" />
							)}
							{isLoading.google ? "Connexion en cours..." : "Continuer avec Google"}
						</Button>
					</div>

					<div className="text-center text-sm text-gray-500 mt-8">
						En vous connectant, vous acceptez nos{" "}
						<Link href="/terms" className="text-blue-600 hover:underline">
							Conditions d&apos;utilisation
						</Link>{" "}
						et notre{" "}
						<Link href="/privacy" className="text-blue-600 hover:underline">
							Politique de confidentialité
						</Link>
					</div>
				</div>
			</div>
		</AuthCheck>
	);
}

export default function SignIn() {
	return (
		<Suspense
			fallback={
				<div className="flex items-center justify-center min-h-screen bg-gray-50">
					<div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
						<div className="text-center">
							<h1 className="text-3xl font-bold">Connectez-vous à Worth It</h1>
							<p className="mt-2 text-gray-600">Chargement...</p>
						</div>
					</div>
				</div>
			}
		>
			<SignInContent />
		</Suspense>
	);
}