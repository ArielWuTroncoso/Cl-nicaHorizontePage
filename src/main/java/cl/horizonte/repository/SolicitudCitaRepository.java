package cl.horizonte.repository;

import cl.horizonte.model.SolicitudCita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolicitudCitaRepository extends JpaRepository<SolicitudCita, Long> {
    List<SolicitudCita> findAllByOrderByFechaCreacionDesc();
}
