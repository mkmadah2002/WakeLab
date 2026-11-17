import { THEMES, type ActiviteInput } from "./types";

type ValidationResult =
  | { success: true; data: ActiviteInput }
  | { success: false; errors: Record<string, string> };

const fullNamePattern = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)+$/u;

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

export function validateActivite(body: unknown, requireAuthor = true): ValidationResult {
  const source = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const titre = cleanString(source.titre);
  const theme = cleanString(source.theme);
  const objectifs = cleanString(source.objectifs);
  const description = cleanString(source.description);
  const auteur = cleanString(source.auteur);
  const duree = source.duree;
  const errors: Record<string, string> = {};

  if (titre.length < 5 || titre.length > 100) errors.titre = "Le titre doit contenir entre 5 et 100 caractères.";
  if (!THEMES.includes(theme as (typeof THEMES)[number])) errors.theme = `Le thème doit être : ${THEMES.join(", ")}.`;
  if (objectifs.length > 500) errors.objectifs = "Les objectifs ne peuvent pas dépasser 500 caractères.";
  if (!Number.isInteger(duree) || (duree as number) < 10 || (duree as number) > 20) {
    errors.duree = "La durée doit être un entier compris entre 10 et 20.";
  }
  if (description.length < 20 || description.length > 1000) {
    errors.description = "La description doit contenir entre 20 et 1 000 caractères.";
  }
  if (requireAuthor && !fullNamePattern.test(auteur)) {
    errors.auteur = "L’auteur doit être un nom complet contenant au moins deux parties.";
  }

  if (Object.keys(errors).length) return { success: false, errors };
  return {
    success: true,
    data: {
      titre,
      theme: theme as ActiviteInput["theme"],
      objectifs: objectifs || null,
      duree: duree as number,
      description,
      auteur,
    },
  };
}

export function validateDuration(value: unknown): string | null {
  return Number.isInteger(value) && (value as number) >= 10 && (value as number) <= 20
    ? null
    : "La durée doit être un entier compris entre 10 et 20.";
}
