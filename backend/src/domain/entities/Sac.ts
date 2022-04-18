import { Tabela } from "../../core/domain/Tabela";

export class Sac extends Tabela {
    constructor(emprestimo: number, quantidadeDeParcelas: number, taxa: number) {
        super(emprestimo, quantidadeDeParcelas, taxa);
        this.inserirNaTabela();
    }

    calcularParcela(juros: number, amortizacao: number): number {
        return juros + amortizacao;
    }

    calcularAmortizacao(): number {
        return this.emprestimo / this.quantidadeDeParcelas;
    }

    inserirNaTabela(): void {
        let saldo = this.emprestimo;
        const amortizacao = this.calcularAmortizacao();

        for (let periodo = 1; periodo <= this.quantidadeDeParcelas; periodo++) {
            const juros = this.calcularJuros(saldo);
            const parcela = this.calcularParcela(juros, amortizacao);
            saldo = this.atualizarSaldo(saldo, amortizacao);
            this.inserir(periodo, parcela, juros, amortizacao, saldo);
        }
    }
}