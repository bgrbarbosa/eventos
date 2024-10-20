package br.com.bgrbarbosa.eventos.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import br.com.bgrbarbosa.eventos.model.Evento;
import br.com.bgrbarbosa.eventos.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.bgrbarbosa.eventos.model.Convidado;
import br.com.bgrbarbosa.eventos.repository.ConvidadoRepository;
import br.com.bgrbarbosa.eventos.repository.EventoRepository;
import br.com.bgrbarbosa.eventos.service.ConvidadoService;
import br.com.bgrbarbosa.eventos.service.exception.ResourceNotFoundException;


@Service
public class ConvidadoServiceImpl implements ConvidadoService {

    @Autowired
    ConvidadoRepository repository;

    @Autowired
    EventoRepository eventoRepository;

    @Override
    public List<Convidado> findAll() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Optional<Convidado> findById(Integer id) {
        Optional<Convidado> aux =  repository.findById(id);
        if (!aux.isPresent()) {
            throw new ResourceNotFoundException("Entity not found: " + id);
        }
        return aux;
    }

    @Override
    public Optional<Convidado> findByCpf(String cpf) {
        Optional<Convidado> aux =  repository.findByCpfConvidado(cpf);
        if (!aux.isPresent()) {
            throw new ResourceNotFoundException("Entity not found: " + cpf);
        }
        return aux;
    }

    @Override
    @Transactional
    public Convidado insert(Convidado convidado) {
        return repository.save(convidado);
    }

    @Override
    @Transactional
    public Convidado updateConvidado(Convidado convidado) {
        Optional<Convidado> aux =  repository.findById(convidado.getIdConvidado());
        if (!aux.isPresent()) {
            throw new ResourceNotFoundException("Entity not found: " + convidado.getIdConvidado());
        } else{
            Convidado convidadoAux =  repository.getOne(convidado.getIdConvidado());
            convidadoAux.setNomeConvidado(convidado.getNomeConvidado());
            convidadoAux.setEmailConvidado(convidado.getEmailConvidado());
            convidadoAux.setTelConvidado(convidado.getTelConvidado());
            convidadoAux.setCpfConvidado(convidado.getCpfConvidado());
            convidadoAux.setEventos(convidado.getEventos());
            return convidadoAux;
        }
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        repository.deleteById(id);
    }

}
