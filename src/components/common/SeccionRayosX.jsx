import { Link } from 'react-router-dom';
import { CalendarCheck, Check } from 'lucide-react';
import { RAYOS_X } from '../../data/clinica';
import { IMG } from '../../data/imagenes';

/** Sección de diagnóstico: los rayos X están dentro de la clínica. Se usa en la portada y en La clínica. */
export default function SeccionRayosX({ id = 'rx-titulo' }) {
  return (
    <section className="section section--rx" aria-labelledby={id}>
      <div className="trama" aria-hidden="true" />
      <div className="container rx">
        <div className="rx__texto">
          <span className="kicker">Diagnóstico</span>
          <h2 id={id} className="display h2">{RAYOS_X.titulo}</h2>
          <p className="lead">{RAYOS_X.resumen} {RAYOS_X.detalle}</p>
          <ul className="rx__puntos">
            {RAYOS_X.puntos.map(([titulo, texto]) => (
              <li key={titulo}>
                <span className="rx__check"><Check size={18} strokeWidth={3} aria-hidden="true" /></span>
                <span><strong>{titulo}</strong><span>{texto}</span></span>
              </li>
            ))}
          </ul>
          <p className="rx__nota">{RAYOS_X.nota}</p>
          <Link to="/reservar" className="btn btn--azul"><CalendarCheck size={19} /> Reservar una evaluación</Link>
        </div>
        <div className="rx__visual">
          <figure className="rx__placa">
            <img src={IMG.rayosX.src} width={IMG.rayosX.width} height={IMG.rayosX.height} alt={IMG.rayosX.alt} loading="lazy" />
            <i className="visor__esq visor__esq--a" aria-hidden="true" /><i className="visor__esq visor__esq--b" aria-hidden="true" />
            <i className="visor__esq visor__esq--c" aria-hidden="true" /><i className="visor__esq visor__esq--d" aria-hidden="true" />
            <figcaption className="visor__tag"><span className="visor__punto" aria-hidden="true" /> Radiografía de molares</figcaption>
          </figure>
          <figure className="rx__molar">
            <img src={IMG.molar.src} width={IMG.molar.width} height={IMG.molar.height} alt={IMG.molar.alt} loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  );
}
