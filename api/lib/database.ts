import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import type { Activite } from "./types";

const dataDirectory = path.join(process.cwd(), "data");
fs.mkdirSync(dataDirectory, { recursive: true });

const database = new Database(path.join(dataDirectory, "wakelab.db"));
database.pragma("journal_mode = WAL");

database.exec(`
  CREATE TABLE IF NOT EXISTS activites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    theme TEXT NOT NULL CHECK (theme IN ('jeu', 'apprentissage', 'exercice', 'autre')),
    objectifs TEXT,
    duree INTEGER NOT NULL CHECK (duree BETWEEN 10 AND 20),
    description TEXT NOT NULL,
    auteur TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  )
`);

const count = database.prepare("SELECT COUNT(*) AS total FROM activites").get() as { total: number };

if (count.total === 0) {
  const insert = database.prepare(`
    INSERT INTO activites (titre, theme, objectifs, duree, description, auteur, createdAt, updatedAt)
    VALUES (@titre, @theme, @objectifs, @duree, @description, @auteur, @createdAt, @updatedAt)
  `);
  const now = new Date().toISOString();
  const seed = database.transaction(() => {
    insert.run({
      titre: "Le quiz éclair",
      theme: "apprentissage",
      objectifs: "Réactiver les notions vues le matin",
      duree: 10,
      description: "Les participants répondent en équipe à cinq questions courtes sur les notions étudiées.",
      auteur: "Sara El Amrani",
      createdAt: now,
      updatedAt: now,
    });
    insert.run({
      titre: "Deux vérités et un mensonge",
      theme: "jeu",
      objectifs: "Relancer l'attention et favoriser les échanges",
      duree: 15,
      description: "Chaque participant propose trois affirmations et le groupe doit retrouver celle qui est fausse.",
      auteur: "Youssef Alaoui",
      createdAt: now,
      updatedAt: now,
    });
  });
  seed();
}

export function listActivites(theme?: string, recherche?: string): Activite[] {
  const clauses: string[] = [];
  const parameters: Record<string, string> = {};

  if (theme) {
    clauses.push("theme = @theme");
    parameters.theme = theme;
  }
  if (recherche) {
    clauses.push("LOWER(titre) LIKE LOWER(@recherche)");
    parameters.recherche = `%${recherche}%`;
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  return database.prepare(`SELECT * FROM activites ${where} ORDER BY id DESC`).all(parameters) as Activite[];
}

export function findActivite(id: number): Activite | undefined {
  return database.prepare("SELECT * FROM activites WHERE id = ?").get(id) as Activite | undefined;
}

export default database;
