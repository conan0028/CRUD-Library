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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biblioteca = void 0;
const prisma_1 = __importDefault(require("../prisma"));
// npm install date-fns
const date_fns_1 = require("date-fns");
class Biblioteca {
    adicionarLivro(titulo, autor, anoPublicacao, genero) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.default.livro.create({
                    data: {
                        titulo,
                        autor,
                        anoPublicacao,
                        genero,
                        disponivel: true,
                    },
                });
                return {
                    sucesso: true,
                    mensagem: `Livro "${titulo}" adicionado com sucesso.`,
                };
            }
            catch (error) {
                const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
                return {
                    sucesso: false,
                    mensagem: `Erro ao adicionar o livro: ${mensagem}`,
                };
            }
        });
    }
    atualizarLivro(id, dados) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livroAtualizado = yield prisma_1.default.livro.update({
                    where: { id },
                    data: dados,
                });
                return {
                    sucesso: true,
                    mensagem: `Livro "${livroAtualizado.titulo}" atualizado com sucesso.`,
                };
            }
            catch (error) {
                const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
                return {
                    sucesso: false,
                    mensagem: `Erro ao atualizar o livro: ${mensagem}`,
                };
            }
        });
    }
    excluirLivro(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.default.livro.delete({ where: { id } });
                return { sucesso: true, mensagem: "Livro excluído com sucesso." };
            }
            catch (error) {
                const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
                return {
                    sucesso: false,
                    mensagem: `Erro ao excluir o livro: ${mensagem}`,
                };
            }
        });
    }
    listarLivros() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livros = yield prisma_1.default.livro.findMany();
                return { sucesso: true, dados: livros };
            }
            catch (error) {
                const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
                return { sucesso: false, mensagem: `Erro ao listar livros: ${mensagem}` };
            }
        });
    }
    // verifica se o livro esta livre ou emprestado
    consultarDisponibilidade(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield prisma_1.default.livro.findUnique({ where: { id } });
                if (!livro) {
                    return { sucesso: false, mensagem: "Livro não encontrado." };
                }
                return { sucesso: true, disponivel: livro.disponivel };
            }
            catch (error) {
                const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
                return {
                    sucesso: false,
                    mensagem: `Erro ao consultar disponibilidade: ${mensagem}`,
                };
            }
        });
    }
    //busca livros por categorias
    buscarLivros(filtro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Inicializa o objeto de filtro
                const where = {};
                // Adiciona os filtros ao objeto `where` apenas se os valores forem fornecidos
                if (filtro.id) {
                    where.id = filtro.id;
                }
                if (filtro.titulo) {
                    where.titulo = {
                        contains: filtro.titulo,
                        mode: "insensitive", // Insensível a maiúsculas/minúsculas
                    };
                }
                if (filtro.autor) {
                    where.autor = {
                        contains: filtro.autor,
                        mode: "insensitive", // Insensível a maiúsculas/minúsculas
                    };
                }
                if (filtro.anoPublicacao) {
                    where.anoPublicacao = filtro.anoPublicacao;
                }
                if (filtro.genero) {
                    where.genero = {
                        contains: filtro.genero,
                        mode: "insensitive", // Insensível a maiúsculas/minúsculas
                    };
                }
                if (filtro.disponivel !== undefined) {
                    where.disponivel = filtro.disponivel;
                }
                console.log("Filtro aplicado:", where); // Log para verificar o filtro aplicado
                // Consulta o banco com os filtros
                const livros = yield prisma_1.default.livro.findMany({ where });
                // Retorna os resultados
                if (livros.length > 0) {
                    return { sucesso: true, livros };
                }
                else {
                    return { sucesso: false, mensagem: "Nenhum livro encontrado" };
                }
            }
            catch (error) {
                console.error("Erro ao buscar livros:", error);
                return { sucesso: false, mensagem: "Erro ao buscar os livros" };
            }
        });
    }
    // --------------------------------------------------------------------------------------------------------------
    // Atualiza o método de registrar empréstimo para incluir a data de empréstimo
    registrarEmprestimo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield prisma_1.default.livro.findUnique({ where: { id } });
                if (!livro) {
                    return { sucesso: false, mensagem: "Livro não encontrado." };
                }
                if (!livro.disponivel) {
                    return {
                        sucesso: false,
                        mensagem: `O livro "${livro.titulo}" já está emprestado.`,
                    };
                }
                // Formata a data como string (yyyy-MM-dd)
                const dataEmprestimoFormatada = (0, date_fns_1.formatISO)(new Date(), {
                    representation: "date",
                });
                yield prisma_1.default.livro.update({
                    where: { id },
                    data: { disponivel: false, emprestimo: dataEmprestimoFormatada },
                });
                return {
                    sucesso: true,
                    mensagem: `Empréstimo registrado para o livro "${livro.titulo}".`,
                };
            }
            catch (error) {
                const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
                return {
                    sucesso: false,
                    mensagem: `Erro ao registrar empréstimo: ${mensagem}`,
                };
            }
        });
    }
    registrarDevolucao(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield prisma_1.default.livro.findUnique({ where: { id } });
                if (!livro) {
                    return { sucesso: false, mensagem: "Livro não encontrado." };
                }
                if (livro.disponivel) {
                    return {
                        sucesso: false,
                        mensagem: `O livro "${livro.titulo}" já está disponível no acervo.`,
                    };
                }
                // Formata a data como string (yyyy-MM-dd)
                const dataDevolucaoFormatada = (0, date_fns_1.formatISO)(new Date(), {
                    representation: "date",
                });
                yield prisma_1.default.livro.update({
                    where: { id },
                    data: { disponivel: true, devolucao: dataDevolucaoFormatada },
                });
                return {
                    sucesso: true,
                    mensagem: `Devolução registrada para o livro "${livro.titulo}".`,
                };
            }
            catch (error) {
                const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
                return {
                    sucesso: false,
                    mensagem: `Erro ao registrar devolução: ${mensagem}`,
                };
            }
        });
    }
}
exports.Biblioteca = Biblioteca;
