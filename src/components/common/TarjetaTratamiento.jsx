import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { fotoTratamiento } from '../../data/imagenes';

/**
 * Tarjeta de tratamiento para la portada. Si recibe `grande` e `imagen`, ocupa dos columnas y
 * muestra la imagen a la derecha, difuminada hacia el texto.
 */
export default function TarjetaTratamiento({ t, area, grande = false, imagen = null }) {
  const foto = fotoTratamiento(t.slug);
  return (
    <li className="tarjeta-li" style={{ gridArea: area }}>
      <Link to={`/tratamientos/${t.slug}`} className={`tarjeta${grande ? ' tarjeta--grande' : ''}`}>
        {grande && imagen && <img className="tarjeta__bg" src={imagen.src} width={imagen.width} height={imagen.height} alt="" loading="lazy" />}
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
