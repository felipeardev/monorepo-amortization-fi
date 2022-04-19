export interface Amortizacao {
  emprestimo: number;
  quantidadeDeParcelas: number;
  taxa: number;
}

export interface IAmortizacao {
  periodo: number;
  parcela: number;
  juros: number;
  amortizacao: number;
  saldo: number;
}
