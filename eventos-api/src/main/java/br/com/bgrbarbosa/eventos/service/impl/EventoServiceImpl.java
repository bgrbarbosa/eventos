package br.com.bgrbarbosa.eventos.service.impl;


import java.util.List;
import java.util.Optional;


import br.com.bgrbarbosa.eventos.model.Convidado;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.bgrbarbosa.eventos.model.Evento;
import br.com.bgrbarbosa.eventos.repository.ConvidadoRepository;
import br.com.bgrbarbosa.eventos.repository.EventoRepository;
import br.com.bgrbarbosa.eventos.service.EventoService;
import br.com.bgrbarbosa.eventos.service.exception.ResourceNotFoundException;



@Service
public class EventoServiceImpl implements EventoService {

    @Autowired
    EventoRepository repository;

    @Autowired
    ConvidadoRepository convidadoRepository;

    @Override
    @Transactional
    public List<Evento> findAll() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Optional<Evento> findById(Integer id) {
        Optional<Evento> aux =  repository.findById(id);
        if (!aux.isPresent()) {
            throw new ResourceNotFoundException("Entity not found: " + id);
        }
        return aux;
    }

    @Override
    @Transactional
    public Evento updateEvento(Evento evento) {
        Optional<Evento> aux =  repository.findById(evento.getIdEvento());
        if (!aux.isPresent()) {
            throw new ResourceNotFoundException("Entity not found: " + evento.getIdEvento());
        } {
            Evento eventoAux =  repository.getOne(evento.getIdEvento());
            eventoAux.setTitleEvento(evento.getTitleEvento());
            eventoAux.setDescEvento(evento.getDescEvento());
            eventoAux.setDtEvento(evento.getDtEvento());
            eventoAux.setHrEvento(evento.getHrEvento());
            return eventoAux;
        }
    }

    @Override
    @Transactional
    public Evento insert(Evento evento) {
        return repository.save(evento);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        repository.deleteById(id);
    }



}
