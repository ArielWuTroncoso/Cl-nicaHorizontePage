import { Clock, ExternalLink, Instagram, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import BloqueReserva from '../components/common/BloqueReserva';
import EstadoHorario from '../components/common/EstadoHorario';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { CLINICA, enlaceWhatsApp } from '../data/clinica';
import { IMG } from '../data/imagenes';

export default function ContactoPage() {
  useDocumentTitle('Contacto y ubicación', `Visítanos en ${CLINICA.direccion}, ${CLINICA.ciudad}. ${CLINICA.horario.dias}, de ${CLINICA.horario.horas}.`);

  return (
    <>
      <PageHeader
        titulo="Visítanos"
        descripcion="Estaremos felices de ayudarte. Aquí está todo lo que necesitas para llegar o escribirnos."
        migas={[{ label: 'Contacto' }]}
        imagen={{ ...IMG.fachada, forma: 'foto' }}
      />

      <section className="section section--white">
        <div className="container contacto">
          <dl className="datos">
            <div>
              <dt><MapPin size={20} aria-hidden="true" /> Dirección</dt>
              <dd>
                <a href={CLINICA.mapa.ficha} target="_blank" rel="noreferrer noopener">{CLINICA.direccion}, {CLINICA.ciudad}</a>
              </dd>
            </div>
            <div>
              <dt><Clock size={20} aria-hidden="true" /> Horario de atención</dt>
              <dd>{CLINICA.horario.dias}<br />{CLINICA.horario.horas}<EstadoHorario /></dd>
            </div>
            <div>
              <dt><Phone size={20} aria-hidden="true" /> Teléfono</dt>
              <dd><a href={`tel:${CLINICA.telefono.tel}`}>{CLINICA.telefono.label}</a></dd>
            </div>
            <div>
              <dt><MessageCircle size={20} aria-hidden="true" /> WhatsApp</dt>
              <dd><a href={enlaceWhatsApp()} target="_blank" rel="noreferrer noopener">Escribir por WhatsApp</a></dd>
            </div>
            <div>
              <dt><Instagram size={20} aria-hidden="true" /> Instagram</dt>
              <dd><a href={CLINICA.instagram.url} target="_blank" rel="noreferrer noopener">{CLINICA.instagram.usuario}</a></dd>
            </div>
          </dl>

          <div className="mapa">
            {/* Mapa de Google embebido: carga diferida y servido desde Google. */}
            <div className="mapa__frame">
              <iframe
                title={`Mapa: ${CLINICA.direccion}, ${CLINICA.ciudad}`}
                src={CLINICA.mapa.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="mapa__acciones">
              <a className="btn btn--primary btn--sm" href={CLINICA.mapa.ruta} target="_blank" rel="noreferrer noopener">
                <Navigation size={17} /> Cómo llegar
              </a>
              <a className="btn btn--ghost btn--sm" href={CLINICA.mapa.ficha} target="_blank" rel="noreferrer noopener">
                <ExternalLink size={17} /> Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <BloqueReserva />
    </>
  );
}
