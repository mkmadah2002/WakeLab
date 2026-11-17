export const THEMES = ["jeu", "apprentissage", "exercice", "autre"] as const;
export type Theme = (typeof THEMES)[number];

export type Activite = {
  id: number;
  titre: string;
  theme: Theme;
  objectifs: string | null;
  duree: number;
  description: string;
  auteur: string;
  createdAt: string;
  updatedAt: string;
};

export type ActiviteInput = Omit<Activite, "id" | "createdAt" | "updatedAt">;
