import React from "react";
import { IAmortizacao } from "../interfaces/IAmortizacao";
import "./styles.css";

interface propsAmortizacao {
  titulo: string;
  dados: IAmortizacao[];
}

export function Tabela(props: propsAmortizacao) {
  return (
    <table>
      <caption>{props.titulo}</caption>
      <thead>
        <tr>
          <th align="center">Periodo</th>
          <th align="right">Parcela</th>
          <th align="right">Juros</th>
          <th align="right">Amortizacao</th>
          <th align="right">Saldo</th>
        </tr>
      </thead>
      <tbody>
        {props.dados.map((item) => {
          return (
            <tr>
              <td key={item.periodo} align="center">
                {item.periodo}
              </td>
              <td key={item.periodo} align="right">
                {item.parcela.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "brl",
                })}
              </td>
              <td key={item.periodo} align="right">
                {item.juros.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "brl",
                })}
              </td>
              <td key={item.periodo} align="right">
                {item.amortizacao.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "brl",
                })}
              </td>
              <td key={item.periodo} align="right">
                {item.saldo.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "brl",
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
