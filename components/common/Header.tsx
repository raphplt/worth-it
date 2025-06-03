import React from "react";
import NewProject from "./NewProject";
import { Settings, LogIn, LogOut } from "lucide-react";
import { useRefresh } from "@/context/RefreshContext";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DASHBOARD_ROUTE, LANDING_ROUTE } from "@/helpers/routes";

const Header = () => {
	const { triggerRefresh } = useRefresh();
	const { data: session } = useSession();

	const handleProjectCreated = () => {
		triggerRefresh();
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link
						href={session ? DASHBOARD_ROUTE : LANDING_ROUTE}
						className="flex items-center gap-3 hover:opacity-80 transition-opacity"
					>
						<div className="relative w-8 h-8">
							<Image
								src="/images/Logo.png"
								alt="Worth It Logo"
								width={32}
								height={32}
								priority
								className="w-8 h-8 object-contain"
							/>
						</div>
						<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Worth It
						</h1>
					</Link>

					<nav className="flex items-center gap-4">
						{session ? (
							<>
								<NewProject onProjectCreated={handleProjectCreated} />
								<Link
									href="/settings"
									className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
								>
									<Settings className="w-5 h-5" />
								</Link>
								<Button
									variant="ghost"
									size="sm"
									className="flex items-center gap-2"
									onClick={() =>
										signOut({
											callbackUrl: LANDING_ROUTE,
											redirect: true,
										})
									}
								>
									<LogOut className="w-4 h-4" />
									<span className="hidden sm:inline">Déconnexion</span>
								</Button>
							</>
						) : (
							<Button
								variant="default"
								size="sm"
								className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
								onClick={() => signIn()}
							>
								<LogIn className="w-4 h-4" />
								<span>Connexion</span>
							</Button>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;