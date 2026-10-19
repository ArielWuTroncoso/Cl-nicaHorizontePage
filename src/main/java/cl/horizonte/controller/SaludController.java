package cl.horizonte.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.Map;

/** Endpoint de healthcheck usado por Render. */
@RestController
public class SaludController {

    @GetMapping("/api/salud")
    public Map<String, Object> salud() {
        return Map.of("estado", "ok", "servicio", "horizonte", "fecha", OffsetDateTime.now().toString());
    }
}
