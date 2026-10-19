import { DIENTE } from './Diente';

/**
 * Iconos de línea de los siete tratamientos. Comparten el diente del logotipo
 * (caja de 100 × 120 escalada) y un trazo de 1,6 px que no cambia con la escala.
 */
const D = ({ x = 5, y = 3, s = 0.22 }) => (
  <path d={DIENTE} transform={`translate(${x} ${y}) scale(${s})`} vectorEffect="non-scaling-stroke" />
);

const ICONOS = {
  carillas: (
    <>
      <D x={4} y={5} s={0.2} />
      <path d="M24.5 3.5l1 2.7 2.7 1-2.7 1-1 2.700-1-2.700-2.700-1 2.700-1z" />
      <path d="M11 10.500c-1.500.6-2.400 2.100-2.400 3.800" />
    </>
  ),
  restauraciones: (
    <>
      <D />
      <path d="M11.600 12.200l3.200 3.200 5.600-6.200" />
    </>
  ),
  limpiezas: (
    <>
      <D x={4} y={5} s={0.2} />
      <path d="M25 4l.9 2.300 2.300.9-2.300.9L25 10.400l-.9-2.300-2.300-.9 2.300-.9z" />
      <circle cx="6" cy="6" r="1.300" />
      <circle cx="28" cy="15" r="1" />
    </>
  ),
  implantes: (
    <>
      <path d="M8 12.500C8 8.500 11 6 16 6s8 2.500 8 6.500c0 2-.8 3.500-2 4.200H10c-1.200-.7-2-2.200-2-4.200z" />
      <path d="M12.500 17.500h7l-1 9.500-2.500 2.300-2.500-2.300z" />
      <path d="M12.800 21h6.400M13.100 24h5.800" />
    </>
  ),
  endodoncias: (
    <>
      <D />
      <path d="M16 9v5M16 14l-2.600 5.500M16 14l2.600 5.500" />
    </>
  ),
  coronas: (
    <>
      <D />
      <path d="M7.500 12.500c3.200 1.700 13.800 1.700 17 0" />
    </>
  ),
  protesis: (
    <>
      {[[6, 19, -28], [10.500, 13.500, -14], [16, 11.500, 0], [21.500, 13.500, 14], [26, 19, 28]].map(([x, y, r]) => (
        <ellipse key={x} cx={x} cy={y} rx="2.700" ry="3.800" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <path d="M3.500 23.500c2 3.500 6.500 5 12.500 5s10.500-1.500 12.500-5" />
    </>
  ),
};

export default function IconoTratamiento({ nombre, size = 28, className = '' }) {
  return (
    <svg
      className={className} width={size} height={size} viewBox="0 0 32 32"
      fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"
    >
      {ICONOS[nombre] ?? ICONOS.restauraciones}
    </svg>
  );
}
