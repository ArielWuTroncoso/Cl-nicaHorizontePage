import { useEffect, useRef, useState } from 'react';
import { CalendarCheck, Inbox, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/useAuth';

/**
 * Ventana de bienvenida al perfil. Aparece al entrar por primera vez al panel
 * y no vuelve a mostrarse una vez cerrada (el backend guarda que ya se vio).
 */
export default function BienvenidaPerfil() {
  const { usuario, marcarBienvenida } = useAuth();
  const [cerrada, setCerrada] = useState(false);
  const botonRef = useRef(null);

  const visible = Boolean(usuario) && usuario.bienvenidaVista === false && !cerrada;

  const cerrar = () => {
    setCerrada(true);
    marcarBienvenida().catch(() => { /* si falla, se mostrará de nuevo en el próximo ingreso */ });
  };

  useEffect(() => {
    if (!visible) return undefined;
    botonRef.current?.focus();
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const alTeclear = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); cerrar(); }
      // Hay un único elemento enfocable: el foco no debe escapar del diálogo.
      if (e.key === 'Tab') { e.preventDefault(); botonRef.current?.focus(); }
    };
    document.addEventListener('keydown', alTeclear);
    return () => {
      document.body.style.overflow = overflowPrevio;
      document.removeEventListener('keydown', alTeclear);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  const primerNombre = usuario.nombre?.trim().split(/\s+/)[0] ?? '';
  const alta = usuario.fechaCreacion
    ? new Date(usuario.fechaCreacion).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  return (
    <div className="modal" role="presentation">
      <div className="modal__card" role="dialog" aria-modal="true" aria-labelledby="bienvenida-titulo" aria-describedby="bienvenida-texto">
        <span className="modal__icon" aria-hidden="true"><ShieldCheck size={28} /></span>
        <span className="kicker">Perfil de administrador</span>
        <h2 id="bienvenida-titulo" className="display h3">
          Te damos la bienvenida{primerNombre && `, ${primerNombre}`}
        </h2>
        <p id="bienvenida-texto">
          Tu cuenta de administrador está lista. Este es tu perfil:
        </p>

        <dl className="modal__perfil">
          <div><dt>Nombre</dt><dd>{usuario.nombre}</dd></div>
          <div><dt>Correo</dt><dd>{usuario.correo}</dd></div>
          <div><dt>Rol</dt><dd>Administrador</dd></div>
          <div><dt>Cuenta creada</dt><dd>{alta}</dd></div>
        </dl>

        <ul className="modal__lista">
          <li><Inbox size={18} aria-hidden="true" />Revisa las solicitudes de hora que llegan desde el sitio.</li>
          <li><CalendarCheck size={18} aria-hidden="true" />Márcalas como atendidas cuando confirmes la hora con el paciente.</li>
        </ul>

        <p className="modal__nota">
          Recuerda cerrar sesión al terminar, sobre todo en equipos compartidos.
        </p>

        <button ref={botonRef} type="button" className="btn btn--primary modal__cta" onClick={cerrar}>
          Entrar al panel
        </button>
      </div>
    </div>
  );
}
