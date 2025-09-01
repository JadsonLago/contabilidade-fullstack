package com.projetusti.backend.service;

import java.util.List;

import com.projetusti.backend.model.Lancamento;

public interface LancamentoService {
    List<Lancamento> listarTodos();
    Lancamento salvar(Lancamento lancamento);
}
