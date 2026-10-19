package cl.horizonte.config;

import cl.horizonte.model.Rol;
import cl.horizonte.model.Usuario;
import cl.horizonte.repository.RolRepository;
import cl.horizonte.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Carga inicial: roles y, si se define SEED_ADMIN_CLAVE, una cuenta de administración.
 *
 * Los tratamientos no viven en la base: son contenido editorial del sitio
 * (src/data/tratamientos.js). La base guarda las solicitudes de hora y las cuentas.
 *
 * Se desactiva con SEED_ENABLED=false.
 */
@Configuration
@ConditionalOnProperty(name = "app.seed.enabled", havingValue = "true", matchIfMissing = true)
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final RolRepository roles;
    private final UsuarioRepository usuarios;
    private final PasswordEncoder encoder;
    private final String adminCorreo;
    private final String adminClave;

    public DataSeeder(RolRepository roles, UsuarioRepository usuarios, PasswordEncoder encoder,
                      @Value("${app.seed.admin-correo:admin@horizonte.local}") String adminCorreo,
                      @Value("${app.seed.admin-clave:}") String adminClave) {
        this.roles = roles;
        this.usuarios = usuarios;
        this.encoder = encoder;
        this.adminCorreo = adminCorreo;
        this.adminClave = adminClave;
    }

    @Override
    @Transactional
    public void run(String... args) {
        for (String nombre : List.of("USUARIO", "ADMIN")) {
            roles.findByNombre(nombre).orElseGet(() -> roles.save(new Rol(nombre)));
        }
        sembrarAdministrador();
    }

    private void sembrarAdministrador() {
        if (adminClave.isBlank()) {
            log.info("Sin SEED_ADMIN_CLAVE: no se crea administrador. Usa el registro con ADMIN_REGISTRO_CODIGO.");
            return;
        }
        if (usuarios.existsByCorreoIgnoreCase(adminCorreo)) return;

        Usuario admin = new Usuario();
        admin.setNombre("Administración");
        admin.setCorreo(adminCorreo);
        admin.setContrasenaHash(encoder.encode(adminClave));
        roles.findByNombre("ADMIN").ifPresent(r -> admin.getRoles().add(r));
        roles.findByNombre("USUARIO").ifPresent(r -> admin.getRoles().add(r));
        usuarios.save(admin);
        log.warn("Administrador creado: {} — cambia la contraseña inicial.", adminCorreo);
    }
}
