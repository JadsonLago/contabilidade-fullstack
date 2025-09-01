package com.projetusti.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projetusti.backend.model.Lancamento;
import com.projetusti.backend.repository.LancamentoRepository;
import com.projetusti.backend.service.LancamentoService;

@Service
public class LancamentoServiceImpl implements LancamentoService {
    private final LancamentoRepository repository;

    public LancamentoServiceImpl(LancamentoRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Lancamento> listarTodos() {
        return repository.findAll();
    }

    @Override
    public Lancamento salvar(Lancamento lancamento) {
        return repository.save(lancamento);
    }
}
