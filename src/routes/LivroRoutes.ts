import { Router } from "express";
import {
  criarLivro,
  atualizarLivro,
  excluirLivro,
  listarLivros,
  registrarEmprestimo,
  consultarDisponibilidade,
} from "../controllers/LivroController";

const router = Router();

router.post("/", criarLivro);
router.put("/:id", atualizarLivro);
router.delete("/:id", excluirLivro);
router.get("/", listarLivros);
router.post("/:id/emprestimo", registrarEmprestimo);
router.get("/:id/disponibilidade", consultarDisponibilidade);

export default router;
