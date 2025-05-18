"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const registerSchema = z
	.object({
		name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
		email: z.string().email("Veuillez entrer un email valide"),
		password: z
			.string()
			.min(8, "Le mot de passe doit contenir au moins 8 caractères"),
		confirmPassword: z.string().min(8, "Veuillez confirmer votre mot de passe"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Les mots de passe ne correspondent pas",
		path: ["confirmPassword"],
	});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormValues) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: data.name,
					email: data.email,
					password: data.password,
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				setError(result.error || "Une erreur est survenue lors de l'inscription.");
				return;
			}

			// Connecter l'utilisateur automatiquement après inscription
			const signInResult = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (signInResult?.error) {
				setError(
					"Inscription réussie, mais impossible de vous connecter automatiquement. Veuillez vous connecter manuellement."
				);
				router.push("/login");
				return;
			}

			// Rediriger vers la page d'accueil après inscription et connexion réussies
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
				<label htmlFor="name" className="block text-sm font-medium mb-1">
					Nom
				</label>
				<input
					{...register("name")}
					type="text"
					id="name"
					className="w-full px-3 py-2 border rounded-md"
					disabled={isLoading}
				/>
				{errors.name && (
					<span className="text-sm text-red-500">{errors.name.message}</span>
				)}
			</div>

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

			<div>
				<label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
					Confirmer le mot de passe
				</label>
				<input
					{...register("confirmPassword")}
					type="password"
					id="confirmPassword"
					className="w-full px-3 py-2 border rounded-md"
					disabled={isLoading}
				/>
				{errors.confirmPassword && (
					<span className="text-sm text-red-500">
						{errors.confirmPassword.message}
					</span>
				)}
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
			>
				{isLoading ? "Inscription en cours..." : "S'inscrire"}
			</button>
		</form>
	);
}
