"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultarDisponibilidade = exports.registrarEmprestimo = exports.listarLivros = exports.excluirLivro = exports.atualizarLivro = exports.criarLivro = void 0;
const Biblioteca_1 = require("../components/Biblioteca");
const biblioteca = new Biblioteca_1.Biblioteca();
const criarLivro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, autor, anoPublicacao, genero } = req.body;
    const resultado = yield biblioteca.adicionarLivro(titulo, autor, anoPublicacao, genero);
    res.status(resultado.sucesso ? 201 : 400).json(resultado);
});
exports.criarLivro = criarLivro;
const atualizarLivro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const dados = req.body;
    const resultado = yield biblioteca.atualizarLivro(Number(id), dados);
    res.status(resultado.sucesso ? 200 : 400).json(resultado);
});
exports.atualizarLivro = atualizarLivro;
const excluirLivro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resultado = yield biblioteca.excluirLivro(Number(id));
    res.status(resultado.sucesso ? 200 : 400).json(resultado);
});
exports.excluirLivro = excluirLivro;
const listarLivros = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield biblioteca.listarLivros();
    res.status(resultado.sucesso ? 200 : 400).json(resultado);
});
exports.listarLivros = listarLivros;
const registrarEmprestimo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resultado = yield biblioteca.registrarEmprestimo(Number(id));
    res.status(resultado.sucesso ? 200 : 400).json(resultado);
});
exports.registrarEmprestimo = registrarEmprestimo;
const consultarDisponibilidade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const resultado = yield biblioteca.consultarDisponibilidade(Number(id));
    res.status(resultado.sucesso ? 200 : 400).json(resultado);
});
exports.consultarDisponibilidade = consultarDisponibilidade;
