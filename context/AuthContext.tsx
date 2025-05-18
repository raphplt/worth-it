"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type User = {
	id: string;
	name: string;
	email: string;
	image?: string;
};

type AuthContextType = {
	user: User | null;
	loading: boolean;
	signIn: (provider?: string) => Promise<void>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { data: session, status } = useSession();
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (session?.user) {
			setUser({
				id: session.user.id,
				name: session.user.name || "",
				email: session.user.email || "",
				image: session.user.image || undefined,
			});
		} else {
			setUser(null);
		}
	}, [session]);

	const handleSignIn = async (provider?: string) => {
		try {
			await signIn(provider);
		} catch (error) {
			console.error("Erreur lors de la connexion:", error);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOut({ redirect: false });
			router.push("/");
		} catch (error) {
			console.error("Erreur lors de la déconnexion:", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading: status === "loading",
				signIn: handleSignIn,
				signOut: handleSignOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
	}
	return context;
}
