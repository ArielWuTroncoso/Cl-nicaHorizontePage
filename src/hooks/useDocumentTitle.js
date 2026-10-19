import { useEffect } from 'react';

const BASE = 'Centro Odontológico Horizonte';
const COMPLETO = `${BASE} · Concepción`;
const DESCRIPCION_BASE =
  'Centro odontológico en Concepción: carillas, restauraciones, limpiezas, implantes, endodoncias, coronas y prótesis. Reserva tu hora.';

/** Título de la pestaña y meta descripción de cada página. */
export function useDocumentTitle(titulo, descripcion) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · ${BASE}` : COMPLETO;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', descripcion || DESCRIPCION_BASE);
  }, [titulo, descripcion]);
}
