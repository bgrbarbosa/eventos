package br.com.bgrbarbosa.eventos.model.mapper;


import java.util.List;

import br.com.bgrbarbosa.eventos.model.Convidado;
import br.com.bgrbarbosa.eventos.model.dto.ConvidadoDTO;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface ConvidadoMapper {

    ConvidadoDTO toDto(Convidado convidado);

    List<ConvidadoDTO> toDtoList(List<Convidado> convidado);

    Convidado toEntity(ConvidadoDTO convidadoDTO);

    List<Convidado> toEntityList(List<ConvidadoDTO> convidadoDTOs);
}
