import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import FieldError from '../common/FieldError';

/** Campo de contraseña con botón para mostrar u ocultar lo escrito. */
export default function CampoClave({ id, name, label, value, onChange, autoComplete, error, describedBy, children }) {
  const [visible, setVisible] = useState(false);
  const errId = `err-${id}`;

  return (
    <div className={`field${error ? ' field--err' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <div className="pw">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={[error ? errId : null, describedBy].filter(Boolean).join(' ') || undefined}
        />
        <button
          type="button"
          className="pw__toggle"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <FieldError mensaje={error} id={errId} />
      {children}
    </div>
  );
}
