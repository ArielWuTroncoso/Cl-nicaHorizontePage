import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

/** Acordeón de preguntas. Se abre con una transición de altura para que se vea qué cambió. */
export default function Faq({ items }) {
  const base = useId();
  const [abierta, setAbierta] = useState(null);

  return (
    <div className="faq">
      {items.map(([q, a], i) => {
        const open = abierta === i;
        return (
          <div className={`faq__item${open ? ' is-open' : ''}`} key={q}>
            <h3>
              <button
                type="button" className="faq__q" aria-expanded={open}
                aria-controls={`${base}-${i}`} id={`${base}-q-${i}`}
                onClick={() => setAbierta(open ? null : i)}
              >
                <span>{q}</span>
                <Plus size={20} aria-hidden="true" />
              </button>
            </h3>
            <div className="faq__panel" id={`${base}-${i}`} role="region" aria-labelledby={`${base}-q-${i}`}>
              <div><p>{a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
