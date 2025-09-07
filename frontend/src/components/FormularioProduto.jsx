import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';


// Recebemos uma função 'onProdutoAdicionado' como prop
function FormularioProduto({ onProdutoAdicionado }) {
    const date = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD  

    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('RECEITA');
    const [data, setData] = useState(date);
    const [valor, setValor] = useState('');
    const [ativo, setAtivo] = useState(true);

    function handleSubmit(event) {

        event.preventDefault(); // Evita o comportamento padrão de envio do formulário
        const produto = { data, nome, valor, tipo, ativo };
        console.log('Produto a ser salvo:', produto);
        // Aqui você pode adicionar a lógica para enviar 'produto' para sua API
        axios.post('http://localhost:8080/produtos', produto)
            .then(response => {
                console.log('Produto salvo com sucesso:', response.data);
                // 1. Avisa o componente pai que a lista deve ser atualizada
                onProdutoAdicionado();

                // 2. Limpa o formulário APENAS SE a requisição deu certo
                setNome('');
                setValor('');
                setTipo('RECEITA'); // Opcional: resetar para o padrão
                setData(new Date().toISOString().split('T')[0]); // Opcional: resetar a data
                setAtivo(true);
            })
            .catch(error => {
                console.error('Erro ao salvar produto:', error);
            });

    }

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <h1>FormularioProduto</h1>

                {/* Agrupando em divs para melhor controle de layout */}
                <div className="form-group">
                    {/* Adicionado o 'id' para conectar com o 'htmlFor' */}
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tipo">Tipo:</label>
                    <select
                        id="tipo"
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                    >
                        <option value="RECEITA">Receita</option>
                        <option value="DESPESA">Despesa</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="data">Data:</label>
                    <input
                        type="date"
                        id="data"
                        value={data}
                        onChange={e => setData(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="valor">Valor:</label>
                    <input
                        type="number"
                        id="valor"
                        value={valor}
                        // Convertendo o valor para número imediatamente
                        onChange={e => setValor(Number(e.target.value))}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ativo">Ativo:</label>
                    <input
                        type="checkbox"
                        id="ativo"
                        checked={ativo}
                        onChange={e => setAtivo(e.target.checked)}
                    />
                </div>

                <button type="submit">Salvar</button>
            </form>
        </div>
    )

}

export default FormularioProduto