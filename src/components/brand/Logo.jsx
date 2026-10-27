import { DIENTE } from './Diente';

/**
 * `Marca`: el diente dentro del anillo con sus cuatro puntos cardinales, en vectores.
 * Se usa como viñeta en la banda de tratamientos.
 *
 *   tono="color"  → turquesa sobre fondo claro
 *   tono="claro"  → celeste sobre fondo oscuro
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

/**
 * Logotipo de Horizonte con la leyenda debajo: el nombre en letra plana (serif de trazo fino, en el
 * turquesa del letrero) y el diente dentro del anillo en lugar de la "o".
 * El archivo es `public/img/logo-horizonte.svg`, vectorial y con fondo transparente: nítido a cualquier
 * tamaño y válido sobre claro y sobre oscuro. Si la clínica entrega su archivo oficial, basta reemplazarlo ahí.
 *
 *   tono="color"  → leyenda oscura, para fondo claro
 *   tono="claro"  → leyenda blanca, para fondo oscuro
 */
export default function Logo({ ancho = 220, tono = 'color', conLema = true, className = '' }) {
  return (
    <span className={`logo logo--${tono} ${className}`.trim()} style={{ '--logo-w': `${ancho}px` }}>
      <img className="logo__img" src="/img/logo-horizonte.svg" width="475" height="100" alt="Horizonte" />
      {conLema && <span className="logo__sub">Centro odontológico</span>}
    </span>
  );
}
