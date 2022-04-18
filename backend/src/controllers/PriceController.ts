import { Request, Response } from "express";
import { Sac } from "../domain/entities/Sac";

export class PriceController {
    public show(request: Request, response: Response) {
        const { emprestimo, quantidadeDeParcelas, taxa } = request.body;
        const sac = new Sac(emprestimo, quantidadeDeParcelas, taxa);
        return response.json(sac.exibirTabela());
    }
}