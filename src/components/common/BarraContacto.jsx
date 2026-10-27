import { Link, useLocation } from 'react-router-dom';
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { CLINICA, enlaceWhatsApp } from '../../data/clinica';

/** Páginas que ya tienen sus propios botones de contacto, o que son internas. */
const OCULTO_EN = ['/reservar', '/contacto', '/acceso', '/admin'];

/**
 * Barra de acciones fija al pie, solo en celular: llamar, escribir y reservar quedan siempre
 * a un toque. En pantallas anchas no se muestra: el encabezado ya trae "Reservar hora".
 */
export default function BarraContacto() {
  const { pathname } = useLocation();
  if (OCULTO_EN.includes(pathname)) return null;

  return (
    <nav className="barra" aria-label="Contacto rápido">
      <a className="barra__item" href={`tel:${CLINICA.telefono.tel}`}>
        <Phone size={20} aria-hidden="true" /> Llamar
      </a>
      <a className="barra__item" href={enlaceWhatsApp()} target="_blank" rel="noreferrer noopener">
        <MessageCircle size={20} aria-hidden="true" /> WhatsApp
      </a>
      <Link className="barra__item barra__item--principal" to="/reservar">
        <CalendarCheck size={20} aria-hidden="true" /> Reservar
      </Link>
    </nav>
  );
}
