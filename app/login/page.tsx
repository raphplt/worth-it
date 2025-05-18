import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
	return (
		<div className="container mx-auto max-w-md px-4 py-8">
			<h1 className="text-2xl font-bold mb-6">Connexion</h1>

			<LoginForm />

			<div className="mt-4 text-center">
				<p>
					Vous n&apos;avez pas de compte ?{" "}
					<Link href="/register" className="text-blue-600 hover:underline">
						Inscrivez-vous
					</Link>
				</p>
			</div>
		</div>
	);
}
