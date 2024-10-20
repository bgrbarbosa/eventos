package br.com.bgrbarbosa.eventos.controller;

import br.com.bgrbarbosa.eventos.model.Evento;
import br.com.bgrbarbosa.eventos.model.Usuario;
import br.com.bgrbarbosa.eventos.model.dto.UsuarioDTO;
import br.com.bgrbarbosa.eventos.model.mapper.UsuarioMapper;
import br.com.bgrbarbosa.eventos.service.UsuarioService;
import br.com.bgrbarbosa.eventos.service.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
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
@RequestMapping("/user")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService service;

    @Autowired
    UsuarioMapper mapper;

    @GetMapping
    public ResponseEntity<Object> findAll() {
        List<UsuarioDTO> list = mapper.toDtoList(service.findAll());
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object>findById(@PathVariable(value = "id")  Integer id) {
        Optional<Usuario> obj = service.findById(id);
        if (!obj.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResourceNotFoundException("Entity not found - ID: " + id));
        }
        return ResponseEntity.status(HttpStatus.OK).body(mapper.toDto(obj.get()));
    }

    @PostMapping
    public ResponseEntity<Object>insert(@RequestBody @Valid UsuarioDTO dto){
        Usuario usuario = service.insert(mapper.toEntity(dto));

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(mapper.toDto(usuario));
    }

    @PutMapping
    public ResponseEntity<UsuarioDTO> update(@RequestBody @Valid UsuarioDTO dto) {
        Optional<Usuario> aux = service.findById(dto.getId());
        if (aux.isPresent()) {
            Usuario usuario = service.updateUsuario(mapper.toEntity(dto));
            return ResponseEntity.ok().body(mapper.toDto(usuario));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object>  delete(@PathVariable Integer id) {
        Optional<Usuario> aux = service.findById(id);
        if (aux.isPresent()) {
            service.delete(id);
            return ResponseEntity.ok().body("Registro deletado com sucesso!!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
