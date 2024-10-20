package br.com.bgrbarbosa.eventos.controller;


import br.com.bgrbarbosa.eventos.model.Convidado;
import br.com.bgrbarbosa.eventos.model.Evento;
import br.com.bgrbarbosa.eventos.model.Usuario;
import br.com.bgrbarbosa.eventos.model.dto.ConvidadoDTO;
import br.com.bgrbarbosa.eventos.model.mapper.ConvidadoMapper;
import br.com.bgrbarbosa.eventos.service.ConvidadoService;
import br.com.bgrbarbosa.eventos.service.exception.ResourceNotFoundException;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/convidado")
public class ConvidadoController {

    @Autowired
    ConvidadoService service;

    @Autowired
    ConvidadoMapper mapper;

    @GetMapping
    public ResponseEntity<Object>findAll() {
        List<Convidado> list = service.findAll();
        return ResponseEntity.ok().body(mapper.toDtoList(list));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object>findById(@PathVariable(value = "id")  Integer id) {
      Optional<Convidado>obj = service.findById(id);
      if (!obj.isPresent()) {
          return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResourceNotFoundException("Entity not found - ID: " + id));
      }
      return ResponseEntity.status(HttpStatus.OK).body(mapper.toDto(obj.get()));
    }

    @GetMapping(value = "/cpf/{cpf}")
    public ResponseEntity<Object>findByCpf(@PathVariable(value = "cpf")  String cpf) {
      Optional<Convidado>obj = service.findByCpf(cpf);
      if (!obj.isPresent()) {
          return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResourceNotFoundException("Entity not found - CPF: " + cpf));
      }
      return ResponseEntity.status(HttpStatus.OK).body(mapper.toDto(obj.get()));
    }

    @PostMapping
    public ResponseEntity<Object>insert(@RequestBody @Valid ConvidadoDTO dto){
        Convidado result = service.insert(mapper.toEntity(dto));
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getIdConvidado()).toUri();
        return ResponseEntity.created(uri).body(mapper.toDto(result));
    }
    @PutMapping
    public ResponseEntity<Object> update(@RequestBody @Valid ConvidadoDTO dto) {
        if (service.findById(dto.getIdConvidado()).isPresent()) {
            Convidado convidado = service.updateConvidado(mapper.toEntity(dto));
            return ResponseEntity.ok().body(mapper.toDto(convidado));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> delete(@PathVariable Integer id) {
        Optional<Convidado> aux = service.findById(id);
        if (aux.isPresent()) {
            service.delete(id);
            return ResponseEntity.ok().body("Registro deletado com sucesso!!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
