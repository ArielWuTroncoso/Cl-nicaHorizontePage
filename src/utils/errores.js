/** Los mensajes de error del backend ya vienen en español: se muestran tal cual. */
export function mensajeError(err) {
  return err?.message || 'La solicitud no pudo completarse. Intenta nuevamente.';
}
