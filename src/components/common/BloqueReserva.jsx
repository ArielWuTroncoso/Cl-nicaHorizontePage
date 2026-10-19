import { Link } from 'react-router-dom';
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import Horizonte from '../brand/Horizonte';
import { CLINICA, enlaceWhatsApp } from '../../data/clinica';
import { IMG } from '../../data/imagenes';

/** Bloque de cierre sobre negro: llamada a reservar y una sonrisa. */
export default function BloqueReserva({ titulo = 'Agenda tu hora y cuéntanos qué necesitas', texto }) {
  return (
    <section className="cierre" aria-labelledby="cierre-titulo">
      <div className="cierre__bg" aria-hidden="true">
        <Horizonte tono="oscuro" conDiente={false} className="cierre__art" />
      </div>
      <div className="container cierre__inner">
        <div className="cierre__texto">
          <h2 id="cierre-titulo" className="display h2">{titulo}</h2>
          <p className="lead">
            {texto ?? `Atendemos ${CLINICA.horario.dias.toLowerCase()}, de ${CLINICA.horario.horas}, en ${CLINICA.direccion}, ${CLINICA.ciudad}.`}
          </p>
          <div className="cierre__acciones">
            <Link to="/reservar" className="btn btn--azul"><CalendarCheck size={19} /> Reservar hora</Link>
            <a className="btn btn--ondark" href={enlaceWhatsApp()} target="_blank" rel="noreferrer noopener">
              <MessageCircle size={19} /> Escribir por WhatsApp
            </a>
          </div>
          <a className="cierre__tel" href={`tel:${CLINICA.telefono.tel}`}>
            <Phone size={17} /> {CLINICA.telefono.label}
          </a>
        </div>
        <figure className="cierre__foto">
          <img src={IMG.sonrisaBanda.src} width={IMG.sonrisaBanda.width} height={IMG.sonrisaBanda.height} alt={IMG.sonrisaBanda.alt} loading="lazy" />
        </figure>
      </div>
    </section>
  );
}
