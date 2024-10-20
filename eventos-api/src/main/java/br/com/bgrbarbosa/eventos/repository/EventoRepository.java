package br.com.bgrbarbosa.eventos.repository;



import br.com.bgrbarbosa.eventos.model.Convidado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.bgrbarbosa.eventos.model.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {



}
