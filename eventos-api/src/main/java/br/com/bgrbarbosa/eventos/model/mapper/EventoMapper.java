package br.com.bgrbarbosa.eventos.model.mapper;


import java.util.List;

import br.com.bgrbarbosa.eventos.model.Evento;
import br.com.bgrbarbosa.eventos.model.dto.EventoDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EventoMapper {

    EventoDTO toDto(Evento evento);

    List<EventoDTO> toDtoList(List<Evento> eventos);

    Evento toEntity(EventoDTO eventoDTO);

    List<Evento> toEntityList(List<EventoDTO> eventoDTOs);

}
