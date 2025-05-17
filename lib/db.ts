import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Création de la connexion à la base de données
export const db = await open({
	filename: "./worthit.db",
	driver: sqlite3.Database,
});

// Initialisation de la base de données
await db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        priority INTEGER,
        time BOOLEAN,
        urgent BOOLEAN,
        important BOOLEAN,
        desire BOOLEAN,
        relevance TEXT,
        weekly_hours INTEGER,
        preferred_days TEXT,
        preferred_hours TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);
