"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Header from "@/components/common/Header";
import { RefreshProvider } from "@/context/RefreshContext";
import { AuthProvider } from "@/components/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr">
			<body className={`${inter.className} bg-gray-50 min-h-screen`}>
				<AuthProvider>
					<RefreshProvider>
						<div className="container mx-auto p-4">
							<Header />
							<div className="mt-16">{children}</div>
						</div>
						<Toaster richColors position="top-center" />
					</RefreshProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
