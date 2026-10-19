import { Link } from 'react-router-dom';
import {
  ArrowRight, CalendarCheck, Clock, Instagram, MapPin, MessageCircle, MessageSquareText,
  ClipboardList, HeartHandshake, Phone, Sparkles,
} from 'lucide-react';
import Horizonte from '../components/brand/Horizonte';
import { Marca } from '../components/brand/Logo';
import SectionHead from '../components/common/SectionHead';
import TarjetaTratamiento from '../components/common/TarjetaTratamiento';
import Faq from '../components/common/Faq';
import BloqueReserva from '../components/common/BloqueReserva';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { CLINICA, PREGUNTAS, enlaceWhatsApp } from '../data/clinica';
import { TRATAMIENTOS } from '../data/tratamientos';
import { IMG } from '../data/imagenes';

const PASOS = [
  ['Reservas tu hora', 'Con el formulario, por WhatsApp o por teléfono. Tú eliges cómo.'],
  ['Te recibimos', 'Conversamos sobre lo que te preocupa y revisamos tu boca con calma.'],
  ['Armamos tu plan', 'Te explicamos las opciones y decidimos juntos el tratamiento.'],
  ['Te acompañamos', 'Controles para cuidar el resultado y resolver tus dudas.'],
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
      {/* Portada sobre negro: foto en arco, molar sobre pedestal y la información clave colgando del borde. */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <Horizonte tono="oscuro" conDiente={false} className="hero__arcos" />
        </div>

        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="kicker">Centro odontológico en {CLINICA.ciudad}</span>
            <h1 className="display h1">{CLINICA.lema}</h1>
            <p className="lead">
              Cuidamos tu salud y tu sonrisa, desde una limpieza hasta un implante. Reserva tu hora y te
              acompañamos en cada paso.
            </p>
            <div className="hero__cta">
              <Link to="/reservar" className="btn btn--azul"><CalendarCheck size={19} /> Reservar hora</Link>
              <Link to="/tratamientos" className="btn btn--ondark">Ver tratamientos</Link>
            </div>
          </div>

          <div className="hero__visual">
            <figure className="hero__arco">
              <img src={IMG.sonrisaRetrato.src} width={IMG.sonrisaRetrato.width} height={IMG.sonrisaRetrato.height} alt={IMG.sonrisaRetrato.alt} fetchPriority="high" />
            </figure>
            <figure className="hero__podio">
              <img src={IMG.dientePodio.src} width={IMG.dientePodio.width} height={IMG.dientePodio.height} alt={IMG.dientePodio.alt} />
            </figure>
            <p className="hero__chip">
              <Sparkles size={18} aria-hidden="true" />
              <span>Siete tratamientos<br />para tu sonrisa</span>
            </p>
          </div>
        </div>

        <div className="container">
          <ul className="hero__info">
            <li>
              <span className="hero__ico"><Clock size={22} aria-hidden="true" /></span>
              <span><b>Horario</b>{CLINICA.horario.dias}, {CLINICA.horario.horas}</span>
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
      <div className="banda" aria-hidden="true">
        <ul className="container banda__lista">
          {TRATAMIENTOS.map((t) => (
            <li key={t.slug}><Marca size={22} tono="claro" /> {t.corto}</li>
          ))}
        </ul>
      </div>

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
            {TRATAMIENTOS.map((t) => <TarjetaTratamiento key={t.slug} t={t} />)}
            <li className="tarjeta-li">
              <Link to="/reservar" className="tarjeta tarjeta--cta">
                <strong className="tarjeta__nombre">¿No sabes cuál necesitas?</strong>
                <span className="tarjeta__texto">Empezamos por una evaluación y te explicamos las opciones.</span>
                <span className="btn btn--light btn--sm"><CalendarCheck size={17} /> Reservar hora</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Primera visita: ésta sí es una secuencia, por eso va numerada. */}
      <section className="section section--azul">
        <Horizonte tono="oscuro" conDiente={false} className="visita__arcos" />
        <div className="container visita">
          <div className="visita__intro">
            <SectionHead
              kicker="Tu primera visita"
              titulo="Así te acompañamos, de la reserva al control"
            />
            <figure className="visita__podio">
              <img src={IMG.dientePodio.src} width={IMG.dientePodio.width} height={IMG.dientePodio.height} alt={IMG.dientePodio.alt} loading="lazy" />
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
