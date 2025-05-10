import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		console.log("GET request received" + request.url);
		return NextResponse.json({ message: "Hello from the GET route!" });
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ message: "Unknown error" }, { status: 500 });
		}
	}
}
