import { sql } from "@vercel/postgres";

export type ProjectData = {
	name: string;
	description?: string;
	priority?: number;
	time?: boolean;
	urgent?: boolean;
	important?: boolean;
	desire?: boolean;
	relevance?: string;
	weeklyHours?: number;
	preferredDays?: string[];
	preferredHours?: string[];
};

// Récupère tous les projets d'un utilisateur
export async function getProjects(userId: string) {
	try {
		const { rows: projects } = await sql`
      SELECT * FROM projects 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;

		return { success: true, data: projects };
	} catch (error) {
		console.error("Erreur lors de la récupération des projets:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Erreur inconnue",
		};
	}
}

// Crée un nouveau projet
export async function createProject(userId: string, projectData: ProjectData) {
	try {
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
		} = projectData;

		const { rows } = await sql`
      INSERT INTO projects (
        name, description, priority, time, urgent, important, 
        desire, relevance, weekly_hours, preferred_days, 
        preferred_hours, created_at, user_id
      ) VALUES (
        ${name}, 
        ${description || null}, 
        ${priority || null}, 
        ${time || false}, 
        ${urgent || false}, 
        ${important || false}, 
        ${desire || false}, 
        ${relevance || null}, 
        ${weeklyHours || null}, 
        ${preferredDays ? JSON.stringify(preferredDays) : null}, 
        ${preferredHours ? JSON.stringify(preferredHours) : null}, 
        CURRENT_TIMESTAMP,
        ${userId}
      )
      RETURNING id
    `;

		return {
			success: true,
			message: "Projet enregistré avec succès",
			projectId: rows[0]?.id,
		};
	} catch (error) {
		console.error("Erreur lors de la création du projet:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Erreur inconnue",
		};
	}
}

// Met à jour un projet existant
export async function updateProject(
	userId: string,
	id: number,
	projectData: ProjectData
) {
	try {
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
		} = projectData;

		await sql`
      UPDATE projects SET 
        name = ${name}, 
        description = ${description || null}, 
        priority = ${priority || null}, 
        time = ${time || false}, 
        urgent = ${urgent || false}, 
        important = ${important || false}, 
        desire = ${desire || false}, 
        relevance = ${relevance || null},
        weekly_hours = ${weeklyHours || null},
        preferred_days = ${preferredDays ? JSON.stringify(preferredDays) : null},
        preferred_hours = ${preferredHours ? JSON.stringify(preferredHours) : null}
      WHERE id = ${id} AND user_id = ${userId}
    `;

		return { success: true, message: "Projet mis à jour avec succès" };
	} catch (error) {
		console.error("Erreur lors de la mise à jour du projet:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Erreur inconnue",
		};
	}
}

// Supprime un projet
export async function deleteProject(userId: string, id: number) {
	try {
		await sql`DELETE FROM projects WHERE id = ${id} AND user_id = ${userId}`;
		return { success: true, message: "Projet supprimé avec succès" };
	} catch (error) {
		console.error("Erreur lors de la suppression du projet:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Erreur inconnue",
		};
	}
}

// Supprime tous les projets d'un utilisateur
export async function deleteAllProjects(userId: string) {
	try {
		await sql`DELETE FROM projects WHERE user_id = ${userId}`;
		return { success: true, message: "Tous les projets ont été supprimés" };
	} catch (error) {
		console.error("Erreur lors de la suppression de tous les projets:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Erreur inconnue",
		};
	}
}
