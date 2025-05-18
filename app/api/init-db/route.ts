import { NextRequest, NextResponse } from "next/server";
import { initDatabase } from "@/lib/init-db";

export async function POST(req: NextRequest) {
	try {
		const isDevEnv = process.env.NODE_ENV === "development";
		const authHeader = req.headers.get("Authorization");
		const isAuthorized = authHeader === `Bearer ${process.env.ADMIN_SECRET_KEY}`;

		if (!isDevEnv && !isAuthorized) {
			return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
		}

		const result = await initDatabase();

		if (!result.success) {
			return NextResponse.json(
				{
					error: "Erreur lors de l'initialisation de la base de données",
					details: result.error,
				},
				{ status: 500 }
			);
		}

		return NextResponse.json({
			success: true,
			message: "Base de données initialisée avec succès",
		});
	} catch (error) {
		console.error(
			"Erreur lors de l'initialisation de la base de données:",
			error
		);
		return NextResponse.json(
			{ error: "Une erreur est survenue lors de l'initialisation" },
			{ status: 500 }
		);
	}
}
