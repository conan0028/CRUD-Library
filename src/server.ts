// src/server.ts

/*no diretorio raiz do projeto: 
compilar com: npx tsc
executar com: node dist/server.js
*/

import express from "express";
import { Biblioteca } from "./components/Biblioteca"; // Importa a classe Biblioteca
import prisma from "./prisma"; // Importa o PrismaClient

const app = express();
const port = 3000;

// Necessário para permitir o envio de dados no formato JSON
app.use(express.json());

// Instância da classe Biblioteca
const biblioteca = new Biblioteca();

// Rota para adicionar um livro
app.post("/livros", async (req, res) => {
  const { titulo, autor, anoPublicacao, genero } = req.body;
  const resposta = await biblioteca.adicionarLivro(
    titulo,
    autor,
    anoPublicacao,
    genero
  );
  res.status(resposta.sucesso ? 200 : 400).json(resposta);
});

// Rota para listar todos os livros
app.get("/livros", async (req, res) => {
  const resposta = await biblioteca.listarLivros();
  res.status(resposta.sucesso ? 200 : 400).json(resposta);
});

// Rota para atualizar um livro
app.put("/livros/:id", async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;
  const resposta = await biblioteca.atualizarLivro(
    Number(id),
    dadosAtualizados
  );
  res.status(resposta.sucesso ? 200 : 400).json(resposta);
});

// Rota para excluir um livro
app.delete("/livros/:id", async (req, res) => {
  const { id } = req.params;
  const resposta = await biblioteca.excluirLivro(Number(id));
  res.status(resposta.sucesso ? 200 : 400).json(resposta);
});

//Rota para busca individual de livros
app.get("/livros", async (req, res) => {
  const filtro = {
    id: req.query.id ? Number(req.query.id) : undefined,
    titulo: req.query.titulo as string | undefined,
    autor: req.query.autor as string | undefined,
    anoPublicacao: req.query.anoPublicacao
      ? Number(req.query.anoPublicacao)
      : undefined,
    genero: req.query.genero as string | undefined,
    disponivel: req.query.disponivel
      ? req.query.disponivel === "true"
      : undefined,
  };

  try {
    const resposta = await biblioteca.buscarLivros(filtro);
    res.status(resposta.sucesso ? 200 : 400).json(resposta);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

// Rota para consultar a disponibilidade de um livro
app.get("/livros/:id/disponibilidade", async (req, res) => {
  const { id } = req.params;

  try {
    const resposta = await biblioteca.consultarDisponibilidade(Number(id));
    res.status(resposta.sucesso ? 200 : 400).json(resposta);
  } catch (error) {
    console.error("Erro ao consultar disponibilidade:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

// Rota para registrar o empréstimo de um livro
app.post("/livros/:id/emprestimo", async (req, res) => {
  const { id } = req.params;

  try {
    const resposta = await biblioteca.registrarEmprestimo(Number(id));
    res.status(resposta.sucesso ? 200 : 400).json(resposta);
  } catch (error) {
    console.error("Erro ao registrar empréstimo:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

// Rota para registrar a devolução de um livro
app.post("/livros/:id/devolucao", async (req, res) => {
  const { id } = req.params;

  try {
    const resposta = await biblioteca.registrarDevolucao(Number(id));
    res.status(resposta.sucesso ? 200 : 400).json(resposta);
  } catch (error) {
    console.error("Erro ao registrar devolução:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
