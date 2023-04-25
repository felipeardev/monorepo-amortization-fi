import React, { useEffect, useState } from "react";
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
  const [carregando, setCarregando] = useState<boolean>(false);

  const apiAddresses = [
    {
      sac: "https://armotization-fi.onrender.com/sac",
      price: "https://armotization-fi.onrender.com/sac"
    },
    {
      sac: "http://localhost:3333/sac",
      price: "http://localhost:3333/price"
    }
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCarregando(true);

    await axios
      .post<IAmortizacao[]>(apiAddresses[0].sac, dados)
      .then((sac) => {
        setSac(sac.data);
      });

    await axios
      .post(apiAddresses[0].price, dados)
      .then((price) => setPrice(price.data));

    setVisible(true);
    setCarregando(false);
  };

  useEffect(() => {
    console.log(price);
    console.log(sac);
  }, [sac, price])

  return (
    <div style={{ marginTop: '10px'}}>
      {!visible && <h1>Por favor, inserir os dados abaixo.</h1>}
      <form onSubmit={handleSubmit}>
        { carregando && <h2 style={{ color: '#00ff99'}}>Carregando...</h2>}
        <label>Emprestimo:</label>
        <input
          type="text"
          name="emprestimo"
          onChange={(e) => setDados({ ...dados, emprestimo: e.target.value })}
          value={dados.emprestimo}
          required
        />

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

        <label>Taxa:</label>
        <input
          type="text"
          name="taxa"
          onChange={(e) => setDados({ ...dados, taxa: e.target.value })}
          value={dados.taxa}
          required
        />
        <button>Confirmar</button>
      </form>
      {visible && <Tabela titulo="Tabela Price" dados={price} />}
      {visible && <Tabela titulo="Tabela SAC" dados={sac} />}
    </div>
  );
}

export default App;
