package com.projetusti.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetusti.backend.model.Lancamento;
import com.projetusti.backend.service.LancamentoService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/lancamentos")
public class LancamentoController {

    private final LancamentoService service;

    public LancamentoController(LancamentoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Lancamento> listarTodos() {
        return service.listarTodos();
    }

    @PostMapping
    public Lancamento salvar(@RequestBody Lancamento lancamento){
        return service.salvar(lancamento);
    }
    

}
