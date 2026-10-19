package cl.horizonte.service;

import cl.horizonte.dto.Dtos.CitaRequest;
import cl.horizonte.dto.Dtos.CitaResponse;
import cl.horizonte.exception.RecursoNoEncontradoException;
import cl.horizonte.model.SolicitudCita;
import cl.horizonte.repository.SolicitudCitaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CitaService {

    private final SolicitudCitaRepository solicitudes;

    public CitaService(SolicitudCitaRepository solicitudes) {
        this.solicitudes = solicitudes;
    }

    @Transactional
    public CitaResponse registrar(CitaRequest req) {
        SolicitudCita s = new SolicitudCita();
        s.setNombre(req.nombre().trim());
        s.setTelefono(req.telefono().trim());
        s.setCorreo(vacioANulo(req.correo()) == null ? null : req.correo().trim().toLowerCase());
        s.setTratamiento(vacioANulo(req.tratamiento()));
        s.setFechaPreferida(req.fechaPreferida());
        s.setFranja(vacioANulo(req.franja()));
        s.setPrimeraVez(Boolean.TRUE.equals(req.primeraVez()));
        s.setMensaje(vacioANulo(req.mensaje()));
        return aDto(solicitudes.save(s));
    }

    @Transactional(readOnly = true)
    public List<CitaResponse> listar() {
        return solicitudes.findAllByOrderByFechaCreacionDesc().stream().map(this::aDto).toList();
    }

    @Transactional
    public CitaResponse atender(Long id) {
        SolicitudCita s = solicitudes.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("No encontramos la solicitud"));
        s.setAtendida(true);
        return aDto(solicitudes.save(s));
    }

    private static String vacioANulo(String valor) {
        return valor == null || valor.isBlank() ? null : valor.trim();
    }

    private CitaResponse aDto(SolicitudCita s) {
        return new CitaResponse(s.getId(), s.getNombre(), s.getTelefono(), s.getCorreo(),
                s.getTratamiento(), s.getFechaPreferida(), s.getFranja(),
                Boolean.TRUE.equals(s.getPrimeraVez()), s.getMensaje(),
                Boolean.TRUE.equals(s.getAtendida()), s.getFechaCreacion());
    }
}
