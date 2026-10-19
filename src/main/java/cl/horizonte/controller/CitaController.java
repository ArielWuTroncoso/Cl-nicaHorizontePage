package cl.horizonte.controller;

import cl.horizonte.dto.Dtos.CitaRequest;
import cl.horizonte.dto.Dtos.CitaResponse;
import cl.horizonte.service.CitaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
public class CitaController {

    private final CitaService citas;

    public CitaController(CitaService citas) {
        this.citas = citas;
    }

    /** Público: formulario "Reservar hora" del sitio. */
    @PostMapping
    public ResponseEntity<CitaResponse> crear(@Valid @RequestBody CitaRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(citas.registrar(req));
    }

    /** Interno: bandeja del panel de administración. */
    @GetMapping
    public List<CitaResponse> listar() {
        return citas.listar();
    }

    @PutMapping("/{id}/atender")
    public CitaResponse atender(@PathVariable Long id) {
        return citas.atender(id);
    }
}
