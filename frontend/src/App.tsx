import React, { useState } from "react";
import axios from "axios";
import { IAmortizacao } from "./interfaces/IAmortizacao";
import { Tabela } from "./components/Tabela";
import "./App.css";

const initialState = {
  emprestimo: "",
  quantidadeDeParcelas: "",
  taxa: "",
};

function App() {
  const [visible, setVisible] = useState(false);
  const [dados, setDados] = useState<any>(initialState);
  const [sac, setSac] = useState<IAmortizacao[]>([]);
  const [price, setPrice] = useState<IAmortizacao[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sac = await axios
      .post<IAmortizacao[]>("https://armotization-fi.onrender.com/sac", dados)
      .then((sac) => setSac(sac.data));
    const price = await axios
      .post("https://armotization-fi.onrender.com/price", dados)
      .then((price) => setPrice(price.data));
    setVisible(true);
  };

  return (
    <div>
      {!visible && <h1>Por favor, inserir os dados abaixo.</h1>}
      <form onSubmit={handleSubmit}>
        <label>Emprestimo:</label>
        <input
          type="text"
          name="emprestimo"
          onChange={(e) => setDados({ ...dados, emprestimo: e.target.value })}
          value={dados.emprestimo}
          required
        />
        <br />

        <label>Parcelas:</label>
        <input
          type="text"
          name="quantidadeDeParcelas"
          onChange={(e) =>
            setDados({ ...dados, quantidadeDeParcelas: e.target.value })
          }
          value={dados.quantidadeDeParcelas}
          required
        />
        <br />

        <label>Taxa:</label>
        <input
          type="text"
          name="taxa"
          onChange={(e) => setDados({ ...dados, taxa: e.target.value })}
          value={dados.taxa}
          required
        />
        <br />
        <button>Confirmar</button>
      </form>
      {visible && <Tabela titulo="Tabela Price" dados={price} />}
      {visible && <Tabela titulo="Tabela SAC" dados={sac} />}
    </div>
  );
}

export default App;
