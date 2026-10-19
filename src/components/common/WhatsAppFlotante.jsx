import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { enlaceWhatsApp } from '../../data/clinica';

/** Botón fijo para escribir por WhatsApp: es la vía más rápida desde el celular. */
/** Páginas donde ya hay botones propios de contacto o que son internas. */
const OCULTO_EN = ['/reservar', '/contacto', '/acceso', '/admin'];

export default function WhatsAppFlotante() {
  const { pathname } = useLocation();
  if (OCULTO_EN.includes(pathname)) return null;
  return (
    <a
      className="wa-fab" href={enlaceWhatsApp()} target="_blank" rel="noreferrer noopener"
      aria-label="Reservar hora por WhatsApp"
    >
      <MessageCircle size={24} aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
