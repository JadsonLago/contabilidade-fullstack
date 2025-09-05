package com.projetusti.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projetusti.backend.model.Produto;
import com.projetusti.backend.repository.ProdutoRepository;
import com.projetusti.backend.service.ProdutoService;

@Service
public class ProdutoServiceImpl implements ProdutoService{

    private final ProdutoRepository repository;

    
    // Injeção de dependência via construtor (melhor prática)
    public ProdutoServiceImpl(ProdutoRepository repository) {
        this.repository = repository;
    }


    @Override
    public List<Produto> listarTodos() {
        // Simplesmente repassa a chamada para o repositório
        return repository.findAll();
        
    }

    @Override
    public Produto buscarPorId(Long id) {
        // repository.findById() retorna um Optional, que é uma "caixa"
        // que pode ou não conter um objeto.
        // .orElseThrow() é a forma elegante de obter o objeto ou lançar uma exceção.
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado com o id: " + id));
    }

    @Override
    public Produto salvar(Produto produto) {
            // Aqui poderiam entrar regras de negócio, como validar se o nome do produto já existe.
        return repository.save(produto);
    }

    @Override
    public Produto atualizar(Long id, Produto produto) {
        // Primeiro, garante que o produto existe no banco
        Produto produtoExistente = buscarPorId(id);

        // Atualiza os dados do objeto que veio do banco
        produtoExistente.setData(produto.getData());
        produtoExistente.setNome(produto.getNome());
       
        produtoExistente.setValor(produto.getValor());
        produtoExistente.setTipo(produto.getTipo());
        produtoExistente.setAtivo(produto.getAtivo());
        // Salva o objeto atualizado
        return repository.save(produtoExistente);
    }

    @Override
    public void deletar(Long id) {
        // Garante que o produto existe antes de tentar deletar
        buscarPorId(id);
        repository.deleteById(id);
    }



}
