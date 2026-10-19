import { Check, Circle } from 'lucide-react';
import { evaluarClave } from '../../utils/clave';

/** Lista en vivo de las condiciones que debe cumplir la contraseña. */
export default function ReglasClave({ clave, id }) {
  const reglas = evaluarClave(clave);

  return (
    <ul className="pw-rules" id={id} aria-label="Condiciones de la contraseña">
      {reglas.map((r) => (
        <li key={r.id} className={r.cumple ? 'is-ok' : ''}>
          {r.cumple ? <Check size={15} strokeWidth={3} aria-hidden="true" /> : <Circle size={15} aria-hidden="true" />}
          <span>{r.es}</span>
          <span className="sr-only">{r.cumple ? ' — cumplida' : ' — pendiente'}</span>
        </li>
      ))}
    </ul>
  );
}
