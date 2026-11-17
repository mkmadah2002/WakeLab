import fs from "node:fs";
import path from "node:path";

const dataDirectory = path.join(process.cwd(), "data");
for (const name of ["wakelab.db", "wakelab.db-shm", "wakelab.db-wal"]) {
  const file = path.join(dataDirectory, name);
  if (fs.existsSync(file)) fs.unlinkSync(file);
}
console.log("Base supprimée. Elle sera recréée avec les exemples au prochain démarrage.");
