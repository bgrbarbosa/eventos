package br.com.bgrbarbosa.eventos.service;


import java.util.List;
import java.util.Optional;


import br.com.bgrbarbosa.eventos.model.Convidado;


public interface ConvidadoService{

    List<Convidado>findAll();

    Optional<Convidado> findById(Integer id);

    Optional<Convidado> findByCpf(String cpf);

    Convidado insert(Convidado convidado);

    Convidado updateConvidado(Convidado convidado);

    void delete(Integer id);

}
