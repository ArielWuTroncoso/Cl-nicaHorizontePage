import { ScanLine } from 'lucide-react';

/** Aviso corto de que los rayos X están dentro de la clínica, con lo que aportan en cada tratamiento. */
export default function AvisoRayosX({ texto }) {
  return (
    <aside className="rx-aviso" aria-label="Rayos X en la clínica">
      <span className="rx-aviso__ico"><ScanLine size={26} aria-hidden="true" /></span>
      <div>
        <strong>Rayos X dentro de la clínica</strong>
        <p>{texto}</p>
      </div>
    </aside>
  );
}
