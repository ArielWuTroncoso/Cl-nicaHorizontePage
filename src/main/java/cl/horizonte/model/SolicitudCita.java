package cl.horizonte.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.OffsetDateTime;

/** Solicitud de hora enviada desde el sitio. El equipo la confirma por teléfono o WhatsApp. */
@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "solicitud_cita")
public class SolicitudCita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(nullable = false, length = 30)
    private String telefono;

    @Column(length = 180)
    private String correo;

    /** Slug del tratamiento (ver src/data/tratamientos.js) o "evaluacion" / "otro". */
    @Column(length = 80)
    private String tratamiento;

    @Column(name = "fecha_preferida")
    private LocalDate fechaPreferida;

    /** "manana" (9:00 a 13:00) o "tarde" (14:00 a 18:00). */
    @Column(length = 20)
    private String franja;

    @Column(name = "primera_vez", nullable = false)
    private Boolean primeraVez = false;

    @Column(columnDefinition = "TEXT")
    private String mensaje;

    @Column(nullable = false)
    private Boolean atendida = false;

    @Column(name = "fecha_creacion", nullable = false)
    private OffsetDateTime fechaCreacion = OffsetDateTime.now();
}
