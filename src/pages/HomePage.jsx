import { Link } from 'react-router-dom';
import {
  ArrowRight, CalendarCheck, Clock, Instagram, MapPin, MessageCircle, MessageSquareText,
  ClipboardList, HeartHandshake, Phone, ScanLine,
} from 'lucide-react';
import { Marca } from '../components/brand/Logo';
import SectionHead from '../components/common/SectionHead';
import TarjetaTratamiento from '../components/common/TarjetaTratamiento';
import Faq from '../components/common/Faq';
import BloqueReserva from '../components/common/BloqueReserva';
import EstadoHorario from '../components/common/EstadoHorario';
import SeccionRayosX from '../components/common/SeccionRayosX';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { CLINICA, PREGUNTAS, RAYOS_X, enlaceWhatsApp } from '../data/clinica';
import { TRATAMIENTOS, porSlug } from '../data/tratamientos';
import { IMG } from '../data/imagenes';

const PASOS = [
  ['Reservas tu hora', 'Con el formulario, por WhatsApp o por teléfono. Tú eliges cómo.'],
  ['Te recibimos', 'Conversamos sobre lo que te preocupa, revisamos tu boca y, si hace falta, tomamos una radiografía aquí mismo.'],
  ['Armamos tu plan', 'Te explicamos las opciones y decidimos juntos el tratamiento.'],
  ['Te acompañamos', 'Controles para cuidar el resultado y resolver tus dudas.'],
];

/** Orden y lugar de cada tarjeta en la grilla de la portada; las dos con imagen ocupan doble ancho. */
const DISPOSICION = [
  { slug: 'carillas', area: 'car' },
  { slug: 'restauraciones', area: 'res' },
  { slug: 'implantes', area: 'imp', imagen: IMG.puente },
  { slug: 'limpiezas-dentales', area: 'lim' },
  { slug: 'endodoncias', area: 'end', imagen: IMG.rayosX },
  { slug: 'coronas', area: 'cor' },
  { slug: 'protesis', area: 'pro' },
];

const VALORES = [
  { icono: MessageSquareText, titulo: 'Te explicamos antes de tratar', texto: 'Conversamos qué encontramos y qué opciones hay, para que decidas con información.' },
  { icono: ClipboardList, titulo: 'Planes a tu medida', texto: 'El tratamiento se arma según tu salud, tus tiempos y lo que esperas de tu sonrisa.' },
  { icono: HeartHandshake, titulo: 'Seguimiento después', texto: 'Seguimos cerca con controles y atención a tus dudas, también después de tratarte.' },
];

export default function HomePage() {
  useDocumentTitle();

  return (
    <>
      {/* Portada sobre negro: a la derecha un visor de diagnóstico con la dentadura en rayos X y,
          encima, la foto de una paciente; abajo, la información clave colgando del borde. */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true"><div className="trama" /></div>

        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="kicker">Centro odontológico en {CLINICA.ciudad}</span>
            <h1 className="display h1">{CLINICA.lema}</h1>
            <p className="lead">
              Desde una limpieza hasta un implante, con rayos X dentro de la clínica para explicarte tu diagnóstico
              en la misma visita.
            </p>
            <div className="hero__cta">
              <Link to="/reservar" className="btn btn--azul"><CalendarCheck size={19} /> Reservar hora</Link>
              <Link to="/tratamientos" className="btn btn--ondark">Ver tratamientos</Link>
            </div>
            <ul className="hero__datos" aria-label="Lo que ofrecemos">
              <li><b>7</b><span>tratamientos</span></li>
              <li><b>Rayos X</b><span>en la clínica</span></li>
              <li><b>Lun a vie</b><span>9:00 a 18:00</span></li>
            </ul>
          </div>

          <div className="hero__visual">
            <figure className="visor">
              <img src={IMG.mandibula.src} width={IMG.mandibula.width} height={IMG.mandibula.height} alt={IMG.mandibula.alt} fetchPriority="high" />
              <span className="visor__haz" aria-hidden="true" />
              <i className="visor__esq visor__esq--a" aria-hidden="true" /><i className="visor__esq visor__esq--b" aria-hidden="true" />
              <i className="visor__esq visor__esq--c" aria-hidden="true" /><i className="visor__esq visor__esq--d" aria-hidden="true" />
              <figcaption className="visor__tag"><span className="visor__punto" aria-hidden="true" /> {RAYOS_X.titulo}</figcaption>
            </figure>
            <figure className="hero__paciente">
              <img src={IMG.pacienteRetrato.src} width={IMG.pacienteRetrato.width} height={IMG.pacienteRetrato.height} alt={IMG.pacienteRetrato.alt} />
            </figure>
            <p className="hero__chip">
              <ScanLine size={20} aria-hidden="true" />
              <span>Diagnóstico claro,<br />en la misma visita</span>
            </p>
          </div>
        </div>

        <div className="container">
          <ul className="hero__info">
            <li>
              <span className="hero__ico"><Clock size={22} aria-hidden="true" /></span>
              <span><b>Horario</b>{CLINICA.horario.dias}, {CLINICA.horario.horas}<EstadoHorario /></span>
            </li>
            <li>
              <span className="hero__ico"><MapPin size={22} aria-hidden="true" /></span>
              <span><b>Dónde</b><a href={CLINICA.mapa.ficha} target="_blank" rel="noreferrer noopener">{CLINICA.direccion}, {CLINICA.ciudad}</a></span>
            </li>
            <li>
              <span className="hero__ico"><Phone size={22} aria-hidden="true" /></span>
              <span><b>Teléfono</b><a href={`tel:${CLINICA.telefono.tel}`}>{CLINICA.telefono.label}</a></span>
            </li>
          </ul>
        </div>
      </section>

      {/* La clínica */}
      <section className="section section--white section--bajo-info">
        <div className="container split">
          <figure className="foto">
            <img
              src={IMG.fachada.src} width={IMG.fachada.width} height={IMG.fachada.height}
              loading="lazy" alt={IMG.fachada.alt}
            />
            <figcaption className="foto__sello">
              <MapPin size={18} aria-hidden="true" />
              <span>{CLINICA.direccion}<br />{CLINICA.ciudad}</span>
            </figcaption>
          </figure>
          <div className="split__text">
            <span className="kicker">La clínica</span>
            <h2 className="display h2">Cuidamos tu salud y tu sonrisa</h2>
            <p className="lead">
              Horizonte es un centro odontológico en el corazón de {CLINICA.ciudad}. Nos importa que entiendas
              tu diagnóstico, que conozcas las opciones y que cada tratamiento se decida contigo.
            </p>
            <ul className="valores">
              {VALORES.map(({ icono: Icono, titulo, texto }) => (
                <li key={titulo}>
                  <span className="valores__ico"><Icono size={22} aria-hidden="true" /></span>
                  <span><strong>{titulo}</strong><span>{texto}</span></span>
                </li>
              ))}
            </ul>
            <Link to="/clinica" className="link-arrow">Conocer la clínica <ArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* Banda azul con los siete tratamientos, de un vistazo */}
      <nav className="banda" aria-label="Ir a un tratamiento">
        <ul className="container banda__lista">
          {TRATAMIENTOS.map((t) => (
            <li key={t.slug}><Link to={`/tratamientos/${t.slug}`}><Marca size={22} tono="claro" /> {t.corto}</Link></li>
          ))}
        </ul>
      </nav>

      {/* Tratamientos */}
      <section className="section section--dark">
        <div className="container">
          <div className="tratos__head">
            <div className="section__head">
              <span className="kicker">Tratamientos</span>
              <h2 className="display h2">Contamos con</h2>
              <p className="lead">
                Siete tratamientos para cuidar, reparar y reponer. Si no sabes cuál necesitas, empezamos por una evaluación.
              </p>
            </div>
            <Link to="/tratamientos" className="link-arrow">Ver todos los tratamientos <ArrowRight /></Link>
          </div>
          <ul className="tarjetas">
            {DISPOSICION.map(({ slug, area, imagen }) => (
              <TarjetaTratamiento key={slug} t={porSlug(slug)} area={area} grande={Boolean(imagen)} imagen={imagen} />
            ))}
            <li className="tarjeta-li" style={{ gridArea: 'cta' }}>
              <Link to="/reservar" className="tarjeta tarjeta--cta">
                <strong className="tarjeta__nombre">¿No sabes cuál necesitas?</strong>
                <span className="tarjeta__texto">Empezamos por una evaluación y te explicamos las opciones.</span>
                <span className="btn btn--light btn--sm"><CalendarCheck size={17} /> Reservar hora</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Diagnóstico: los rayos X están dentro de la clínica */}
      <SeccionRayosX />

      {/* Primera visita: ésta sí es una secuencia, por eso va numerada. */}
      <section className="section section--azul">
        <div className="trama" aria-hidden="true" />
        <div className="container visita">
          <div className="visita__intro">
            <SectionHead
              kicker="Tu primera visita"
              titulo="Así te acompañamos, de la reserva al control"
            />
            <figure className="visita__podio">
              <img src={IMG.sillon.src} width={IMG.sillon.width} height={IMG.sillon.height} alt={IMG.sillon.alt} loading="lazy" />
            </figure>
          </div>
          <ol className="pasos">
            {PASOS.map(([titulo, texto], i) => (
              <li key={titulo}>
                <span className="pasos__n" aria-hidden="true">{i + 1}</span>
                <div><h3>{titulo}</h3><p>{texto}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Preguntas */}
      <section className="section section--white">
        <div className="container preguntas">
          <div className="preguntas__intro">
            <span className="kicker">Preguntas frecuentes</span>
            <h2 className="display h2">Lo que más nos preguntan</h2>
            <p className="lead">¿Tu duda no está aquí? Escríbenos y te respondemos.</p>
            <div className="preguntas__links">
              <a className="btn btn--ghost btn--sm" href={enlaceWhatsApp('Hola, tengo una consulta.')} target="_blank" rel="noreferrer noopener">
                <MessageCircle size={17} /> WhatsApp
              </a>
              <a className="btn btn--ghost btn--sm" href={CLINICA.instagram.url} target="_blank" rel="noreferrer noopener">
                <Instagram size={17} /> Instagram
              </a>
            </div>
          </div>
          <Faq items={PREGUNTAS.map(({ q, a }) => [q, a])} />
        </div>
      </section>

      <BloqueReserva />
    </>
  );
}
