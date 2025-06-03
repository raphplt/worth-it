import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RefreshProvider } from "@/context/RefreshContext";
import { Toaster } from "sonner";
import { Providers } from "@/components/common/Providers";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Worth It - Gestion de projets intelligente",
	description:
		"Planifiez, collaborez et suivez la progression de vos équipes en temps réel. Worth It simplifie la gestion de projet pour tous.",
	keywords: "gestion de projet, collaboration, productivité, équipe, ROI",
	authors: [{ name: "Worth It Team" }],
	openGraph: {
		title: "Worth It - Gestion de projets intelligente",
		description: "L'outil qui vous aide à prioriser et réussir vos projets",
		url: "https://worth-it.com",
		siteName: "Worth It",
		images: [
			{
				url: "/images/og-image.png",
				width: 1200,
				height: 630,
			},
		],
		locale: "fr_FR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Worth It - Gestion de projets intelligente",
		description: "L'outil qui vous aide à prioriser et réussir vos projets",
		images: ["/images/og-image.png"],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr">
			<body className={inter.className}>
				<Providers>
					<RefreshProvider>
						{children}
						<Toaster />
						<Footer />
					</RefreshProvider>
				</Providers>
			</body>
		</html>
	);
}
