import React, { useState } from 'react';
import axios from 'axios';
import { Amortizacao, IAmortizacao } from './interfaces/IAmortizacao';

const initialState = {
  emprestimo: 0,
  quantidadeDeParcelas: 0,
  taxa: 0
};

function App() {

  const [visible, setVisible] = useState(false);
  const [dados, setDados] = useState<Amortizacao>(initialState);
  const [sac, setSac] = useState<IAmortizacao[]>([]);
  const [price, setPrice] = useState<IAmortizacao[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sac = await axios.post<IAmortizacao[]>('http://localhost:3333/sac', dados).then(sac => setSac(sac.data));
    const price = await axios.post('http://localhost:3333/price', dados).then(price => setPrice(price.data));
    setVisible(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Emprestimo:</label>
        <input type="number" name="emprestimo" onChange={(e) => setDados({...dados, emprestimo: Number(e.target.value)})} value={dados.emprestimo} required/><br/>

        <label>Parcelas:</label>
        <input type="number" name="quantidadeDeParcelas" onChange={(e) => setDados({...dados, quantidadeDeParcelas: Number(e.target.value)})} value={dados.quantidadeDeParcelas} required/><br/>

        <label>Taxa:</label>
        <input type="number" name="taxa" onChange={(e) => setDados({...dados, taxa: Number(e.target.value)})} value={dados.taxa} required/><br/>

        <button>Confirmar</button>
      </form>
      { 
        visible &&
        <table>
          Tabela Price
          <tr>
            <th>Periodo</th>
            <th>Parcela</th>
            <th>Juros</th>
            <th>Amortizacao</th>
            <th>Saldo</th>
          </tr>

            {
              price.map((item, indice) => {
                return (
                  <>          
                    <tr>
                      <td key={indice}>{Number(item.periodo).toFixed(4)}</td>
                      <td key={indice}>{Number(item.parcela).toFixed(4)}</td>
                      <td key={indice}>{Number(item.juros).toFixed(4)}</td>
                      <td key={indice}>{Number(item.amortizacao).toFixed(4)}</td>
                      <td key={indice}>{Number(item.saldo).toFixed(4)}</td>
                    </tr>
                  </>
                )
              })
            }
        </table>
      }
            { 
        visible &&
        <table>
          Tabela Sac
          <tr>
            <th>Periodo</th>
            <th>Parcela</th>
            <th>Juros</th>
            <th>Amortizacao</th>
            <th>Saldo</th>
          </tr>

            {
              sac.map((item, indice) => {
                return (
                  <>          
                    <tr>
                      <td key={indice}>{Number(item.periodo).toFixed(4)}</td>
                      <td key={indice}>{Number(item.parcela).toFixed(4)}</td>
                      <td key={indice}>{Number(item.juros).toFixed(4)}</td>
                      <td key={indice}>{Number(item.amortizacao).toFixed(4)}</td>
                      <td key={indice}>{Number(item.saldo).toFixed(4)}</td>
                    </tr>
                  </>
                )
              })
            }
        </table>
      }
    </>
  )
}

export default App
