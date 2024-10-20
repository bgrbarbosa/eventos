package br.com.bgrbarbosa.eventos.model.dto;

import br.com.bgrbarbosa.eventos.model.Evento;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;


import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class ConvidadoDTO{

    private Integer idConvidado;

    @NotBlank(message = "{not.blank.message}")
    @Size(min = 3, max = 60, message = "{size.message}")
    private String nomeConvidado;

    @NotBlank(message = "{not.blank.message}")
    @Pattern(regexp = "^(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}|\\d{11})$", message = "{invalid.cpf.message}")
    @CPF(message = "{invalid.cpf.message}")
    private String cpfConvidado;

    @NotBlank(message = "{not.blank.message}")
    @Size(min = 10, max = 13, message = "{size.message}")
    private String telConvidado;

    @Email(message = "{email.message}", regexp = "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$")
    private String emailConvidado;

    private Set<Evento> eventos;

}


