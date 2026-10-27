import EstadoHorario from '../common/EstadoHorario';
import { Link } from 'react-router-dom';
import { Clock, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import Logo from '../brand/Logo';
import { CLINICA, enlaceWhatsApp } from '../../data/clinica';
import { TRATAMIENTOS } from '../../data/tratamientos';

export default function Footer() {
  const anio = new Date().getFullYear();
  return (
    <footer className="ftr">
      <div className="container">
        <div className="ftr__main">
          <div className="ftr__brand">
            <Logo ancho={230} tono="claro" />
            <p>{CLINICA.lema}. Atención odontológica en Concepción, con rayos X dentro de la clínica.</p>
            <a className="ftr__ig" href={CLINICA.instagram.url} target="_blank" rel="noreferrer noopener">
              <Instagram size={18} /> {CLINICA.instagram.usuario}
            </a>
          </div>

          <div>
            <h2 className="ftr__h">Tratamientos</h2>
            <ul>
              {TRATAMIENTOS.map((t) => (
                <li key={t.slug}><Link to={`/tratamientos/${t.slug}`}>{t.nombre}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="ftr__h">Visítanos</h2>
            <ul className="ftr__contact">
              <li>
                <MapPin size={18} aria-hidden="true" />
                <a href={CLINICA.mapa.ficha} target="_blank" rel="noreferrer noopener">{CLINICA.direccion}, {CLINICA.ciudad}</a>
              </li>
              <li>
                <Clock size={18} aria-hidden="true" />
                <span>{CLINICA.horario.dias}<br />{CLINICA.horario.horas}<EstadoHorario /></span>
              </li>
              <li>
                <Phone size={18} aria-hidden="true" />
                <a href={`tel:${CLINICA.telefono.tel}`}>{CLINICA.telefono.label}</a>
              </li>
              <li>
                <MessageCircle size={18} aria-hidden="true" />
                <a href={enlaceWhatsApp()} target="_blank" rel="noreferrer noopener">Escribir por WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="ftr__bottom">
          <span>© {anio} {CLINICA.nombre}</span>
          <span>La información de este sitio es orientativa y no reemplaza una evaluación odontológica.</span>
        </div>
      </div>
    </footer>
  );
}
