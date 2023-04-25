import React, { useEffect, useState } from "react";
import { IAmortizacao } from "../interfaces/IAmortizacao";
import "./styles.css";

interface propsAmortizacao {
  titulo: string;
  dados: IAmortizacao[];
}

type AmortizacaoProperties = Omit<IAmortizacao, "id">;
type AmortizacaoKeys = keyof AmortizacaoProperties;

export function Tabela({ titulo, dados }: propsAmortizacao) {
  const [somaParcela, setSomaParcela] = useState<number>(0);
  const [somaJuros, setSomaJuros] = useState<number>(0);
  const [somaAmortizacao, setSomaAmortizacao] = useState<number>(0);

  useEffect(() => {
    setSomaParcela(() => obterSomaDeUmaPropriedade('parcela'));
    setSomaJuros(() => obterSomaDeUmaPropriedade('juros'));
    setSomaAmortizacao(() => obterSomaDeUmaPropriedade('amortizacao'));
  }, [dados]);

  function obterSomaDeUmaPropriedade(nome: AmortizacaoKeys): number {
    return dados
      .reduce((total, atual) => total + atual[nome], 0);
  }

  function converteParaBrl(valor: number): string {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "brl",
    });
  }

  return (
    <table>
      <caption>{titulo}</caption>
      <thead>
        <tr>
          <th align="center">#</th>
          <th align="right">Parcela</th>
          <th align="right">Juros</th>
          <th align="right">Amortizacao</th>
          <th align="right">Saldo</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((item) => {
          return (
            <tr key={item.id}>
              <td align="center">
                {item.periodo}
              </td>
              <td align="right">
                { converteParaBrl(item.parcela) }
              </td>
              <td align="right">
                { converteParaBrl(item.juros) }
              </td>
              <td align="right">
                { converteParaBrl(item.amortizacao) }
              </td>
              <td align="right">
                { converteParaBrl(item.saldo) }
              </td>
            </tr>
          );
        })}
        <tr>
          <td align="center">Soma</td>
          <td align="right">{converteParaBrl(somaParcela)}</td>
          <td align="right">{converteParaBrl(somaJuros)}</td>
          <td align="right">{converteParaBrl(somaAmortizacao)}</td>
          <td align="right"></td>
        </tr>
      </tbody>
    </table>
  );
}
