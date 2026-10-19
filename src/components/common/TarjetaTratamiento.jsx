import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { fotoTratamiento } from '../../data/imagenes';

/** Tarjeta de tratamiento para la portada: la foto del afiche en un anillo azul, el nombre y una línea. */
export default function TarjetaTratamiento({ t }) {
  const foto = fotoTratamiento(t.slug);
  return (
    <li className="tarjeta-li">
      <Link to={`/tratamientos/${t.slug}`} className="tarjeta">
        <span className="tarjeta__foto">
          <img src={foto.src} width="96" height="96" alt="" loading="lazy" />
        </span>
        <strong className="tarjeta__nombre">{t.nombre}</strong>
        <span className="tarjeta__texto">{t.resumen}</span>
        <span className="tarjeta__go" aria-hidden="true"><ArrowUpRight size={20} /></span>
      </Link>
    </li>
  );
}
