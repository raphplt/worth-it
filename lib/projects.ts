import { NextResponse } from "next/server";
import { prisma } from "./prisma";
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
		const projects = await prisma.project.findMany({
			where: { userId: session.user.id },
			orderBy: { created_at: "desc" },
		});
		return NextResponse.json(projects);
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
		const user = await prisma.user.findUnique({ where: { id: session.user.id } });
		if (!user) {
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

		const project = await prisma.project.create({
			data: {
				name,
				description,
				priority,
				time,
				urgent,
				important,
				desire,
				relevance,
				weekly_hours: weeklyHours,
				preferred_days: JSON.stringify(preferredDays),
				preferred_hours: JSON.stringify(preferredHours),
				user: { connect: { id: session.user.id } },
			},
			select: { id: true, name: true },
		});

		return NextResponse.json({
			message: "Project saved successfully",
			projectId: project.id,
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

		const project = await prisma.project.findUnique({ where: { id } });
		if (!project || project.userId !== session.user.id) {
			return NextResponse.json({ message: "Non autorisé" }, { status: 403 });
		}

		await prisma.project.update({
			where: { id },
			data: {
				name,
				description,
				priority,
				time,
				urgent,
				important,
				desire,
				relevance,
				weekly_hours: weeklyHours,
				preferred_days: JSON.stringify(preferredDays),
				preferred_hours: JSON.stringify(preferredHours),
			},
		});

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
			await prisma.project.deleteMany({ where: { userId: session.user.id } });
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

		const project = await prisma.project.findUnique({
			where: { id: Number(id) },
		});
		if (!project || project.userId !== session.user.id) {
			return NextResponse.json({ message: "Non autorisé" }, { status: 403 });
		}

		await prisma.project.delete({ where: { id: Number(id) } });

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
