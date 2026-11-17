import database, { listActivites } from "@/lib/database";
import { invalidJson, json, options } from "@/lib/http";
import { THEMES } from "@/lib/types";
import { validateActivite } from "@/lib/validation";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function OPTIONS() {
  return options();
}

export function GET(request: NextRequest) {
  const theme = request.nextUrl.searchParams.get("theme")?.trim() || undefined;
  const recherche = request.nextUrl.searchParams.get("recherche")?.trim() || undefined;
  if (theme && !THEMES.includes(theme as (typeof THEMES)[number])) {
    return json({ message: "Thème inconnu." }, 400);
  }
  return json(listActivites(theme, recherche));
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalidJson();
  }

  const validation = validateActivite(body);
  if (!validation.success) return json({ message: "Données invalides.", errors: validation.errors }, 400);

  const now = new Date().toISOString();
  const result = database.prepare(`
    INSERT INTO activites (titre, theme, objectifs, duree, description, auteur, createdAt, updatedAt)
    VALUES (@titre, @theme, @objectifs, @duree, @description, @auteur, @createdAt, @updatedAt)
  `).run({ ...validation.data, createdAt: now, updatedAt: now });

  const activite = database.prepare("SELECT * FROM activites WHERE id = ?").get(result.lastInsertRowid);
  return json(activite, 201);
}
