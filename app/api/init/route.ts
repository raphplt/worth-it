import { NextResponse } from "next/server";
import { initDb } from "@/lib/db";

export async function GET() {
	try {
		const result = await initDb();
		if (result.success) {
			return NextResponse.json({
				message: "Base de données initialisée avec succès",
			});
		}
		return NextResponse.json(
			{ message: "Erreur lors de l'initialisation", error: result.error },
			{ status: 500 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Erreur lors de l'initialisation" },
			{ status: 500 }
		);
	}
}
