package br.com.bgrbarbosa.eventos.model.dto;

import br.com.bgrbarbosa.eventos.model.Convidado;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EventoDTO {

    private Integer idEvento;

    @NotEmpty(message = "{not.blank.message}")
    @Size(min = 3, max = 40, message = "{size.message}")
    private String titleEvento;

    @NotEmpty(message = "{not.blank.message}")
    private String descEvento;

    @NotNull(message = "{not.blank.message}")
    private LocalDate dtEvento;

    @NotNull(message = "{not.blank.message}")
    private Time hrEvento;

    private List<Convidado> convidados;
}
