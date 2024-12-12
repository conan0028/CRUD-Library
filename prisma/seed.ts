//rodar o comando npx tsc prisma/seed.ts para popular o bd
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Adicionando 10 livros ao banco
  const livros = [
    {
      titulo: "A Revolução dos Bichos",
      autor: "George Orwell",
      anoPublicacao: 1945,
      genero: "Fábula",
    },
    {
      titulo: "O Grande Gatsby",
      autor: "F. Scott Fitzgerald",
      anoPublicacao: 1925,
      genero: "Romance",
    },
    {
      titulo: "1984",
      autor: "George Orwell",
      anoPublicacao: 1949,
      genero: "Distopia",
    },
    {
      titulo: "A Menina que Roubava Livros",
      autor: "Markus Zusak",
      anoPublicacao: 2005,
      genero: "Ficção histórica",
    },
    {
      titulo: "O Sol é para Todos",
      autor: "Harper Lee",
      anoPublicacao: 1960,
      genero: "Drama",
    },
    {
      titulo: "O Hobbit",
      autor: "J.R.R. Tolkien",
      anoPublicacao: 1937,
      genero: "Fantasia",
    },
    {
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      anoPublicacao: 1900,
      genero: "Romance",
    },
    {
      titulo: "Cem Anos de Solidão",
      autor: "Gabriel García Márquez",
      anoPublicacao: 1967,
      genero: "Realismo mágico",
    },
    {
      titulo: "O Código Da Vinci",
      autor: "Dan Brown",
      anoPublicacao: 2003,
      genero: "Mistério",
    },
    {
      titulo: "Matar a Saudade",
      autor: "Chico Buarque",
      anoPublicacao: 2020,
      genero: "Romance",
    },
  ];

  for (const livro of livros) {
    await prisma.livro.create({
      data: livro,
    });
    console.log(`Livro "${livro.titulo}" adicionado com sucesso!`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
