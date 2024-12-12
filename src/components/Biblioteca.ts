import prisma from "../prisma";
// npm install date-fns
import { formatISO } from "date-fns";

export class Biblioteca {
  async adicionarLivro(
    titulo: string,
    autor: string,
    anoPublicacao: number,
    genero: string
  ): Promise<{ sucesso: boolean; mensagem: string }> {
    try {
      await prisma.livro.create({
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
    } catch (error) {
      const mensagem =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        sucesso: false,
        mensagem: `Erro ao adicionar o livro: ${mensagem}`,
      };
    }
  }

  async atualizarLivro(
    id: number,
    dados: {
      titulo?: string;
      autor?: string;
      anoPublicacao?: number;
      genero?: string;
    }
  ): Promise<{ sucesso: boolean; mensagem: string }> {
    try {
      const livroAtualizado = await prisma.livro.update({
        where: { id },
        data: dados,
      });
      return {
        sucesso: true,
        mensagem: `Livro "${livroAtualizado.titulo}" atualizado com sucesso.`,
      };
    } catch (error) {
      const mensagem =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        sucesso: false,
        mensagem: `Erro ao atualizar o livro: ${mensagem}`,
      };
    }
  }

  async excluirLivro(
    id: number
  ): Promise<{ sucesso: boolean; mensagem: string }> {
    try {
      await prisma.livro.delete({ where: { id } });
      return { sucesso: true, mensagem: "Livro excluído com sucesso." };
    } catch (error) {
      const mensagem =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        sucesso: false,
        mensagem: `Erro ao excluir o livro: ${mensagem}`,
      };
    }
  }

  async listarLivros(): Promise<{
    sucesso: boolean;
    dados?: any[];
    mensagem?: string;
  }> {
    try {
      const livros = await prisma.livro.findMany();
      return { sucesso: true, dados: livros };
    } catch (error) {
      const mensagem =
        error instanceof Error ? error.message : "Erro desconhecido";
      return { sucesso: false, mensagem: `Erro ao listar livros: ${mensagem}` };
    }
  }

  // verifica se o livro esta livre ou emprestado
  async consultarDisponibilidade(
    id: number
  ): Promise<{ sucesso: boolean; disponivel?: boolean; mensagem?: string }> {
    try {
      const livro = await prisma.livro.findUnique({ where: { id } });
      if (!livro) {
        return { sucesso: false, mensagem: "Livro não encontrado." };
      }
      return { sucesso: true, disponivel: livro.disponivel };
    } catch (error) {
      const mensagem =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        sucesso: false,
        mensagem: `Erro ao consultar disponibilidade: ${mensagem}`,
      };
    }
  }

  //busca livros por categorias
  async buscarLivros(filtro: {
    id?: number;
    titulo?: string;
    autor?: string;
    anoPublicacao?: number;
    genero?: string;
    disponivel?: boolean;
  }) {
    try {
      // Inicializa o objeto de filtro
      const where: Record<string, any> = {};

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
      const livros = await prisma.livro.findMany({ where });

      // Retorna os resultados
      if (livros.length > 0) {
        return { sucesso: true, livros };
      } else {
        return { sucesso: false, mensagem: "Nenhum livro encontrado" };
      }
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      return { sucesso: false, mensagem: "Erro ao buscar os livros" };
    }
  }
  // --------------------------------------------------------------------------------------------------------------

  // Atualiza o método de registrar empréstimo para incluir a data de empréstimo
  async registrarEmprestimo(
    id: number
  ): Promise<{ sucesso: boolean; mensagem: string }> {
    try {
      const livro = await prisma.livro.findUnique({ where: { id } });
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
      const dataEmprestimoFormatada = formatISO(new Date(), {
        representation: "date",
      });

      await prisma.livro.update({
        where: { id },
        data: { disponivel: false, emprestimo: dataEmprestimoFormatada },
      });
      return {
        sucesso: true,
        mensagem: `Empréstimo registrado para o livro "${livro.titulo}".`,
      };
    } catch (error) {
      const mensagem =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        sucesso: false,
        mensagem: `Erro ao registrar empréstimo: ${mensagem}`,
      };
    }
  }

  async registrarDevolucao(
    id: number
  ): Promise<{ sucesso: boolean; mensagem: string }> {
    try {
      const livro = await prisma.livro.findUnique({ where: { id } });
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
      const dataDevolucaoFormatada = formatISO(new Date(), {
        representation: "date",
      });

      await prisma.livro.update({
        where: { id },
        data: { disponivel: true, devolucao: dataDevolucaoFormatada },
      });

      return {
        sucesso: true,
        mensagem: `Devolução registrada para o livro "${livro.titulo}".`,
      };
    } catch (error) {
      const mensagem =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        sucesso: false,
        mensagem: `Erro ao registrar devolução: ${mensagem}`,
      };
    }
  }
}
