# WakeLab — API REST

Backend pédagogique en **Next.js** pour le mini-projet WakeLab. Les apprenants réalisent uniquement le frontend en HTML, CSS et JavaScript vanilla, puis consomment cette API avec Axios.

La base de données est un fichier **SQLite local**. Aucun serveur MySQL, PostgreSQL ou MongoDB n’est nécessaire.

## Prérequis

- Node.js 20.9 ou une version plus récente
- npm

## Installation et démarrage

```bash
npm install
npm run dev
```

L’API est alors disponible à l’adresse :

```text
http://localhost:3000/api/activites
```

Ouvrir `http://localhost:3000` permet de vérifier que le serveur fonctionne. Au premier démarrage, le fichier `data/wakelab.db` est créé automatiquement avec deux activités d’exemple.

Pour simuler la première utilisation et restaurer les deux exemples :

```bash
# Arrêter d'abord le serveur, puis :
npm run db:reset
npm run dev
```

Pour lancer la version de production :

```bash
npm run build
npm start
```

## Modèle d’une activité

| Propriété | Type | Règles |
|---|---|---|
| `id` | nombre | Généré par l’API |
| `titre` | chaîne | Obligatoire, 5 à 100 caractères |
| `theme` | chaîne | `jeu`, `apprentissage`, `exercice` ou `autre` |
| `objectifs` | chaîne ou `null` | Facultatif, 500 caractères maximum |
| `duree` | nombre | Entier de 10 à 20 |
| `description` | chaîne | Obligatoire, 20 à 1 000 caractères |
| `auteur` | chaîne | Nom complet d’au moins deux parties |
| `createdAt` | chaîne ISO 8601 | Générée par l’API |
| `updatedAt` | chaîne ISO 8601 | Générée par l’API |

Exemple de réponse :

```json
{
  "id": 1,
  "titre": "Le quiz éclair",
  "theme": "apprentissage",
  "objectifs": "Réactiver les notions vues le matin",
  "duree": 10,
  "description": "Les participants répondent en équipe à cinq questions courtes sur les notions étudiées.",
  "auteur": "Sara El Amrani",
  "createdAt": "2026-11-16T10:00:00.000Z",
  "updatedAt": "2026-11-16T10:00:00.000Z"
}
```

## Documentation de l’API REST

### Lister les activités

```http
GET /api/activites
```

- Réponse `200 OK` : tableau d’activités, éventuellement vide.
- Tri : activités les plus récentes en premier.

Filtres facultatifs disponibles :

```http
GET /api/activites?theme=jeu
GET /api/activites?recherche=quiz
GET /api/activites?theme=jeu&recherche=equipe
```

La recherche porte sur le titre et ignore la casse. Dans le brief, la recherche et le filtrage peuvent aussi être réalisés côté frontend avec `filter()` afin de travailler les méthodes de tableaux.

### Récupérer une activité

```http
GET /api/activites/1
```

- `200 OK` : activité trouvée.
- `404 Not Found` : activité inexistante.

### Créer une activité

```http
POST /api/activites
Content-Type: application/json
```

Corps :

```json
{
  "titre": "La chaîne des mots",
  "theme": "jeu",
  "objectifs": "Réactiver le vocabulaire technique",
  "duree": 15,
  "description": "Chaque participant donne un mot lié au précédent sans répéter ceux déjà proposés.",
  "auteur": "Amine Ben Ali"
}
```

- `201 Created` : activité créée, avec son identifiant et ses dates.
- `400 Bad Request` : JSON incorrect ou données non valides.

### Remplacer les informations modifiables

```http
PUT /api/activites/1
Content-Type: application/json
```

Corps attendu :

```json
{
  "titre": "Le quiz collaboratif",
  "theme": "apprentissage",
  "objectifs": "Vérifier les acquis du groupe",
  "duree": 20,
  "description": "Les équipes construisent des questions puis interrogent une autre équipe à tour de rôle."
}
```

Tous les champs modifiables sont attendus. L’API conserve toujours l’auteur initial, même si le frontend en envoie un autre.

- `200 OK` : activité mise à jour.
- `400 Bad Request` : identifiant ou données invalides.
- `404 Not Found` : activité inexistante.

### Modifier uniquement la durée

```http
PATCH /api/activites/1
Content-Type: application/json
```

Corps :

```json
{
  "duree": 12
}
```

- `200 OK` : activité mise à jour.
- `400 Bad Request` : la durée n’est pas un entier entre 10 et 20.
- `404 Not Found` : activité inexistante.

### Supprimer une activité

```http
DELETE /api/activites/1
```

- `204 No Content` : suppression réussie. La réponse n’a pas de corps.
- `404 Not Found` : activité inexistante.

### Format des erreurs de validation

Les erreurs sont placées dans un objet `errors`, ce qui permet de les afficher près des champs du formulaire :

```json
{
  "message": "Données invalides.",
  "errors": {
    "titre": "Le titre doit contenir entre 5 et 100 caractères.",
    "duree": "La durée doit être un entier compris entre 10 et 20."
  }
}
```

## Exemple de configuration Axios

Dans le projet frontend :

```js
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

const chargerActivites = async () => {
  try {
    const response = await api.get("/activites");
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message ?? "API inaccessible");
    return [];
  }
};
```

Les en-têtes CORS sont déjà configurés, le frontend peut donc tourner sur un autre port, par exemple avec Live Server.

## Exemples rapides avec `curl`

```bash
curl http://localhost:3000/api/activites

curl -X PATCH http://localhost:3000/api/activites/1 \
  -H "Content-Type: application/json" \
  -d '{"duree":12}'

curl -X DELETE http://localhost:3000/api/activites/1
```

Sous PowerShell, `curl` peut être un alias. Vous pouvez utiliser :

```powershell
Invoke-RestMethod http://localhost:3000/api/activites
Invoke-RestMethod http://localhost:3000/api/activites/1 -Method Patch -ContentType application/json -Body '{"duree":12}'
```

## Codes HTTP utilisés

| Code | Signification |
|---|---|
| `200` | Lecture ou modification réussie |
| `201` | Création réussie |
| `204` | Suppression réussie, sans contenu |
| `400` | Requête ou données invalides |
| `404` | Ressource introuvable |
| `500` | Erreur interne inattendue |

## Structure du projet

```text
app/
  api/activites/          Routes GET collection et POST
  api/activites/[id]/     Routes GET, PUT, PATCH et DELETE
lib/
  database.ts             Connexion SQLite, table et données initiales
  validation.ts           Nettoyage et validation des entrées
  http.ts                 Réponses JSON et configuration CORS
data/                     Base SQLite créée au démarrage (ignorée par Git)
scripts/reset-db.mjs      Réinitialisation locale de la base
```

## Choix pédagogiques

- La réponse de `GET /api/activites` est directement un tableau pour rester simple avec Axios.
- Les validations existent aussi côté API : les contrôles du navigateur ne suffisent jamais à protéger les données.
- `PUT` remplace l’ensemble des champs modifiables ; `PATCH` ne change ici que la durée.
- Les données persistent après redémarrage grâce au fichier SQLite.
- Le nom enregistré dans `localStorage` relève uniquement du frontend. L’API stocke l’auteur reçu lors de la création et le protège ensuite lors des modifications.
