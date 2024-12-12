import { Request, Response } from "express";
import { Biblioteca } from "../components/Biblioteca";

const biblioteca = new Biblioteca();

export const criarLivro = async (req: Request, res: Response) => {
  const { titulo, autor, anoPublicacao, genero } = req.body;
  const resultado = await biblioteca.adicionarLivro(
    titulo,
    autor,
    anoPublicacao,
    genero
  );
  res.status(resultado.sucesso ? 201 : 400).json(resultado);
};

export const atualizarLivro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dados = req.body;
  const resultado = await biblioteca.atualizarLivro(Number(id), dados);
  res.status(resultado.sucesso ? 200 : 400).json(resultado);
};

export const excluirLivro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const resultado = await biblioteca.excluirLivro(Number(id));
  res.status(resultado.sucesso ? 200 : 400).json(resultado);
};

export const listarLivros = async (_req: Request, res: Response) => {
  const resultado = await biblioteca.listarLivros();
  res.status(resultado.sucesso ? 200 : 400).json(resultado);
};

export const registrarEmprestimo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const resultado = await biblioteca.registrarEmprestimo(Number(id));
  res.status(resultado.sucesso ? 200 : 400).json(resultado);
};

export const consultarDisponibilidade = async (req: Request, res: Response) => {
  const { id } = req.params;
  const resultado = await biblioteca.consultarDisponibilidade(Number(id));
  res.status(resultado.sucesso ? 200 : 400).json(resultado);
};
