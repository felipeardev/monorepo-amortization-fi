import { Tabela } from "../../core/domain/Tabela";

export class Price extends Tabela {
    constructor(emprestimo: number, quantidadeDeParcelas: number, taxa: number) {
        super(emprestimo, quantidadeDeParcelas, taxa);
        this.inserirNaTabela();
    }
    calcularParcela(): number {
        const pt1 = this.emprestimo * this.taxa;
        const pt2 = 1 - (1 / (1 + this.taxa) ** this.quantidadeDeParcelas);
        return pt1 / pt2;
    }
    calcularAmortizacao(parcela: number, juros: number): number {
        return parcela - juros;
    }
    inserirNaTabela(): void {
        let saldo = this.emprestimo;
        const parcela = this.calcularParcela();
        for (let periodo = 1;  periodo <= this.quantidadeDeParcelas; periodo++) {
            const juros = this.calcularJuros(saldo);
            const amortizacao = this.calcularAmortizacao(parcela, juros);
            saldo = this.atualizarSaldo(saldo, amortizacao);
            this.inserir(periodo, parcela, juros, amortizacao, saldo);
        }
    }
}