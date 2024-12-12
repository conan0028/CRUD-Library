"use strict";
// src/server.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*no diretorio raiz do projeto:
compilar com: npx tsc
executar com: node dist/server.js
*/
const express_1 = __importDefault(require("express"));
const Biblioteca_1 = require("./components/Biblioteca"); // Importa a classe Biblioteca
const app = (0, express_1.default)();
const port = 3000;
// Necessário para permitir o envio de dados no formato JSON
app.use(express_1.default.json());
// Instância da classe Biblioteca
const biblioteca = new Biblioteca_1.Biblioteca();
// Rota para adicionar um livro
app.post("/livros", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, autor, anoPublicacao, genero } = req.body;
    const resposta = yield biblioteca.adicionarLivro(titulo, autor, anoPublicacao, genero);
    res.status(resposta.sucesso ? 200 : 400).json(resposta);
}));
// Rota para listar todos os livros
app.get("/livros", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resposta = yield biblioteca.listarLivros();
    res.status(resposta.sucesso ? 200 : 400).json(resposta);
}));
// Rota para atualizar um livro
app.put("/livros/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    const resposta = yield biblioteca.atualizarLivro(Number(id), dadosAtualizados);
    res.status(resposta.sucesso ? 200 : 400).json(resposta);
}));
// Rota para excluir um livro
app.delete("/livros/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resposta = yield biblioteca.excluirLivro(Number(id));
    res.status(resposta.sucesso ? 200 : 400).json(resposta);
}));
//Rota para busca individual de livros
app.get("/livros", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filtro = {
        id: req.query.id ? Number(req.query.id) : undefined,
        titulo: req.query.titulo,
        autor: req.query.autor,
        anoPublicacao: req.query.anoPublicacao
            ? Number(req.query.anoPublicacao)
            : undefined,
        genero: req.query.genero,
        disponivel: req.query.disponivel
            ? req.query.disponivel === "true"
            : undefined,
    };
    try {
        const resposta = yield biblioteca.buscarLivros(filtro);
        res.status(resposta.sucesso ? 200 : 400).json(resposta);
    }
    catch (error) {
        console.error("Erro ao buscar livros:", error);
        res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}));
// Rota para consultar a disponibilidade de um livro
app.get("/livros/:id/disponibilidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const resposta = yield biblioteca.consultarDisponibilidade(Number(id));
        res.status(resposta.sucesso ? 200 : 400).json(resposta);
    }
    catch (error) {
        console.error("Erro ao consultar disponibilidade:", error);
        res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}));
// Rota para registrar o empréstimo de um livro
app.post("/livros/:id/emprestimo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const resposta = yield biblioteca.registrarEmprestimo(Number(id));
        res.status(resposta.sucesso ? 200 : 400).json(resposta);
    }
    catch (error) {
        console.error("Erro ao registrar empréstimo:", error);
        res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}));
// Rota para registrar a devolução de um livro
app.post("/livros/:id/devolucao", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const resposta = yield biblioteca.registrarDevolucao(Number(id));
        res.status(resposta.sucesso ? 200 : 400).json(resposta);
    }
    catch (error) {
        console.error("Erro ao registrar devolução:", error);
        res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}));
// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
