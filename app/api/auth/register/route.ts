import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { registerUser } from "@/lib/auth";

// Schema de validation pour l'inscription
const registerSchema = z.object({
	name: z.string().min(1, "Le nom est requis"),
	email: z.string().email("Email invalide"),
	password: z
		.string()
		.min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { name, email, password } = registerSchema.parse(body);

		const result = await registerUser(name, email, password);

		return NextResponse.json(
			result.success
				? { success: true, user: result.user }
				: { error: result.error },
			{ status: result.status }
		);
	} catch (error) {
		console.error("Erreur lors de l'inscription:", error);

		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.errors }, { status: 400 });
		}

		return NextResponse.json(
			{ error: "Une erreur est survenue lors de l'inscription" },
			{ status: 500 }
		);
	}
}
