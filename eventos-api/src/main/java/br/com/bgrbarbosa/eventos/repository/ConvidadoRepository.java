package br.com.bgrbarbosa.eventos.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.bgrbarbosa.eventos.model.Convidado;

@Repository
public interface ConvidadoRepository extends JpaRepository<Convidado, Integer>{

    Optional<Convidado> findByCpfConvidado(String cpf);
}   
