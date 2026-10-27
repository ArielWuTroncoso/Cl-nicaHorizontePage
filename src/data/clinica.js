/**
 * Datos de contacto y operación de la clínica.
 * Fuente: afiches y fachada de Horizonte. Cualquier cambio de teléfono, horario
 * o dirección se hace aquí y se refleja en todo el sitio (y en el JSON-LD de index.html,
 * que hay que actualizar a mano).
 */
const DIRECCION = "O'Higgins 1320";
const CIUDAD = 'Concepción';
const TEL = '+56930078427';

export const CLINICA = {
  nombre: 'Centro Odontológico Horizonte',
  corto: 'Horizonte',
  lema: 'Tu sonrisa, nuestra prioridad',
  direccion: DIRECCION,
  ciudad: CIUDAD,
  telefono: { tel: TEL, label: '+56 9 3007 8427' },
  horario: { dias: 'Lunes a viernes', horas: '9:00 a 18:00' },
  instagram: {
    usuario: '@horizonteclinicadental',
    url: 'https://www.instagram.com/horizonteclinicadental/',
  },
  mapa: {
    embed: `https://maps.google.com/maps?q=${encodeURIComponent(`${DIRECCION}, ${CIUDAD}, Chile`)}&z=16&output=embed`,
    ruta: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${DIRECCION}, ${CIUDAD}, Chile`)}`,
    ficha: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${DIRECCION}, ${CIUDAD}, Chile`)}`,
  },
};

/**
 * Rayos X: la clínica los tiene dentro, así que la radiografía se toma en la misma visita.
 * Los textos son informativos; el odontólogo indica cuándo hace falta cada una.
 */
export const RAYOS_X = {
  titulo: 'Rayos X dentro de la clínica',
  resumen: 'Si tu odontólogo necesita una radiografía, la tomamos aquí mismo.',
  detalle: 'Así revisas con él lo que no se ve a simple vista, en la misma visita y sin tener que ir a otro lugar.',
  puntos: [
    ['Raíces y conductos', 'Su forma y su estado, antes y después de un tratamiento.'],
    ['Caries entre dientes', 'Las que se esconden donde el espejo no llega.'],
    ['Hueso que sostiene tus dientes', 'Clave para planificar implantes y prótesis.'],
  ],
  nota: 'Tu odontólogo indica cuándo hace falta una radiografía.',
};

/** Enlace de WhatsApp al número de la clínica, con un mensaje opcional ya escrito. */
export function enlaceWhatsApp(mensaje = 'Hola, quisiera reservar una hora en Horizonte.') {
  return `https://wa.me/${TEL.replace('+', '')}?text=${encodeURIComponent(mensaje)}`;
}

/** Franjas para la reserva. Deben coincidir con las que valida el backend (CitaRequest.franja). */
export const FRANJAS = [
  { id: 'manana', etiqueta: 'Mañana', detalle: '9:00 a 13:00' },
  { id: 'tarde', etiqueta: 'Tarde', detalle: '13:00 a 18:00' },
];

export const PREGUNTAS = [
  {
    q: '¿Cómo reservo una hora?',
    a: 'Puedes usar el formulario de este sitio, escribirnos por WhatsApp o llamar al +56 9 3007 8427. Te confirmamos la hora por el mismo medio que elijas.',
  },
  {
    q: '¿Cuál es el horario de atención?',
    a: 'Atendemos de lunes a viernes, de 9:00 a 18:00.',
  },
  {
    q: '¿Dónde está la clínica?',
    a: "Estamos en O'Higgins 1320, Concepción. En la página de contacto tienes el mapa y el enlace para llegar.",
  },
  {
    q: '¿Qué pasa en la primera visita?',
    a: 'Conversamos sobre lo que te preocupa, revisamos tu boca y, si hace falta, tomamos radiografías en la misma clínica. Con eso te explicamos las opciones y armamos un plan de tratamiento contigo.',
  },
  {
    q: '¿Tienen rayos X en la clínica?',
    a: 'Sí. Tenemos rayos X dentro de la clínica, así que si tu odontólogo necesita una radiografía la tomamos en la misma visita. Él te indica cuándo hace falta.',
  },
  {
    q: '¿Debo llevar algo a la cita?',
    a: 'Si tienes radiografías o informes de tratamientos anteriores, tráelos. Cuéntanos también si tomas medicamentos o tienes alguna condición de salud: es información clave para tratarte con seguridad.',
  },
];
