package br.com.bgrbarbosa.eventos.model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "tb_convidado",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "cpf_convidado")
        })
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Convidado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_convidado")
    private Integer idConvidado;

    @Column(name = "nome_convidado", length = 100)
    private String nomeConvidado;

    @Column(name = "cpf_convidado", length = 14, unique = true)
    private String cpfConvidado;

    @Column(name = "tel_convidado", length = 11)
    private String telConvidado;

    @Column(name = "email_convidado", length = 100, unique = true)
    private String emailConvidado;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "tb_evento_convidado",
            joinColumns = @JoinColumn(name = "id_convidado"),
            inverseJoinColumns = @JoinColumn(name = "id_evento"))

    @JsonIgnore
    private List<Evento> eventos;
}
