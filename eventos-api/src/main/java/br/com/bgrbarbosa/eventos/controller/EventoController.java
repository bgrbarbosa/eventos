package br.com.bgrbarbosa.eventos.controller;

import br.com.bgrbarbosa.eventos.model.mapper.ConvidadoMapper;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import br.com.bgrbarbosa.eventos.model.Evento;
import br.com.bgrbarbosa.eventos.model.dto.EventoDTO;
import br.com.bgrbarbosa.eventos.model.mapper.EventoMapper;
import br.com.bgrbarbosa.eventos.service.EventoService;
import br.com.bgrbarbosa.eventos.service.exception.ResourceNotFoundException;


import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/evento")
public class EventoController {

    @Autowired
    EventoService service;

    @Autowired
    EventoMapper mapper;

    @Autowired
    ConvidadoMapper convidadoMapper;

    @GetMapping
    public ResponseEntity<Object>findAll() {
        List<EventoDTO> list = mapper.toDtoList(service.findAll());
        return ResponseEntity.ok().body(list);
    }

  @GetMapping(value = "/{id}")
    public ResponseEntity<Object>findById(@PathVariable(value = "id")  Integer id) {
      Optional<Evento> obj = service.findById(id);
      if (!obj.isPresent()) {
          return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResourceNotFoundException("Entity not found - ID: " + id));
      }
      return ResponseEntity.status(HttpStatus.OK).body(mapper.toDto(obj.get()));
  }

    @PostMapping
    public ResponseEntity<Object>insert(@RequestBody @Valid EventoDTO dto){
        Evento evento = service.insert(mapper.toEntity(dto));
        
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(evento.getIdEvento()).toUri();
        return ResponseEntity.created(uri).body(mapper.toDto(evento));
    }

    @PutMapping
    public ResponseEntity<EventoDTO> update(@RequestBody @Valid EventoDTO dto) {
        if (service.findById(dto.getIdEvento()).isPresent()) {
            Evento evento = service.updateEvento(mapper.toEntity(dto));
            return ResponseEntity.ok().body(mapper.toDto(evento));
        } else {
            return ResponseEntity.notFound().build();  
        }
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object>  delete(@PathVariable Integer id) {
        Optional<Evento> aux = service.findById(id);
        if (aux.isPresent()) {
            service.delete(id);
            return ResponseEntity.ok().body("Registro deletado com sucesso!!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
