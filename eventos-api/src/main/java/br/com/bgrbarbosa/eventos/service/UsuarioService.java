package br.com.bgrbarbosa.eventos.service;


import br.com.bgrbarbosa.eventos.model.Usuario;
import br.com.bgrbarbosa.eventos.model.dto.UsuarioDTO;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;


public interface UsuarioService {

    List<Usuario> findAll();

    Optional<Usuario> findById(Integer id);

    Usuario insert(Usuario usuario);

    Usuario updateUsuario(Usuario usuario);

    void delete(Integer id);

    UserDetails  loadUserByUsername( String username );
}
