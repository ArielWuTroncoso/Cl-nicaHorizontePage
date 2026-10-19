import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { fotoTratamiento } from '../../data/imagenes';

/** Fila del índice de tratamientos: foto circular, nombre, una línea que lo explica y la flecha. */
export default function FilaTratamiento({ t }) {
  const foto = fotoTratamiento(t.slug);
  return (
    <li>
      <Link to={`/tratamientos/${t.slug}`} className="fila">
        <img className="fila__foto" src={foto.src} width="72" height="72" alt="" loading="lazy" />
        <span className="fila__text">
          <strong>{t.nombre}</strong>
          <span>{t.resumen}</span>
        </span>
        <span className="fila__go" aria-hidden="true"><ArrowUpRight size={20} /></span>
      </Link>
    </li>
  );
}
