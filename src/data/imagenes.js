/**
 * Imágenes del sitio, en un solo lugar.
 *
 * Todas salen del material de la clínica (afiches y fachada), recortadas y
 * ampliadas. Para cambiar una foto por otra mejor, deja el archivo nuevo en
 * `public/img/` y ajusta aquí el nombre: ninguna página la nombra directamente.
 *
 * Fotos que conviene reemplazar primero (en este orden):
 *   sonrisaRetrato → portada.  sonrisaBanda → cierre de cada página.
 *   dientePodio    → "primera visita".  fachada → La clínica y Contacto.
 */
export const IMG = {
  sonrisaRetrato: { src: '/img/sonrisa-retrato.webp', width: 456, height: 560, alt: 'Sonrisa de una paciente' },
  sonrisaBanda: { src: '/img/sonrisa-banda.webp', width: 676, height: 388, alt: 'Sonrisa de una paciente' },
  dientePodio: { src: '/img/diente-podio.webp', width: 676, height: 560, alt: 'Ilustración de un molar sobre un pedestal' },
  fachada: {
    src: '/img/fachada.webp', width: 1117, height: 1124,
    alt: "Fachada del Centro Odontológico Horizonte en O'Higgins 1320, Concepción",
  },
};

/** Foto circular de cada tratamiento (la misma del afiche). */
export const fotoTratamiento = (slug) => ({
  src: `/img/trat-${slug}.webp`, width: 200, height: 200, alt: '',
});
