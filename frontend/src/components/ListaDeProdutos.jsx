import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import FormularioProduto from './FormularioProduto';


function ListaDeProdutos() {
  // O estado começa como um array vazio para guardar os produtos.
  const [produtos, setProdutos] = useState([]);

  // 1. Extraímos a lógica de busca para uma função própria
  const buscarProdutos = useCallback(() => {
    axios.get('http://localhost:8080/produtos')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => console.error("Houve um erro ao buscar os dados:", error));
  }, []); // useCallback para otimização

  // 2. O useEffect agora apenas chama essa função na primeira vez
  useEffect(() => {
    buscarProdutos();
  }, [buscarProdutos]);

  const handleDelete = (id) => {
    // Dica de UX: Pedir confirmação antes de uma ação destrutiva
    const confirmar = window.confirm("Tem certeza que deseja excluir este item?");

    if (confirmar) {
      axios.delete(`http://localhost:8080/produtos/${id}`)
        .then(() => {
          console.log('Produto excluído com sucesso!');
          
          // A MÁGICA: Após excluir, busca a lista atualizada de produtos
          buscarProdutos();
        })
        .catch(error => {
          console.error('Erro ao excluir produto:', error);
        });
    }
  };

  return (
    <>
      <div>
        {/* 3. Passamos a função 'buscarProdutos' como prop para o formulário */}
        <FormularioProduto onProdutoAdicionado={buscarProdutos} />

        <hr />

        <h1>ListaDeProdutos</h1>
        <ul>
          {/*
          Na 1ª renderização, 'usuarios' está vazio.
          Após o fetch, o estado é atualizado, o componente re-renderiza,
          e agora 'usuarios' tem os dados para o .map() exibir.
        */}
          {produtos.map(produto => (
            <li key={produto.id}>{produto.nome} | {produto.tipo} | {produto.data} | {produto.valor} | {produto.ativo ? 'Sim' : 'Não'} <button onClick={(e) => handleEdit(produto.id)}>Editar</button> <button onClick={(e) => handleDelete(produto.id)}>Excluir</button></li> // Assumindo que cada usuário tem um 'id' e 'nome'
          ))}
        </ul>
      </div>
    </>
  )
}

export default ListaDeProdutos