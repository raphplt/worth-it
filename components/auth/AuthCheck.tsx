"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCheck({
	children,
	redirectTo = "/auth/signin",
	allowUnauthenticated = false,
}: {
	children: React.ReactNode;
	redirectTo?: string;
	allowUnauthenticated?: boolean;
}) {
	const { status } = useSession();
	const router = useRouter();

	// Version simplifiée pour éviter les problèmes potentiels avec NextAuth
	useEffect(() => {
		// Page protégée + non authentifié = redirection vers login
		if (!allowUnauthenticated && status === "unauthenticated") {
			router.push(redirectTo);
		}

		// Page de login + authentifié = redirection vers accueil
		if (allowUnauthenticated && status === "authenticated") {
			router.push("/");
		}
	}, [status, router, redirectTo, allowUnauthenticated]);

	// Affichez un chargement pendant la vérification du statut de connexion
	if (status === "loading") {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
					<p>Chargement de la session...</p>
				</div>
			</div>
		);
	}

	// Si l'utilisateur est authentifié ou si la page permet les utilisateurs non authentifiés
	if (status === "authenticated" || allowUnauthenticated) {
		return <>{children}</>;
	}

	// Par défaut (non authentifié sur une page protégée), montrer un indicateur de redirection
	return (
		<div className="flex items-center justify-center h-96">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
				<p>Redirection vers la page de connexion...</p>
			</div>
		</div>
	);
}
