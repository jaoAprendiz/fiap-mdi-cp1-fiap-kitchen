import { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState({});

  const alterarQuantidade = (id, operacao) => {
    setCarrinho((prev) => {
      const qtdAtual = prev[id] || 0;
      const novaQtd = operacao === 'soma' ? qtdAtual + 1 : Math.max(0, qtdAtual - 1);
      return { ...prev, [id]: novaQtd };
    });
  };

  const limparCarrinho = () => setCarrinho({});

  return (
    <CarrinhoContext.Provider value={{ carrinho, alterarQuantidade, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);