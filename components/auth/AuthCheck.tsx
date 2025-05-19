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

	useEffect(() => {
		if (!allowUnauthenticated && status === "unauthenticated") {
			router.push(redirectTo);
		}

		if (allowUnauthenticated && status === "authenticated") {
			router.push("/");
		}
	}, [status, router, redirectTo, allowUnauthenticated]);

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

	if (status === "authenticated" || allowUnauthenticated) {
		return <>{children}</>;
	}

	return (
		<div className="flex items-center justify-center h-96">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
				<p>Redirection vers la page de connexion...</p>
			</div>
		</div>
	);
}
