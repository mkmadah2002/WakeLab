import database, { findActivite } from "@/lib/database";
import { corsHeaders, invalidJson, json, options } from "@/lib/http";
import { validateActivite, validateDuration } from "@/lib/validation";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

function parseId(value: string): number | null {
  return /^\d+$/.test(value) && Number(value) > 0 ? Number(value) : null;
}

export function OPTIONS() {
  return options();
}

export async function GET(_request: NextRequest, context: Context) {
  const id = parseId((await context.params).id);
  if (!id) return json({ message: "Identifiant invalide." }, 400);
  const activite = findActivite(id);
  return activite ? json(activite) : json({ message: "Activité introuvable." }, 404);
}

export async function PUT(request: NextRequest, context: Context) {
  const id = parseId((await context.params).id);
  if (!id) return json({ message: "Identifiant invalide." }, 400);
  const existing = findActivite(id);
  if (!existing) return json({ message: "Activité introuvable." }, 404);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalidJson();
  }

  const validation = validateActivite({ ...(body as object), auteur: existing.auteur });
  if (!validation.success) return json({ message: "Données invalides.", errors: validation.errors }, 400);

  database.prepare(`
    UPDATE activites SET titre = @titre, theme = @theme, objectifs = @objectifs,
      duree = @duree, description = @description, updatedAt = @updatedAt WHERE id = @id
  `).run({ ...validation.data, id, updatedAt: new Date().toISOString() });
  return json(findActivite(id));
}

export async function PATCH(request: NextRequest, context: Context) {
  const id = parseId((await context.params).id);
  if (!id) return json({ message: "Identifiant invalide." }, 400);
  if (!findActivite(id)) return json({ message: "Activité introuvable." }, 404);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalidJson();
  }
  const source = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const error = validateDuration(source.duree);
  if (error) return json({ message: "Données invalides.", errors: { duree: error } }, 400);

  database.prepare("UPDATE activites SET duree = ?, updatedAt = ? WHERE id = ?")
    .run(source.duree, new Date().toISOString(), id);
  return json(findActivite(id));
}

export async function DELETE(_request: NextRequest, context: Context) {
  const id = parseId((await context.params).id);
  if (!id) return json({ message: "Identifiant invalide." }, 400);
  const result = database.prepare("DELETE FROM activites WHERE id = ?").run(id);
  if (!result.changes) return json({ message: "Activité introuvable." }, 404);
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
