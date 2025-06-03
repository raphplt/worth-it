import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-4 gap-8">
					<div className="col-span-1">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold">W</span>
							</div>
							<span className="text-xl font-bold">Worth It</span>
						</div>
						<p className="text-gray-400 mb-4">
							L&apos;outil de gestion de projet qui vous aide à prioriser et réussir
							vos projets.
						</p>
					</div>

					<div>
						<h4 className="font-semibold mb-4">Produit</h4>
						<ul className="space-y-2 text-gray-400">
							<li>
								<Link href="/features" className="hover:text-white">
									Fonctionnalités
								</Link>
							</li>
							<li>
								<Link href="/pricing" className="hover:text-white">
									Tarifs
								</Link>
							</li>
							<li>
								<Link href="/demo" className="hover:text-white">
									Démo
								</Link>
							</li>
							<li>
								<Link href="/api" className="hover:text-white">
									API
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-semibold mb-4">Entreprise</h4>
						<ul className="space-y-2 text-gray-400">
							<li>
								<Link href="/about" className="hover:text-white">
									À propos
								</Link>
							</li>
							<li>
								<Link href="/careers" className="hover:text-white">
									Carrières
								</Link>
							</li>
							<li>
								<Link href="/contact" className="hover:text-white">
									Contact
								</Link>
							</li>
							<li>
								<Link href="/blog" className="hover:text-white">
									Blog
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-semibold mb-4">Support</h4>
						<ul className="space-y-2 text-gray-400">
							<li>
								<Link href="/help" className="hover:text-white">
									Centre d&apos;aide
								</Link>
							</li>
							<li>
								<Link href="/docs" className="hover:text-white">
									Documentation
								</Link>
							</li>
							<li>
								<Link href="/status" className="hover:text-white">
									Statut
								</Link>
							</li>
							<li>
								<Link href="/security" className="hover:text-white">
									Sécurité
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-gray-400 text-sm">
						© 2025 Worth It. Tous droits réservés.
					</p>
					<div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
						<Link href="/privacy" className="hover:text-white">
							Politique de confidentialité
						</Link>
						<Link href="/terms" className="hover:text-white">
							Conditions d&apos;utilisation
						</Link>
						<Link href="/cookies" className="hover:text-white">
							Cookies
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
