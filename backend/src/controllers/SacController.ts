import { Request, Response } from "express";
import { IAmortizacao } from "../core/domain/Tabela";
import { Sac } from "../domain/entities/Sac";

export class SacController {
    public show(request: Request, response: Response): Response<IAmortizacao[]> {
        const { emprestimo, quantidadeDeParcelas, taxa } = request.body;
        const sac = new Sac(emprestimo, quantidadeDeParcelas, taxa);
        return response.json(sac.exibirTabela());
    }
}