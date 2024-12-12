/*
  Warnings:

  - You are about to drop the column `codigo` on the `Livro` table. All the data in the column will be lost.
  - Added the required column `anoPublicacao` to the `Livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "anoPublicacao" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Livro" ("autor", "disponivel", "id", "titulo") SELECT "autor", "disponivel", "id", "titulo" FROM "Livro";
DROP TABLE "Livro";
ALTER TABLE "new_Livro" RENAME TO "Livro";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
