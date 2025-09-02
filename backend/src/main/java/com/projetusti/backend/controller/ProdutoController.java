package com.projetusti.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetusti.backend.model.Produto;
import com.projetusti.backend.service.ProdutoService;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
 private final ProdutoService service;

    // Injeta o serviço via construtor
    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarTodos() {
        List<Produto> produtos = service.listarTodos();
        return ResponseEntity.ok(produtos); // Retorna 200 OK + lista de produtos
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        Produto produto = service.buscarPorId(id);
        return ResponseEntity.ok(produto); // Retorna 200 OK + produto encontrado
    }

    @PostMapping
    public ResponseEntity<Produto> salvar(@RequestBody Produto produto) {
        Produto produtoSalvo = service.salvar(produto);
        // Retorna 201 CREATED, um status mais apropriado para criação de recursos
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto produto) {
        Produto produtoAtualizado = service.atualizar(id, produto);
        return ResponseEntity.ok(produtoAtualizado); // Retorna 200 OK + produto atualizado
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        // Retorna 204 NO CONTENT, indicando que a operação foi bem-sucedida, mas não há corpo na resposta
        return ResponseEntity.noContent().build();
    }
}
