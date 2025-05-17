import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
	try {
		const projects = await db.all(
			"SELECT * FROM projects ORDER BY created_at DESC"
		);
		return NextResponse.json(projects);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ message: "Unknown error" }, { status: 500 });
		}
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const {
			name,
			description,
			priority,
			time,
			urgent,
			important,
			desire,
			relevance,
			weeklyHours,
			preferredDays,
			preferredHours,
		} = body;

		const result = await db.run(
			`INSERT INTO projects (
				name, description, priority, time, urgent, important, 
				desire, relevance, weekly_hours, preferred_days, 
				preferred_hours, created_at
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
			[
				name,
				description,
				priority,
				time,
				urgent,
				important,
				desire,
				relevance,
				weeklyHours,
				JSON.stringify(preferredDays),
				JSON.stringify(preferredHours),
			]
		);

		return NextResponse.json({
			message: "Project saved successfully",
			projectId: result.lastID,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ message: "Unknown error" }, { status: 500 });
		}
	}
}

export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const {
			id,
			name,
			description,
			priority,
			time,
			urgent,
			important,
			desire,
			relevance,
			weeklyHours,
			preferredDays,
			preferredHours,
		} = body;

		await db.run(
			`UPDATE projects SET 
				name = ?, 
				description = ?, 
				priority = ?, 
				time = ?, 
				urgent = ?, 
				important = ?, 
				desire = ?, 
				relevance = ?,
				weekly_hours = ?,
				preferred_days = ?,
				preferred_hours = ?
			WHERE id = ?`,
			[
				name,
				description,
				priority,
				time,
				urgent,
				important,
				desire,
				relevance,
				weeklyHours,
				JSON.stringify(preferredDays),
				JSON.stringify(preferredHours),
				id,
			]
		);

		return NextResponse.json({
			message: "Project updated successfully",
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ message: "Unknown error" }, { status: 500 });
		}
	}
}

export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const deleteAll = searchParams.get("deleteAll") === "true";

		if (deleteAll) {
			await db.run("DELETE FROM projects");
			return NextResponse.json({
				message: "All projects deleted successfully",
			});
		}

		if (!id) {
			return NextResponse.json(
				{ message: "Project ID is required" },
				{ status: 400 }
			);
		}

		await db.run("DELETE FROM projects WHERE id = ?", [id]);

		return NextResponse.json({
			message: "Project deleted successfully",
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ message: "Unknown error" }, { status: 500 });
		}
	}
}
