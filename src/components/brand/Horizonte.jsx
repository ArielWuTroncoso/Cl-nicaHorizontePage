import { useId } from 'react';
import { DIENTE, DIENTE_BRILLO } from './Diente';

/**
 * Ilustración "Horizonte": anillos concéntricos que asoman sobre la línea del
 * horizonte (el borde inferior del dibujo) y, opcionalmente, el diente dentro del
 * disco central, como un sol que sale.
 *
 * El borde inferior del SVG ES la línea de horizonte: el contenedor la continúa
 * con un borde para que el dibujo parezca apoyado sobre ella.
 *
 *   tono="claro"   → sobre fondos claros (portada)
 *   tono="oscuro"  → sobre el bloque azul marino (cierre y pie de página)
 */
export default function Horizonte({ tono = 'claro', conDiente = true, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const oscuro = tono === 'oscuro';
  const anillo = oscuro ? '#2DB0E0' : 'var(--hz-400)';

  return (
    <svg
      className={className} viewBox="0 0 780 400" preserveAspectRatio="xMidYMax meet"
      fill="none" aria-hidden="true" focusable="false"
    >
      <defs>
        <radialGradient id={`disco-${uid}`} cx="50%" cy="100%" r="100%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset=".62" stopColor="#E6F4F7" />
          <stop offset="1" stopColor="#CBE8EE" />
        </radialGradient>
        <linearGradient id={`diente-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E3F1F5" />
        </linearGradient>
      </defs>

      {[[390, 0.14], [330, 0.22], [270, 0.34]].map(([r, o]) => (
        <circle key={r} cx="390" cy="400" r={r} stroke={anillo} strokeOpacity={oscuro ? o * 1.9 : o + 0.12} strokeWidth="1.4" />
      ))}

      {conDiente ? (
        <>
          <circle cx="390" cy="400" r="210" fill={`url(#disco-${uid})`} stroke="var(--hz-400)" strokeOpacity=".8" strokeWidth="1.6" />
          {[[390, 190], [180, 400], [600, 400]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="#fff" stroke="var(--hz-500)" strokeWidth="2" />
          ))}
          <ellipse cx="390" cy="397" rx="96" ry="6" fill="var(--hz-600)" opacity=".16" />
          <g transform="translate(295 187) scale(1.9)">
            <path d={DIENTE} fill={`url(#diente-${uid})`} stroke="var(--hz-500)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            <path d={DIENTE_BRILLO} stroke="#fff" strokeWidth="2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity=".95" />
          </g>
        </>
      ) : (
        <circle cx="390" cy="400" r="210" stroke={anillo} strokeOpacity={oscuro ? 0.5 : 0.7} strokeWidth="1.4" />
      )}
    </svg>
  );
}
