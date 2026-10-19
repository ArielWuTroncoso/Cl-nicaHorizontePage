import { Check } from 'lucide-react';
import Logo from '../brand/Logo';
import Horizonte from '../brand/Horizonte';

export default function AuthVisual({ titulo, texto, puntos = [] }) {
  return (
    <div className="auth__visual">
      <Horizonte tono="oscuro" conDiente={false} className="auth__art" />
      <div className="auth__visual-inner">
        <Logo size={52} tono="claro" />
        <h2 className="display h2">{titulo}</h2>
        <p>{texto}</p>
        <ul className="auth__points">
          {puntos.map((p) => (
            <li key={p}><Check size={18} strokeWidth={3} aria-hidden="true" />{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
