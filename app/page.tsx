"use client";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
			<div className="container mx-auto px-4 py-16">
				<div className="flex flex-col items-center text-center space-y-8">
					<div className="relative w-24 h-24">
						<Image
							src="/images/Logo.png"
							alt="Worth It Logo"
							width={96}
							height={96}
							priority
							className="w-full"
						/>
					</div>

					<h1 className="text-5xl font-bold text-gray-900">
						Bienvenue sur Worth It
					</h1>

					<p className="text-xl text-gray-600 max-w-2xl">
						Gérez vos projets et suivez leur progression de manière simple et
						efficace. Rejoignez notre communauté dès aujourd&apos;hui !
					</p>

					<div className="flex gap-4">
						<Button
							size="lg"
							className="flex items-center gap-2"
							onClick={() => signIn()}
						>
							<LogIn className="w-5 h-5" />
							Commencer maintenant
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
						<div className="p-6 bg-white rounded-lg shadow-sm">
							<h3 className="text-xl font-semibold mb-2">Gestion de Projets</h3>
							<p className="text-gray-600">
								Organisez et suivez vos projets en temps réel
							</p>
						</div>
						<div className="p-6 bg-white rounded-lg shadow-sm">
							<h3 className="text-xl font-semibold mb-2">Collaboration</h3>
							<p className="text-gray-600">
								Travaillez efficacement avec votre équipe
							</p>
						</div>
						<div className="p-6 bg-white rounded-lg shadow-sm">
							<h3 className="text-xl font-semibold mb-2">Suivi des Progrès</h3>
							<p className="text-gray-600">
								Visualisez l&apos;avancement de vos projets
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
