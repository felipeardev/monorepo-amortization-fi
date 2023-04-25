export interface Amortizacao {
  emprestimo: number;
  quantidadeDeParcelas: number;
  taxa: number;
}

export interface IAmortizacao {
  id: string;
  periodo: number;
  parcela: number;
  juros: number;
  amortizacao: number;
  saldo: number;
}
