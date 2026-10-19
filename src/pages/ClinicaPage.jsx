import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Instagram, MessageSquareText, ClipboardList } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import BloqueReserva from '../components/common/BloqueReserva';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { CLINICA } from '../data/clinica';
import { IMG } from '../data/imagenes';

const PRINCIPIOS = [
  { icono: MessageSquareText, titulo: 'Te explicamos', texto: 'Antes de cada tratamiento conversamos qué encontramos, qué opciones hay y qué implica cada una.' },
  { icono: ClipboardList, titulo: 'Planificamos contigo', texto: 'El plan se arma a tu medida: según tu salud, tus tiempos y lo que esperas de tu sonrisa.' },
  { icono: HeartHandshake, titulo: 'Te acompañamos', texto: 'Después del tratamiento seguimos cerca, con controles y atención a tus dudas.' },
];

export default function ClinicaPage() {
  useDocumentTitle(
    'La clínica',
    `Centro Odontológico Horizonte, en ${CLINICA.direccion}, ${CLINICA.ciudad}. ${CLINICA.lema}.`,
  );

  return (
    <>
      <PageHeader
        titulo="La clínica"
        descripcion="Un lugar para cuidar tu salud y tu sonrisa, con tiempo para escucharte."
        migas={[{ label: 'La clínica' }]}
        imagen={{ ...IMG.fachada, forma: 'foto' }}
      />

      <section className="section section--white">
        <div className="container split">
          <figure className="foto foto--ancha">
            <img src={IMG.sonrisaBanda.src} width={IMG.sonrisaBanda.width} height={IMG.sonrisaBanda.height} alt={IMG.sonrisaBanda.alt} loading="lazy" />
          </figure>
          <div className="split__text">
            <h2 className="display h2">{CLINICA.lema}</h2>
            <p className="lead">
              Horizonte es un centro odontológico en {CLINICA.ciudad}. Atendemos de {CLINICA.horario.dias.toLowerCase()},
              de {CLINICA.horario.horas}, con una idea simple: que te sientas escuchado y bien informado en cada visita.
            </p>
            <p className="muted">
              Desde la limpieza de control hasta la reposición de un diente, cada tratamiento parte por conocerte:
              cómo está tu boca, qué te preocupa y qué quieres lograr.
            </p>
            <Link to="/tratamientos" className="link-arrow">Ver los tratamientos <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section section--bruma">
        <div className="container">
          <div className="section__head">
            <span className="kicker">Cómo trabajamos</span>
            <h2 className="display h2">Tres ideas que guían cada visita</h2>
          </div>
          <ul className="principios">
            {PRINCIPIOS.map(({ icono: Icono, titulo, texto }) => (
              <li key={titulo}>
                <span className="principios__ico"><Icono size={26} aria-hidden="true" /></span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--white section--tight">
        <div className="container ig">
          <div>
            <h2 className="display h3">Síguenos en Instagram</h2>
            <p className="muted">Consejos de cuidado dental, tratamientos y novedades de la clínica.</p>
          </div>
          <a className="btn btn--ghost" href={CLINICA.instagram.url} target="_blank" rel="noreferrer noopener">
            <Instagram size={19} /> {CLINICA.instagram.usuario}
          </a>
        </div>
      </section>

      <BloqueReserva />
    </>
  );
}
