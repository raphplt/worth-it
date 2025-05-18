"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
	const { user, loading, signIn, signOut } = useAuth();

	return (
		<header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				<Link href="/" className="text-xl font-bold">
					Worth It
				</Link>

				<nav className="flex items-center gap-4">
					{loading ? (
						<div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
					) : user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="relative h-8 w-8 rounded-full">
									<Avatar className="h-8 w-8">
										<AvatarImage src={user.image} alt={user.name} />
										<AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem asChild>
									<Link href="/settings">Paramètres</Link>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => signOut()}>
									Déconnexion
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button onClick={() => signIn()}>Connexion</Button>
					)}
				</nav>
			</div>
		</header>
	);
}
