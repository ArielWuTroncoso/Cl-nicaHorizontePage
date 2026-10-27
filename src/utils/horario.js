/**
 * Estado de atención de la clínica a partir del horario publicado
 * (lunes a viernes, 9:00 a 18:00, hora de Chile continental).
 *
 * `ahora` se recibe como parámetro para poder probar la lógica con fechas fijas.
 */
const APERTURA = 9 * 60;
const CIERRE = 18 * 60;
const NOMBRES = { 1: 'lunes', 2: 'martes', 3: 'miércoles', 4: 'jueves', 5: 'viernes', 6: 'sábado', 7: 'domingo' };
const DIAS = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };

/** Día (1 = lunes … 7 = domingo) y minutos desde medianoche en Santiago de Chile. */
function horaEnSantiago(fecha) {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Santiago', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(fecha);
  const valor = (tipo) => partes.find((p) => p.type === tipo)?.value ?? '0';
  return { dia: DIAS[valor('weekday')] ?? 1, minutos: Number(valor('hour')) * 60 + Number(valor('minute')) };
}

/** @returns {{ abierto: boolean, texto: string }} */
export function estadoClinica(ahora = new Date()) {
  const { dia, minutos } = horaEnSantiago(ahora);
  const laborable = dia >= 1 && dia <= 5;

  if (laborable && minutos >= APERTURA && minutos < CIERRE) {
    return { abierto: true, texto: 'Abierto ahora · cierra a las 18:00' };
  }
  if (laborable && minutos < APERTURA) {
    return { abierto: false, texto: 'Cerrado · abre hoy a las 9:00' };
  }
  const siguiente = dia === 5 || dia === 6 || dia === 7 ? 1 : dia + 1;
  const cuando = siguiente === 1 ? 'el lunes' : 'mañana';
  return { abierto: false, texto: `Cerrado · abre ${cuando} a las 9:00`, dia: NOMBRES[siguiente] };
}
