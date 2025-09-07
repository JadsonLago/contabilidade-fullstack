import React from 'react'
import { useState, useEffect } from 'react'

function ListaDeProdutos() {
// 1. O estado começa como um array vazio para guardar os produtos.
  const [produtos, setProdutos] = useState([]);

// 2. Este efeito roda APENAS UMA VEZ após a primeira renderização.
useEffect(() => {
  // Usamos a função 'fetch' do navegador para chamar sua API
  fetch('http://localhost:8080/produtos') // <-- SUBSTITUA PELA URL DA SUA API
    .then(response => response.json()) // Converte a resposta para o formato JSON
    .then(data => {
      console.log('Dados recebidos da API:', data);
      // 3. A MÁGICA: Atualizamos o estado com os dados que chegaram da API.
      setProdutos(data);
      
    })
    .catch(error => console.error("Houve um erro ao buscar os dados:", error)); // Sempre bom tratar erros
    
}, []); // O array vazio [] garante que isso só aconteça uma vez.  

  return (
    <>
    <div>
      <h1>ListaDeProdutos</h1>
      <ul>
        {/*
          Na 1ª renderização, 'usuarios' está vazio.
          Após o fetch, o estado é atualizado, o componente re-renderiza,
          e agora 'usuarios' tem os dados para o .map() exibir.
        */}
        {produtos.map(produto => (
          <li key={produto.id}>{produto.nome} | {produto.tipo} | {produto.data} | {produto.valor} | {produto.ativo ? 'Sim' : 'Não'} </li> // Assumindo que cada usuário tem um 'id' e 'nome'
        ))}
      </ul>
    </div>
    </>
  )
}

export default ListaDeProdutos