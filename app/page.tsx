"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	CheckCircle,
	Star,
	Users,
	TrendingUp,
	Zap,
	Target,
	ArrowRight,
	BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import Header from "@/components/common/Header";
import { Hero } from "@/components/ui/Hero";

export default function LandingPage() {
	const { data: session } = useSession();
	const [activeFeature, setActiveFeature] = useState(0);

	const features = [
		{
			icon: <Target className="w-8 h-8" />,
			title: "Priorisez intelligemment",
			description:
				"Utilisez des matrices de décision avancées pour identifier les projets les plus rentables.",
		},
		{
			icon: <BarChart3 className="w-8 h-8" />,
			title: "Analysez la performance",
			description:
				"Suivez vos métriques clés et mesurez le ROI de chaque projet en temps réel.",
		},
		{
			icon: <Users className="w-8 h-8" />,
			title: "Collaborez efficacement",
			description:
				"Travaillez en équipe avec des outils de collaboration intégrés et des notifications intelligentes.",
		},
	];

	const testimonials = [
		{
			name: "Marie Dubois",
			role: "CEO, TechStart",
			content:
				"Worth It a transformé notre façon de prioriser nos projets. Nous avons augmenté notre ROI de 40% en 6 mois.",
			rating: 5,
		},
		{
			name: "Pierre Martin",
			role: "Product Manager, InnovateCorp",
			content:
				"L&apos;interface intuitive et les analyses détaillées nous permettent de prendre des décisions éclairées rapidement.",
			rating: 5,
		},
		{
			name: "Sophie Chen",
			role: "Directrice R&D, FutureTech",
			content:
				"Un outil indispensable pour tout chef de projet qui veut maximiser l&apos;impact de son équipe.",
			rating: 5,
		},
	];

	const pricingPlans = [
		{
			name: "Starter",
			price: "0",
			period: "Gratuit",
			description: "Parfait pour débuter",
			features: [
				"Jusqu&apos;à 5 projets",
				"Analyses de base",
				"Support communautaire",
				"1 utilisateur",
			],
			cta: "Commencer gratuitement",
			popular: false,
		},
		{
			name: "Professional",
			price: "29",
			period: "/mois",
			description: "Pour les équipes en croissance",
			features: [
				"Projets illimités",
				"Analyses avancées",
				"Support prioritaire",
				"Jusqu&apos;à 10 utilisateurs",
				"Intégrations API",
				"Rapports personnalisés",
			],
			cta: "Essai gratuit 14 jours",
			popular: true,
		},
		{
			name: "Enterprise",
			price: "99",
			period: "/mois",
			description: "Pour les grandes organisations",
			features: [
				"Tout du plan Professional",
				"Utilisateurs illimités",
				"Support dédié",
				"Formation personnalisée",
				"Sécurité avancée",
				"SLA garanti",
			],
			cta: "Contactez-nous",
			popular: false,
		},
	];

	return (
		<div className="min-h-screen bg-white">
			<Header />

			{/* Hero Section - Votre composant existant */}
			<Hero />

			{/* Features Section */}
			<section id="features" className="py-24 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Tout ce dont vous avez besoin pour réussir
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Des outils puissants conçus pour simplifier la gestion de vos projets
						</p>
					</div>

					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8">
							{features.map((feature, index) => (
								<div
									key={index}
									className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
										activeFeature === index
											? "bg-white shadow-lg border-2 border-blue-200"
											: "bg-white/50 hover:bg-white hover:shadow-md"
									}`}
									onClick={() => setActiveFeature(index)}
								>
									<div className="flex items-start gap-4">
										<div
											className={`p-3 rounded-xl ${
												activeFeature === index
													? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
													: "bg-gray-100 text-gray-600"
											}`}
										>
											{feature.icon}
										</div>
										<div>
											<h3 className="text-xl font-semibold text-gray-900 mb-2">
												{feature.title}
											</h3>
											<p className="text-gray-600">{feature.description}</p>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="relative">
							<div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
								<div className="text-center">
									<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
										{features[activeFeature].icon}
									</div>
									<h4 className="text-lg font-semibold text-gray-900">
										{features[activeFeature].title}
									</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Comment ça marche Section */}
			<section id="how" className="py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Comment ça marche ?
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Trois étapes simples pour optimiser vos projets
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								step: "1",
								title: "Créez vos projets",
								description:
									"Ajoutez vos projets et définissez leurs critères de priorité",
								icon: <Target className="w-8 h-8" />,
							},
							{
								step: "2",
								title: "Analysez et priorisez",
								description:
									"Utilisez nos matrices de décision pour identifier les projets prioritaires",
								icon: <BarChart3 className="w-8 h-8" />,
							},
							{
								step: "3",
								title: "Suivez et optimisez",
								description:
									"Mesurez les performances et ajustez vos stratégies en temps réel",
								icon: <TrendingUp className="w-8 h-8" />,
							},
						].map((step, index) => (
							<div key={index} className="text-center">
								<div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
									<span className="text-white font-bold text-xl">{step.step}</span>
								</div>
								<div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600">
									{step.icon}
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-3">
									{step.title}
								</h3>
								<p className="text-gray-600">{step.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-24 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8">
						{[
							{
								number: "10k+",
								label: "Projets gérés",
								icon: <Target className="w-8 h-8" />,
							},
							{
								number: "500+",
								label: "Équipes actives",
								icon: <Users className="w-8 h-8" />,
							},
							{
								number: "99.9%",
								label: "Temps de fonctionnement",
								icon: <Zap className="w-8 h-8" />,
							},
							{
								number: "4.9/5",
								label: "Satisfaction client",
								icon: <Star className="w-8 h-8" />,
							},
						].map((stat, index) => (
							<div key={index} className="text-center">
								<div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
									<div className="text-white">{stat.icon}</div>
								</div>
								<div className="text-3xl font-bold text-gray-900 mb-2">
									{stat.number}
								</div>
								<div className="text-gray-600">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Ce que disent nos clients
						</h2>
						<p className="text-xl text-gray-600">
							Rejoignez des milliers d&apos;équipes qui font confiance à Worth It
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<Card
								key={index}
								className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow"
							>
								<CardContent className="p-8">
									<div className="flex mb-4">
										{[...Array(testimonial.rating)].map((_, i) => (
											<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
										))}
									</div>
									<p className="text-gray-600 mb-6 leading-relaxed">
										&ldquo;{testimonial.content}&rdquo;
									</p>
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
											{testimonial.name.charAt(0)}
										</div>
										<div>
											<div className="font-semibold text-gray-900">{testimonial.name}</div>
											<div className="text-sm text-gray-500">{testimonial.role}</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section className="py-24 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Choisissez votre plan
						</h2>
						<p className="text-xl text-gray-600">
							Des options flexibles qui s&apos;adaptent à vos besoins
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{pricingPlans.map((plan, index) => (
							<Card
								key={index}
								className={`relative ${
									plan.popular
										? "border-2 border-blue-500 shadow-xl scale-105"
										: "border border-gray-200"
								}`}
							>
								{plan.popular && (
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
										<Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
											⭐ Plus populaire
										</Badge>
									</div>
								)}
								<CardHeader className="text-center pb-8">
									<CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
									<CardDescription className="text-gray-600">
										{plan.description}
									</CardDescription>
									<div className="mt-4">
										<span className="text-4xl font-bold text-gray-900">
											{plan.price}€
										</span>
										<span className="text-gray-600">{plan.period}</span>
									</div>
								</CardHeader>
								<CardContent className="space-y-4">
									<ul className="space-y-3">
										{plan.features.map((feature, featureIndex) => (
											<li key={featureIndex} className="flex items-center gap-3">
												<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
												<span className="text-gray-600">{feature}</span>
											</li>
										))}
									</ul>
									<Button
										className={`w-full mt-8 ${
											plan.popular
												? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
												: "variant-outline"
										}`}
									>
										{plan.cta}
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section
				id="contact"
				className="py-24 bg-gradient-to-r from-blue-600 to-purple-600"
			>
				<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
						Prêt à transformer votre gestion de projet ?
					</h2>
					<p className="text-xl text-blue-100 mb-8">
						Rejoignez des milliers d&apos;équipes qui utilisent Worth It pour
						atteindre leurs objectifs plus rapidement.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						{session ? (
							<Link href="/dashboard">
								<Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
									Accéder au tableau de bord
									<ArrowRight className="w-5 h-5 ml-2" />
								</Button>
							</Link>
						) : (
							<Button
								size="lg"
								variant="secondary"
								className="px-8 py-4 text-lg"
								onClick={() => signIn()}
							>
								Commencer gratuitement
								<ArrowRight className="w-5 h-5 ml-2" />
							</Button>
						)}
						<Button
							variant="outline"
							size="lg"
							className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600"
						>
							Planifier une démo
						</Button>
					</div>
					<p className="text-blue-100 text-sm mt-4">
						Essai gratuit de 14 jours • Annulation à tout moment
					</p>
				</div>
			</section>

			{/* Footer */}
		</div>
	);
}