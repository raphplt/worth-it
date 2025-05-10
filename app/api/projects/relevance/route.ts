import { calculateProjectRelevance } from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const relevance = calculateProjectRelevance(
			body.priority,
			body.time,
			body.urgent,
			body.important,
			body.desire
		);
		return NextResponse.json({ relevance });
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ message: "Unknown error" }, { status: 500 });
		}
	}
}
