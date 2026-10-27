/**
 * Imágenes del sitio, en un solo lugar.
 *
 * Son las fotos que entregó la clínica (paciente en control, puente sobre implantes,
 * etapas de una endodoncia), más la fachada y el molar sobre pedestal. Para cambiar una
 * foto, deja el archivo nuevo en `public/img/` y ajusta aquí el nombre: ninguna página
 * lo nombra directamente.
 *
 * Fotos que conviene reemplazar primero (cuando haya fotos propias del equipo):
 *   paciente / pacienteRetrato → portada y cierres.  fachada → La clínica y Contacto.
 */
export const IMG = {
  paciente: { src: '/img/paciente.webp', width: 1215, height: 675, alt: 'Paciente durante un control dental, con el espejo del odontólogo en la boca' },
  pacienteRetrato: { src: '/img/paciente-retrato.webp', width: 625, height: 675, alt: 'Paciente durante un control dental, con el espejo del odontólogo en la boca' },
  dientePodio: { src: '/img/diente-podio.webp', width: 676, height: 560, alt: 'Ilustración de un molar sobre un pedestal' },
  // Imágenes de diagnóstico: llevan el azul de la marca para que se vean parte del mismo sistema.
  mandibula: { src: '/img/mandibula-rx.webp', width: 924, height: 585, alt: 'Modelo en 3D translúcido de la dentadura, como se ve en una radiografía' },
  rayosX: { src: '/img/rayos-x.webp', width: 1200, height: 876, alt: 'Radiografía de molares donde se ven sus raíces y conductos' },
  molar: { src: '/img/molar-malla.webp', width: 720, height: 900, alt: 'Modelo en 3D de un molar, dibujado con una malla de líneas' },
  sillon: { src: '/img/sillon.webp', width: 1280, height: 854, alt: 'Sillón dental y equipo en un box de atención' },
  puente: {
    src: '/img/puente-implantes.webp', width: 1200, height: 600,
    alt: 'Modelo en 3D de un puente dental sostenido por tornillos de implantes',
  },
  etapas: {
    src: '/img/endo-pasos.webp', width: 1415, height: 699,
    alt: 'Cuatro etapas de una endodoncia: diagnóstico, acceso, limpieza de conductos y sellado',
  },
  fachada: {
    src: '/img/fachada.webp', width: 1117, height: 1124,
    alt: "Fachada del Centro Odontológico Horizonte en O'Higgins 1320, Concepción",
  },
};

/** Foto circular de cada tratamiento (la misma del afiche). */
export const fotoTratamiento = (slug) => ({
  src: `/img/trat-${slug}.webp`, width: 200, height: 200, alt: '',
});

/**
 * Imágenes de la página de cada tratamiento: la primera va dentro de "En qué consiste" y, si hay
 * más, se muestran en pareja debajo. Cada una lleva un pie que explica qué se está viendo.
 */
const DE = (img, pie) => ({ ...img, pie });
const ILUSTRACIONES = {
  carillas: [DE(IMG.mandibula, 'Las carillas cubren la cara visible de los dientes frontales.')],
  restauraciones: [DE(IMG.molar, 'Un molar en modelo 3D: la restauración repone la parte que se perdió.')],
  'limpiezas-dentales': [DE(IMG.sillon, 'Un box de atención con el equipo para tu control.')],
  implantes: [DE(IMG.puente, 'Los implantes sostienen una o varias piezas, según cada caso.')],
  endodoncias: [
    DE(IMG.etapas, 'Las etapas de una endodoncia, de izquierda a derecha.'),
    DE(IMG.rayosX, 'En una radiografía se ven las raíces y los conductos de cada diente.'),
  ],
  coronas: [DE(IMG.molar, 'La corona cubre el diente completo, desde el borde hasta la encía.')],
  protesis: [DE(IMG.puente, 'Una prótesis fija repone varios dientes de una vez.')],
};

export const ilustracionesTratamiento = (slug) => ILUSTRACIONES[slug] ?? [];
