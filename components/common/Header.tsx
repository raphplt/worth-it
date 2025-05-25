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
		<div className="mb-8 fixed top-0 left-0 right-0 z-50 bg-white p-4 shadow-sm">
			<div className="container mx-auto flex justify-between items-center">
				<Link
					href={session ? DASHBOARD_ROUTE : LANDING_ROUTE}
					className="flex items-center justify-center gap-2"
				>
					<div className="relative w-8 h-8">
						<Image
							src="/images/Logo.png"
							alt="Worth It Logo"
							width={75}
							height={75}
							priority
							className="w-6"
						/>
					</div>
					<h1 className="text-2xl font-bold">Worth It</h1>
				</Link>
				<div className="flex items-center gap-4">
					{session ? (
						<>
							<NewProject onProjectCreated={handleProjectCreated} />
							<Link href="/settings" className="text-gray-600 hover:text-gray-900">
								<Settings className="w-6 h-6" />
							</Link>
							<Button
								variant="ghost"
								className="flex items-center gap-2"
								onClick={() => signOut({ callbackUrl: LANDING_ROUTE })}
							>
								<LogOut className="w-5 h-5" />
								<span className="hidden sm:inline">Déconnexion</span>
							</Button>
						</>
					) : (
						<Button
							variant="default"
							className="flex items-center gap-2"
							onClick={() => signIn()}
						>
							<LogIn className="w-5 h-5" />
							<span>Connexion</span>
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
