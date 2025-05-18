import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { auth } from "@/auth";

// Types pour les projets
interface Project {
	id: number;
	name: string;
	description: string | null;
	priority: number | null;
	time: boolean | null;
	urgent: boolean | null;
	important: boolean | null;
	desire: boolean | null;
	relevance: string | null;
	weekly_hours: number | null;
	preferred_days: string | null;
	preferred_hours: string | null;
	created_at: Date;
	user_id: string;
}

// Récupérer tous les projets de l'utilisateur connecté
export async function getProjects() {
	const session = await auth();

	if (!session || !session.user) {
		return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
	}

	try {
		const { rows } = await sql`
			SELECT * FROM projects 
			WHERE user_id = ${session.user.id}
			ORDER BY created_at DESC
		`;

		return NextResponse.json(rows);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ message: "Unknown error" }, { status: 500 });
		}
	}
}

// Créer un nouveau projet pour l'utilisateur connecté
export async function createProject(request: Request) {
	const session = await auth();

	if (!session || !session.user || !session.user.id) {
		return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
	}

	try {
		// Vérifier que l'utilisateur existe dans la base de données
		const { rows: users } = await sql`
			SELECT id FROM users WHERE id = ${session.user.id}
		`;

		if (users.length === 0) {
			return NextResponse.json(
				{ message: "Utilisateur introuvable dans la base de données" },
				{ status: 404 }
			);
		}

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

		const { rows } = await sql`
			INSERT INTO projects (
				name, description, priority, time, urgent, important,
				desire, relevance, weekly_hours, preferred_days, preferred_hours, user_id
			) VALUES (
				${name}, 
				${description}, 
				${priority}, 
				${time}, 
				${urgent}, 
				${important}, 
				${desire}, 
				${relevance}, 
				${weeklyHours}, 
				${JSON.stringify(preferredDays)}, 
				${JSON.stringify(preferredHours)}, 
				${session.user.id}
			)
			RETURNING id, name
		`;

		return NextResponse.json({
			message: "Project saved successfully",
			projectId: rows[0].id,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ message: "Unknown error" }, { status: 500 });
		}
	}
}

// Mettre à jour un projet existant
export async function updateProject(request: Request) {
	const session = await auth();

	if (!session || !session.user) {
		return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
	}

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

		// Vérifier que le projet appartient à l'utilisateur
		const { rows: projects } = await sql`
			SELECT * FROM projects WHERE id = ${id}
		`;

		if (projects.length === 0 || projects[0].user_id !== session.user.id) {
			return NextResponse.json({ message: "Non autorisé" }, { status: 403 });
		}

		await sql`
			UPDATE projects SET 
				name = ${name},
				description = ${description},
				priority = ${priority},
				time = ${time},
				urgent = ${urgent},
				important = ${important},
				desire = ${desire},
				relevance = ${relevance},
				weekly_hours = ${weeklyHours},
				preferred_days = ${JSON.stringify(preferredDays)},
				preferred_hours = ${JSON.stringify(preferredHours)}
			WHERE id = ${id}
		`;

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

// Supprimer un projet ou tous les projets de l'utilisateur
export async function deleteProject(request: Request) {
	const session = await auth();

	if (!session || !session.user) {
		return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
	}

	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const deleteAll = searchParams.get("deleteAll") === "true";

		if (deleteAll) {
			await sql`
				DELETE FROM projects 
				WHERE user_id = ${session.user.id}
			`;
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

		// Vérifier que le projet appartient à l'utilisateur
		const { rows: projects } = await sql`
			SELECT * FROM projects WHERE id = ${parseInt(id)}
		`;

		if (projects.length === 0 || projects[0].user_id !== session.user.id) {
			return NextResponse.json({ message: "Non autorisé" }, { status: 403 });
		}

		await sql`
			DELETE FROM projects 
			WHERE id = ${parseInt(id)}
		`;

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
