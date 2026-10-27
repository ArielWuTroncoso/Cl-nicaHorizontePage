import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Cabecera de las páginas interiores, sobre negro: migas, título y, si se pasa
 * `imagen`, una foto a la derecha. `imagen.forma` puede ser 'circulo', 'arco' o 'tarjeta'.
 */
export default function PageHeader({ titulo, descripcion, migas = [], imagen, children }) {
  return (
    <section className="pagehead">
      <div className="pagehead__bg" aria-hidden="true">
        <div className="trama" aria-hidden="true" />
      </div>
      <div className={`container pagehead__wrap${imagen ? ' has-fig' : ''}`}>
        <div className="pagehead__inner">
          {migas.length > 0 && (
            <nav className="pagehead__crumbs" aria-label="Ruta de navegación">
              <Link to="/">Inicio</Link>
              {migas.map((m) => (
                <span key={m.label} style={{ display: 'contents' }}>
                  <ChevronRight size={14} aria-hidden="true" />
                  {m.to ? <Link to={m.to}>{m.label}</Link> : <span aria-current="page">{m.label}</span>}
                </span>
              ))}
            </nav>
          )}
          <h1 className="display h1 pagehead__title">{titulo}</h1>
          {descripcion && <p className="lead">{descripcion}</p>}
          {children}
        </div>
        {imagen && (
          <figure className={`pagehead__fig pagehead__fig--${imagen.forma ?? 'arco'}`}>
            <img src={imagen.src} width={imagen.width} height={imagen.height} alt={imagen.alt ?? ''} />
          </figure>
        )}
      </div>
    </section>
  );
}
