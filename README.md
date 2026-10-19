# Centro Odontológico Horizonte — Sitio web

Sitio de **Horizonte**, centro odontológico en O'Higgins 1320, Concepción.
*Tu sonrisa, nuestra prioridad.* Misma base técnica que el proyecto de Deep Service
(React + Vite, Spring Boot, JWT, PostgreSQL/H2, Render), con estructura y diseño
nuevos para una clínica.

## Qué incluye

| Página | Ruta | Qué hace |
|---|---|---|
| Inicio | `/` | Portada, la clínica, índice de tratamientos, primera visita, preguntas frecuentes |
| Tratamientos | `/tratamientos` | Los siete tratamientos agrupados en tres áreas |
| Ficha | `/tratamientos/:slug` | En qué consiste, cuándo se indica, proceso y preguntas; botón para reservar |
| La clínica | `/clinica` | Fachada, forma de trabajo e Instagram |
| Reservar hora | `/reservar` | Formulario → API → bandeja del panel; confirma también por WhatsApp |
| Contacto | `/contacto` | Dirección, horario, teléfono, mapa y cómo llegar |
| Acceso / Panel | `/acceso`, `/admin` | Sin enlace público: se entra con las teclas **↑ ↓**. El panel lista las solicitudes de hora |

Lo que cambió respecto de Deep Service: se quitaron el catálogo con marcas, el modo oscuro y
el selector de idioma (la clínica atiende en español); el backend ya no guarda productos,
guarda **solicitudes de hora** (`solicitud_cita`).

## Diseño

Negro, azul y blanco, los colores del letrero de la fachada. La idea de "horizonte" sigue en los
arcos azules concéntricos que asoman detrás de la portada, de las cabeceras y del cierre.

- **Colores** (variables en `src/index.css`): negro `#090D13` para cabecera, tratamientos, cierre y pie;
  azul del letrero `#0693C5` para acentos sobre negro; `#0579A8` en botones (texto blanco con contraste AA);
  azul marino `#082848` sólo como profundidad en degradados; blanco para las secciones de lectura.
- **Tipografía:** Fraunces (títulos) y Figtree (texto), autoalojadas.
- **Fotos:** salen de los afiches y la fachada de la clínica, recortadas y ampliadas con un modelo de
  súper-resolución (EDSR). Están en `public/img/` y se declaran todas en `src/data/imagenes.js`.
  Son de resolución limitada: conviene reemplazarlas por fotos reales (portada: `sonrisaRetrato`;
  cierre: `sonrisaBanda`; primera visita: `dientePodio`; La clínica y Contacto: `fachada`).
- **Movimiento:** una sola secuencia al cargar la portada (el arco y el pedestal suben). El resto
  responde a acciones: el acordeón, las tarjetas y los botones. Respeta "reducir movimiento".
- **Accesibilidad:** foco visible, enlace "Saltar al contenido", etiquetas y errores asociados
  a cada campo, contraste AA en texto.

## Datos que hay que mantener

| Qué | Dónde |
|---|---|
| Teléfono, horario, dirección, Instagram, mapa, preguntas frecuentes | `src/data/clinica.js` |
| Tratamientos, áreas, procesos y preguntas | `src/data/tratamientos.js` |
| Datos estructurados para Google (`Dentist`) | `index.html` (actualizar a mano si cambian los datos) |
| Fotos | `src/data/imagenes.js` y `public/img/` |
| Logotipo | `src/components/brand/Logo.jsx` |

> **Pendientes con la clínica:** (1) el logotipo es una reconstrucción vectorial a partir de la
> fachada y los afiches: reemplazarlo por el archivo oficial en `Logo.jsx`; (2) los textos de los
> tratamientos son informativos y generales, y los de "La clínica" y "Primera visita" son una
> propuesta: conviene que un odontólogo de Horizonte los revise; (3) faltan fotos del equipo y de
> la consulta, y los nombres de los profesionales, para una sección "Equipo".

## Cómo correrlo

```bash
npm install
npm run dev            # frontend en http://localhost:5173 (proxy a :8080)
./mvnw spring-boot:run # backend en http://localhost:8080 (H2 en memoria)
npm test               # pruebas (vitest)
npm run build          # compila el SPA hacia src/main/resources/static
```

Copia `.env.example` a `.env` para configurar el backend. Variables clave:

- `ADMIN_REGISTRO_CODIGO`: código para registrar administradores (vacío = registro cerrado).
- `SEED_ADMIN_CLAVE`: si se define, crea una cuenta de administración al iniciar
  (`SEED_ADMIN_CORREO`, por defecto `admin@horizonte.local`). Sin ella no se crea ninguna.
- `JWT_SECRET`, `DB_*`, `FRONTEND_ORIGINS`: ver el archivo.

## API

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/api/citas` | público | Nueva solicitud de hora. Obligatorios: `nombre`, `telefono`. Opcionales: `correo`, `tratamiento`, `fechaPreferida`, `franja` (`manana`/`tarde`), `primeraVez`, `mensaje` |
| GET | `/api/citas` | ADMIN | Bandeja de solicitudes |
| PUT | `/api/citas/{id}/atender` | ADMIN | Marca la solicitud como atendida |
| POST | `/auth/login`, `/auth/admin/registro` | público | Acceso de administradores |
| GET | `/api/salud` | público | Estado del servicio |

## Despliegue en Render

`render.yaml` define dos servicios (API Spring Boot + SPA estático), como en Deep Service.
Tras el primer deploy hay que cruzar las URLs: `FRONTEND_ORIGINS` en el backend y `VITE_API_URL`
en el frontend. El `Dockerfile` combinado sirve todo desde un solo contenedor.
# Cl-nicaHorizontePage
