package br.com.bgrbarbosa.eventos.service;

import java.util.List;
import java.util.Optional;


import br.com.bgrbarbosa.eventos.model.Convidado;
import br.com.bgrbarbosa.eventos.model.Evento;


public interface EventoService {

    List<Evento>findAll();

    Optional<Evento> findById(Integer id);

    Evento insert(Evento evento);

    Evento updateEvento(Evento evento);

    void delete(Integer id);


}
