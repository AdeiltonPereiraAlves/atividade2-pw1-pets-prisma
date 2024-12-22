/*
  Warnings:

  - You are about to drop the column `deadlene_vaccination` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `deadline_vaccination` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vaccinated" BOOLEAN NOT NULL DEFAULT false,
    "deadline_vaccination" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petshopId" TEXT NOT NULL,
    CONSTRAINT "Pet_petshopId_fkey" FOREIGN KEY ("petshopId") REFERENCES "Petshop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("created_at", "description", "id", "name", "petshopId", "type", "vaccinated") SELECT "created_at", "description", "id", "name", "petshopId", "type", "vaccinated" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
