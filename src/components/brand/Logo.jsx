import { DIENTE } from './Diente';

/**
 * Logotipo de Horizonte: el diente dentro del anillo con sus cuatro puntos
 * cardinales (como en la fachada), y el nombre en serif.
 *
 * Es una reconstrucción vectorial a partir de la fachada y los afiches. Cuando la
 * clínica entregue su archivo oficial, basta reemplazar `Marca` por esa imagen.
 *
 *   tono="color"  → turquesa sobre fondo claro
 *   tono="claro"  → blanco sobre fondo oscuro
 */
export function Marca({ size = 44, tono = 'color', className = '' }) {
  const trazo = tono === 'claro' ? '#2DB0E0' : 'var(--hz-600)';
  const relleno = '#fff';
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="22" stroke={trazo} strokeWidth="2.4" />
      {[[32, 10], [32, 54], [10, 32], [54, 32]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" fill={tono === 'claro' ? '#090D13' : '#fff'} stroke={trazo} strokeWidth="2" />
      ))}
      <g transform="translate(20.2 17.4) scale(.236)">
        <path d={DIENTE} fill={relleno} stroke={trazo} strokeWidth="8" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export default function Logo({ size = 44, tono = 'color', conLema = true, className = '' }) {
  return (
    <span className={`logo logo--${tono} ${className}`.trim()}>
      <Marca size={size} tono={tono} />
      <span className="logo__words">
        <span className="logo__name">Horizonte</span>
        {conLema && <span className="logo__sub">Centro odontológico</span>}
      </span>
    </span>
  );
}
