package br.com.bgrbarbosa.eventos.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsuarioDTO{
        private Integer id;

        @Size(min = 3, max = 12, message = "{size.message}")
        @NotEmpty(message = "{campo.login.obrigatorio}")
        private String username;

        @Size(min = 6, max = 12, message = "{size.message}")
        @NotEmpty(message = "{campo.senha.obrigatorio}")
        private String password;
}
