package br.com.bgrbarbosa.eventos.service.impl;

import br.com.bgrbarbosa.eventos.model.Evento;
import br.com.bgrbarbosa.eventos.model.Usuario;
import br.com.bgrbarbosa.eventos.model.dto.UsuarioDTO;
import br.com.bgrbarbosa.eventos.repository.UsuarioRepository;
import br.com.bgrbarbosa.eventos.service.UsuarioService;
import br.com.bgrbarbosa.eventos.service.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService, UserDetailsService {

    @Autowired
    UsuarioRepository repository;

    @Override
    public List<Usuario> findAll() {
        return repository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = repository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Login não encontrado.") );

        return User
                .builder()
                .username(usuario.getUsername())
                .password(usuario.getPassword())
                .roles("USER")
                .build();
    }

    @Override
    public Optional<Usuario> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public Usuario insert(Usuario usuario) {
        return repository.save(usuario);
    }

    @Override
    public Usuario updateUsuario(Usuario usuario) {
        Optional<Usuario> aux =  repository.findById(usuario.getId());
        if (!aux.isPresent()) {
            throw new ResourceNotFoundException("Entity not found: " + usuario.getId());
        } {
            Usuario usuarioAux =  repository.getOne(usuario.getId());
            usuarioAux.setUsername(usuario.getUsername());
            usuarioAux.setPassword(usuario.getPassword());
            return repository.save(usuarioAux);
        }
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
