import React from "react";
import { IAmortizacao } from "../interfaces/IAmortizacao";

interface propsData {
  data: IAmortizacao
}

export function Tabela(props: IAmortizacao[]) {
  return (
    props.map((item, indice) => {
      <td key={indice}>item</td>
    })
  )
}