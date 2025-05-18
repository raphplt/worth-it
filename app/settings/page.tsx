"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
	const { user, signOut } = useAuth();

	if (!user) {
		return null;
	}

	return (
		<div className="container max-w-2xl py-8">
			<Card>
				<CardHeader>
					<CardTitle>Paramètres du compte</CardTitle>
					<CardDescription>Gérez vos informations personnelles</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex items-center space-x-4">
						<Avatar className="h-16 w-16">
							<AvatarImage src={user.image} alt={user.name} />
							<AvatarFallback className="text-lg">
								{user.name?.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="text-lg font-medium">{user.name}</h3>
							<p className="text-sm text-gray-500">{user.email}</p>
						</div>
					</div>

					<div className="pt-4">
						<Button variant="destructive" onClick={() => signOut()}>
							Déconnexion
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
