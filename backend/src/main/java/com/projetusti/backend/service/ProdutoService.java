package com.projetusti.backend.service;

import java.util.List;

import com.projetusti.backend.model.Produto;

public interface ProdutoService {

    List<Produto> listarTodos();
    Produto buscarPorId(Long id); // Retorna o produto ou lança exceção
    Produto salvar(Produto produto);
    Produto atualizar(Long id, Produto produto);
    void deletar(Long id);

}
