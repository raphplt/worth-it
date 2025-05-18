import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
	return (
		<div className="container mx-auto max-w-md px-4 py-8">
			<h1 className="text-2xl font-bold mb-6">Créer un compte</h1>

			<RegisterForm />

			<div className="mt-4 text-center">
				<p>
					Vous avez déjà un compte ?{" "}
					<Link href="/login" className="text-blue-600 hover:underline">
						Connectez-vous
					</Link>
				</p>
			</div>
		</div>
	);
}
