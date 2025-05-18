import { PrismaClient } from "@prisma/client";

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

// Cette approche évite de multiples instances de Prisma Client en développement
// et garantit une instance unique en production
export const prisma =
	global.prisma ||
	new PrismaClient({
		log:
			process.env.NODE_ENV === "development"
				? ["query", "error", "warn"]
				: ["error"],
	});

// En développement, attacher à l'objet global pour la persistance entre les hot reloads
if (process.env.NODE_ENV !== "production") {
	global.prisma = prisma;
}
