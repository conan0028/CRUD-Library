-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "anoPublicacao" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "emprestimo" TEXT,
    "devolucao" TEXT
);
INSERT INTO "new_Livro" ("anoPublicacao", "autor", "devolucao", "disponivel", "emprestimo", "genero", "id", "titulo") SELECT "anoPublicacao", "autor", "devolucao", "disponivel", "emprestimo", "genero", "id", "titulo" FROM "Livro";
DROP TABLE "Livro";
ALTER TABLE "new_Livro" RENAME TO "Livro";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
