import { Link, Navigate, useParams } from 'react-router-dom';
import { CalendarCheck, Clock, MessageCircle } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import IconoTratamiento from '../components/brand/IconoTratamiento';
import Faq from '../components/common/Faq';
import BloqueReserva from '../components/common/BloqueReserva';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { CLINICA, enlaceWhatsApp } from '../data/clinica';
import { AREAS, TRATAMIENTOS, porSlug } from '../data/tratamientos';
import { fotoTratamiento } from '../data/imagenes';

export default function TratamientoPage() {
  const { slug } = useParams();
  const t = porSlug(slug);
  useDocumentTitle(t?.nombre, t?.resumen);

  if (!t) return <Navigate to="/tratamientos" replace />;

  const area = AREAS.find((a) => a.id === t.area);
  const otros = TRATAMIENTOS.filter((x) => x.slug !== t.slug);

  return (
    <>
      <PageHeader
        titulo={t.nombre}
        descripcion={t.resumen}
        migas={[{ label: 'Tratamientos', to: '/tratamientos' }, { label: t.nombre }]}
        imagen={{ ...fotoTratamiento(t.slug), forma: 'circulo' }}
      >
        <span className="pagehead__badge">
          <IconoTratamiento nombre={t.icono} size={22} /> {area?.nombre}
        </span>
      </PageHeader>

      <section className="section section--white">
        <div className="container detalle">
          <div className="detalle__main">
            <section aria-labelledby="que-es">
              <h2 id="que-es" className="display h3">En qué consiste</h2>
              <p className="lead">{t.descripcion}</p>
            </section>

            <section aria-labelledby="para-quien">
              <h2 id="para-quien" className="display h3">Cuándo se indica</h2>
              <ul className="checks checks--lg">
                {t.paraQuien.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </section>

            <section aria-labelledby="proceso">
              <h2 id="proceso" className="display h3">Cómo es el proceso</h2>
              <ol className="etapas">
                {t.proceso.map(([titulo, texto], i) => (
                  <li key={titulo}>
                    <span className="etapas__n" aria-hidden="true">{i + 1}</span>
                    <div><h3>{titulo}</h3><p>{texto}</p></div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="dudas">
              <h2 id="dudas" className="display h3">Preguntas sobre {t.corto.toLowerCase()}</h2>
              <Faq items={t.faqs} />
            </section>
          </div>

          <aside className="detalle__aside" aria-label="Reservar hora">
            <div className="reserva-card">
              <h2 className="display h3">Agenda tu evaluación</h2>
              <p>Tu odontólogo revisa tu caso y te explica si este tratamiento es el adecuado para ti.</p>
              <Link to={`/reservar?tratamiento=${t.slug}`} className="btn btn--primary"><CalendarCheck size={19} /> Reservar hora</Link>
              <a className="btn btn--ghost" href={enlaceWhatsApp(`Hola, quisiera una hora para consultar por ${t.nombre.toLowerCase()}.`)} target="_blank" rel="noreferrer noopener">
                <MessageCircle size={19} /> Consultar por WhatsApp
              </a>
              <p className="reserva-card__horario"><Clock size={16} aria-hidden="true" /> {CLINICA.horario.dias}, {CLINICA.horario.horas}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--bruma">
        <div className="container">
          <h2 className="display h3" style={{ marginBottom: 24 }}>Otros tratamientos</h2>
          <ul className="chips">
            {otros.map((o) => (
              <li key={o.slug}>
                <Link to={`/tratamientos/${o.slug}`}><img src={fotoTratamiento(o.slug).src} width="40" height="40" alt="" loading="lazy" /> {o.corto}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BloqueReserva />
    </>
  );
}
