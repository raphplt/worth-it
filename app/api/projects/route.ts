import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
	getProjects,
	createProject,
	updateProject,
	deleteProject,
	deleteAllProjects,
} from "@/lib/projects";

async function checkAuth() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return null;
	}

	return session.user.id;
}

export async function GET() {
	try {
		const userId = await checkAuth();

		if (!userId) {
			return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
		}

		const result = await getProjects(userId);

		if (!result.success) {
			return NextResponse.json({ message: result.error }, { status: 500 });
		}

		return NextResponse.json(result.data);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ message: "Unknown error" }, { status: 500 });
		}
	}
}

export async function POST(request: NextRequest) {
	try {
		const userId = await checkAuth();

		if (!userId) {
			return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
		}

		const body = await request.json();
		const result = await createProject(userId, body);

		if (!result.success) {
			return NextResponse.json({ message: result.error }, { status: 500 });
		}

		return NextResponse.json({
			message: result.message,
			projectId: result.projectId,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ message: "Unknown error" }, { status: 500 });
		}
	}
}

export async function PUT(request: NextRequest) {
	try {
		const userId = await checkAuth();

		if (!userId) {
			return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
		}

		const body = await request.json();
		const { id, ...projectData } = body;

		if (!id) {
			return NextResponse.json(
				{ message: "ID du projet requis" },
				{ status: 400 }
			);
		}

		const result = await updateProject(userId, id, projectData);

		if (!result.success) {
			return NextResponse.json({ message: result.error }, { status: 500 });
		}

		return NextResponse.json({
			message: result.message,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ message: "Unknown error" }, { status: 500 });
		}
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const userId = await checkAuth();

		if (!userId) {
			return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
		}

		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const deleteAll = searchParams.get("deleteAll") === "true";

		if (deleteAll) {
			const result = await deleteAllProjects(userId);

			if (!result.success) {
				return NextResponse.json({ message: result.error }, { status: 500 });
			}

			return NextResponse.json({
				message: result.message,
			});
		}

		if (!id) {
			return NextResponse.json(
				{ message: "Project ID is required" },
				{ status: 400 }
			);
		}

		const result = await deleteProject(userId, parseInt(id));

		if (!result.success) {
			return NextResponse.json({ message: result.error }, { status: 500 });
		}

		return NextResponse.json({
			message: result.message,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ message: "Unknown error" }, { status: 500 });
		}
	}
}
