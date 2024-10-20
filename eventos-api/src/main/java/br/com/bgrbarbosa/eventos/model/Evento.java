package br.com.bgrbarbosa.eventos.model;


import javax.persistence.*;
import lombok.*;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "tb_evento")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento")
    private Integer idEvento;

    @Column(name = "title_evento", length = 50)
    private String titleEvento;

    @Column(name = "desc_evento", length = 50)
    private String descEvento;

    @Column(name = "dt_evento")
    private LocalDate dtEvento;

    @Column(name = "hr_evento")
    private Time hrEvento;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "tb_evento_convidado",
            joinColumns = @JoinColumn(name = "id_evento"),
            inverseJoinColumns = @JoinColumn(name = "id_convidado"))
    @JsonIgnore
    private List<Convidado> convidados;



}
