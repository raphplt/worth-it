"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
	email: z.string().email("Veuillez entrer un email valide"),
	password: z
		.string()
		.min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormValues) => {
		setIsLoading(true);
		setError(null);

		try {
			const result = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.error) {
				setError("Identifiants invalides. Veuillez réessayer.");
				return;
			}

			// Rediriger vers la page d'accueil après connexion réussie
			router.push("/");
			router.refresh();
		} catch {
			setError("Une erreur est survenue. Veuillez réessayer.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					{error}
				</div>
			)}

			<div>
				<label htmlFor="email" className="block text-sm font-medium mb-1">
					Email
				</label>
				<input
					{...register("email")}
					type="email"
					id="email"
					className="w-full px-3 py-2 border rounded-md"
					disabled={isLoading}
				/>
				{errors.email && (
					<span className="text-sm text-red-500">{errors.email.message}</span>
				)}
			</div>

			<div>
				<label htmlFor="password" className="block text-sm font-medium mb-1">
					Mot de passe
				</label>
				<input
					{...register("password")}
					type="password"
					id="password"
					className="w-full px-3 py-2 border rounded-md"
					disabled={isLoading}
				/>
				{errors.password && (
					<span className="text-sm text-red-500">{errors.password.message}</span>
				)}
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
			>
				{isLoading ? "Connexion en cours..." : "Se connecter"}
			</button>
		</form>
	);
}
