package cl.horizonte.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

/** Contratos de entrada y salida de la API, agrupados para mantenerlos a la vista. */
public final class Dtos {

    private Dtos() { }

    // ----- Autenticacion -----
    public record LoginRequest(
            @NotBlank(message = "El correo es obligatorio") @Email(message = "Correo invalido") String correo,
            @NotBlank(message = "La contrasena es obligatoria") String contrasena) { }

    public record LoginResponse(String token, UsuarioResponse usuario) { }

    /**
     * Contrasena estandar: 8 a 72 caracteres (72 es el limite de BCrypt), con minuscula,
     * mayuscula, numero y simbolo, y sin espacios. Debe coincidir con src/utils/clave.js.
     */
    public static final String REGEX_CONTRASENA =
            "^(?=.*\\p{Ll})(?=.*\\p{Lu})(?=.*\\d)(?=.*[^\\p{L}\\d\\s])\\S{8,72}$";

    /** Alta de un administrador. El codigo lo entrega quien administra el sitio. */
    public record RegistroAdminRequest(
            @NotBlank(message = "El nombre es obligatorio") @Size(max = 150) String nombre,
            @NotBlank(message = "El correo es obligatorio") @Email(message = "Correo invalido")
            @Size(max = 180) String correo,
            @NotBlank(message = "La contrasena es obligatoria")
            @Pattern(regexp = REGEX_CONTRASENA,
                    message = "La contrasena debe tener entre 8 y 72 caracteres, con mayuscula, minuscula, numero y simbolo, y sin espacios")
            String contrasena,
            @NotBlank(message = "El codigo de autorizacion es obligatorio") @Size(max = 200) String codigo) { }

    public record UsuarioResponse(
            Long id, String nombre, String correo, String empresa, List<String> roles,
            OffsetDateTime fechaCreacion, boolean bienvenidaVista) { }

    // ----- Reserva de hora -----
    /** Solo el nombre y el teléfono son obligatorios: el equipo confirma la hora por llamada o WhatsApp. */
    public record CitaRequest(
            @NotBlank(message = "El nombre es obligatorio") @Size(max = 150) String nombre,
            @NotBlank(message = "El telefono es obligatorio")
            @Pattern(regexp = "^[+\\d\\s()-]{8,20}$", message = "Telefono invalido") String telefono,
            @Email(message = "Correo invalido") @Size(max = 180) String correo,
            @Size(max = 80) String tratamiento,
            @FutureOrPresent(message = "La fecha no puede ser anterior a hoy") LocalDate fechaPreferida,
            @Pattern(regexp = "^(manana|tarde)?$", message = "Franja invalida") String franja,
            Boolean primeraVez,
            @Size(max = 1000, message = "El mensaje es muy largo") String mensaje) { }

    public record CitaResponse(
            Long id, String nombre, String telefono, String correo, String tratamiento,
            LocalDate fechaPreferida, String franja, boolean primeraVez, String mensaje,
            boolean atendida, OffsetDateTime fechaCreacion) { }

    // ----- Errores -----
    public record ErrorResponse(OffsetDateTime fecha, int status, String mensaje, List<String> detalles) { }
}
