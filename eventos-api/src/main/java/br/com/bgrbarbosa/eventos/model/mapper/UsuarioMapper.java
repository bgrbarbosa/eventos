package br.com.bgrbarbosa.eventos.model.mapper;


import br.com.bgrbarbosa.eventos.model.Evento;
import br.com.bgrbarbosa.eventos.model.Usuario;
import br.com.bgrbarbosa.eventos.model.dto.EventoDTO;
import br.com.bgrbarbosa.eventos.model.dto.UsuarioDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioDTO toDto(Usuario usuario);

    List<UsuarioDTO> toDtoList(List<Usuario> usuario);

    Usuario toEntity(UsuarioDTO usuarioDTO);

    List<Usuario> toEntityList(List<UsuarioDTO> usuarioDTOs);

}
