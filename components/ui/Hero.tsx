"use client";

import { ArrowRight, Play } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
	const { data: session } = useSession();

	return (
		<section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col pt-16">
			{/* Gradient background avec effet grain */}
			<div className="pointer-events-none absolute inset-0 z-0">
				<div className="absolute -right-60 -top-10 blur-3xl">
					<div className="h-[10rem] w-[60rem] rounded-full bg-gradient-to-b from-blue-400 to-sky-400 opacity-40" />
					<div className="h-[10rem] w-[90rem] rounded-full bg-gradient-to-b from-purple-400 to-yellow-200 opacity-30" />
					<div className="h-[10rem] w-[60rem] rounded-full bg-gradient-to-b from-yellow-300 to-sky-200 opacity-30" />
				</div>
				<div className="absolute inset-0 bg-noise opacity-10" />
			</div>

			{/* Hero Content */}
			<div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-12 pb-8 w-full">
				<div className="mb-4">
					<span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
						🚀 Nouvelle fonctionnalité : IA de priorisation
					</span>
				</div>

				<h1 className="w-full max-w-5xl text-center text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
					Gérez vos projets{" "}
					<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						simplement et efficacement
					</span>
				</h1>

				<p className="w-full max-w-2xl text-center text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
					Planifiez, collaborez et suivez la progression de vos équipes en temps
					réel. Worth It simplifie la gestion de projet pour tous.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 mb-8">
					{session ? (
						<Link href="/dashboard">
							<button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow hover:from-blue-700 hover:to-purple-700 transition flex items-center gap-2">
								Accéder au tableau de bord
								<ArrowRight className="w-5 h-5" />
							</button>
						</Link>
					) : (
						<button
							className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow hover:from-blue-700 hover:to-purple-700 transition flex items-center gap-2"
							onClick={() => signIn()}
						>
							Commencer maintenant
							<ArrowRight className="w-5 h-5" />
						</button>
					)}
					<button className="rounded-full border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 bg-white hover:bg-blue-50 transition flex items-center gap-2">
						<Play className="w-5 h-5" />
						Voir une démo
					</button>
				</div>

				<p className="text-sm text-gray-500 mb-12">
					Gratuit pour commencer • Aucune carte bancaire requise
				</p>

				<div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
					<Image
						src="/images/HeroPicture.png"
						alt="Capture d'écran du tableau de bord Worth It"
						width={1600}
						height={900}
						className="object-cover w-full h-full"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
				</div>
			</div>
		</section>
	);
};

export { Hero };
