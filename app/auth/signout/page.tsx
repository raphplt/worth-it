"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignOutPage() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
				<div className="text-center">
					<h1 className="text-3xl font-bold">Déconnexion</h1>
					<p className="mt-2 text-gray-600">
						Êtes-vous sûr de vouloir vous déconnecter ?
					</p>
				</div>

				<div className="flex justify-center space-x-4">
					<Button variant="default" onClick={() => signOut({ callbackUrl: "/" })}>
						Confirmer la déconnexion
					</Button>

					<Button asChild variant="outline">
						<Link href="/">Annuler</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
