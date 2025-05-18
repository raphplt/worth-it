"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Github } from "lucide-react";

const formSchema = z.object({
	email: z.string().email("Email invalide"),
	password: z
		.string()
		.min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export function LoginForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);

		try {
			const result = await signIn("credentials", {
				email: values.email,
				password: values.password,
				redirect: false,
			});

			if (result?.error) {
				toast.error("Email ou mot de passe incorrect");
				return;
			}

			router.push("/");
			router.refresh();
		} catch (error) {
			if (error instanceof Error) toast.error("Une erreur est survenue");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="space-y-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="exemple@email.com"
										type="email"
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mot de passe</FormLabel>
								<FormControl>
									<Input
										placeholder="••••••••"
										type="password"
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Connexion..." : "Se connecter"}
					</Button>
				</form>
			</Form>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Ou continuez avec
					</span>
				</div>
			</div>

			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
				className="w-full"
				onClick={() => signIn("github", { callbackUrl: "/" })}
			>
				<Github className="mr-2 h-4 w-4" />
				GitHub
			</Button>
		</div>
	);
}
