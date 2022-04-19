import { Request, Response } from "express";
import { IAmortizacao } from "../core/domain/Tabela";
import { Price } from "../domain/entities/Price";

export class PriceController {
  public show(request: Request, response: Response): Response<IAmortizacao[]> {
    const { emprestimo, quantidadeDeParcelas, taxa } = request.body;
    const price = new Price(emprestimo, quantidadeDeParcelas, taxa);
    return response.json(price.exibirTabela());
  }
}
