import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/users";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const result = await registerUser(body);

		if (!result.success) {
			return NextResponse.json({ message: result.error }, { status: 400 });
		}

		return NextResponse.json({ user: result.user }, { status: 201 });
	} catch (error) {
		console.error("Erreur lors de l'inscription:", error);
		return NextResponse.json(
			{ message: "Une erreur est survenue lors de l'inscription" },
			{ status: 500 }
		);
	}
}
