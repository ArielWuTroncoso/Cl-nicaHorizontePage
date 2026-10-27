import { useEffect, useState } from 'react';
import { estadoClinica } from '../../utils/horario';

/** Indicador "Abierto ahora / Cerrado": se recalcula cada minuto, sin recargar la página. */
export default function EstadoHorario({ className = '' }) {
  const [estado, setEstado] = useState(() => estadoClinica());

  useEffect(() => {
    const id = setInterval(() => setEstado(estadoClinica()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`estado${estado.abierto ? ' estado--abierto' : ''} ${className}`.trim()}>
      <span className="estado__punto" aria-hidden="true" />
      <span>{estado.texto}</span>
    </span>
  );
}
