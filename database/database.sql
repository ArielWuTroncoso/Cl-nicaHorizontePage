-- ============================================================================
-- Centro Odontológico Horizonte — esquema completo (PostgreSQL)
-- Equivale a V1 + V2 de src/main/resources/db/migration.
-- ============================================================================

CREATE TABLE IF NOT EXISTS rol (
    id     BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuario (
    id               BIGSERIAL PRIMARY KEY,
    nombre           VARCHAR(150) NOT NULL,
    correo           VARCHAR(180) NOT NULL UNIQUE,
    contrasena_hash  VARCHAR(255) NOT NULL,
    telefono         VARCHAR(30),
    empresa          VARCHAR(150),
    activo           BOOLEAN NOT NULL DEFAULT TRUE,
    bienvenida_vista BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_creacion   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS usuario_rol (
    usuario_id BIGINT NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    rol_id     BIGINT NOT NULL REFERENCES rol(id)     ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, rol_id)
);

CREATE TABLE IF NOT EXISTS solicitud_cita (
    id               BIGSERIAL PRIMARY KEY,
    nombre           VARCHAR(150) NOT NULL,
    telefono         VARCHAR(30)  NOT NULL,
    correo           VARCHAR(180),
    tratamiento      VARCHAR(80),
    fecha_preferida  DATE,
    franja           VARCHAR(20),
    primera_vez      BOOLEAN NOT NULL DEFAULT FALSE,
    mensaje          TEXT,
    atendida         BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_creacion   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cita_fecha ON solicitud_cita(fecha_creacion DESC);
