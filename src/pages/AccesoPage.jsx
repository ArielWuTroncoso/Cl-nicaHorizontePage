import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthVisual from '../components/layout/AuthVisual';
import FieldError from '../components/common/FieldError';
import CampoClave from '../components/auth/CampoClave';
import ReglasClave from '../components/auth/ReglasClave';
import { useAuth } from '../context/useAuth';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { mensajeError } from '../utils/errores';
import { claveValida } from '../utils/clave';

const MARCA_REGISTRADO = 'horizonte:admin-registrado';
const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VACIO = { nombre: '', correo: '', contrasena: '', confirmar: '', codigo: '' };

const yaSeRegistro = () => {
  try { return localStorage.getItem(MARCA_REGISTRADO) === '1'; } catch { return false; }
};
const recordarRegistro = () => {
  try { localStorage.setItem(MARCA_REGISTRADO, '1'); } catch { /* ignorar */ }
};

/**
 * Acceso de administradores. Se llega con la secuencia ↑ ↓ del teclado.
 * Un administrador nuevo se registra primero (correo, contraseña y código de
 * autorización); quien ya tiene cuenta usa la pestaña "Ingresar".
 */
export default function AccesoPage() {
  const { iniciarSesion, registrarAdmin, autenticado, esAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Quien nunca se ha registrado en este equipo empieza por el registro.
  const [modo, setModo] = useState(() => (yaSeRegistro() ? 'ingreso' : 'registro'));
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const registro = modo === 'registro';
  useDocumentTitle(registro ? 'Registro de administrador' : 'Ingreso de administrador');

  if (autenticado) return <Navigate to={location.state?.desde ?? (esAdmin ? '/admin' : '/')} replace />;

  const cambiarModo = (nuevo) => {
    setModo(nuevo);
    setErrores({});
    setError('');
    setDatos((d) => ({ ...VACIO, correo: d.correo }));
  };

  const cambiar = (e) => {
    const { name, value } = e.target;
    setDatos((d) => ({ ...d, [name]: value }));
    if (errores[name]) setErrores((x) => ({ ...x, [name]: null }));
  };

  const validar = () => {
    const e = {};
    if (registro && !datos.nombre.trim()) e.nombre = 'Ingresa tu nombre.';
    if (!datos.correo.trim()) e.correo = 'Ingresa tu correo.';
    else if (!CORREO_VALIDO.test(datos.correo.trim())) e.correo = 'Revisa el formato del correo.';

    if (!datos.contrasena) {
      e.contrasena = registro ? 'Define una contraseña.' : 'Ingresa tu contraseña.';
    } else if (registro && !claveValida(datos.contrasena)) {
      e.contrasena = 'La contraseña no cumple todas las condiciones.';
    }
    if (registro) {
      if (datos.confirmar !== datos.contrasena) e.confirmar = 'Las contraseñas no coinciden.';
      if (!datos.codigo.trim()) e.codigo = 'Ingresa el código de autorización.';
    }
    return e;
  };

  const mensaje = (err) => mensajeError(err);

  const enviar = async (ev) => {
    ev.preventDefault();
    setError('');
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length) return;

    setEnviando(true);
    try {
      if (registro) {
        await registrarAdmin({
          nombre: datos.nombre.trim(),
          correo: datos.correo.trim(),
          contrasena: datos.contrasena,
          codigo: datos.codigo.trim(),
        });
      } else {
        await iniciarSesion(datos.correo.trim(), datos.contrasena);
      }
      recordarRegistro();
      navigate(location.state?.desde ?? '/admin', { replace: true });
    } catch (err) {
      setError(mensaje(err));
    } finally {
      setEnviando(false);
    }
  };

  const idPestana = (m) => `tab-${m}`;

  return (
    <div className="auth">
      <AuthVisual
        titulo="Acceso de administradores"
        texto="Un espacio reservado para el equipo de Horizonte: aquí se gestionan las solicitudes de hora que llegan desde el sitio."
        puntos={[
          'Solicitudes de hora en un solo lugar',
          'Marca cada solicitud como atendida',
          'Registro protegido con código de autorización',
        ]}
      />

      <div className="auth__panel">
        <div className="auth__form">
          <div className="auth__tabs" role="tablist" aria-label="Tipo de acceso">
            {[['registro', 'Registrarme'], ['ingreso', 'Ingresar']].map(([id, etiqueta]) => (
              <button
                key={id}
                id={idPestana(id)}
                type="button"
                role="tab"
                aria-selected={modo === id}
                aria-controls="panel-acceso"
                className={modo === id ? 'is-active' : ''}
                onClick={() => cambiarModo(id)}
              >
                {etiqueta}
              </button>
            ))}
          </div>

          <div id="panel-acceso" role="tabpanel" aria-labelledby={idPestana(modo)}>
            <h1 className="display h3">
              {registro ? 'Registro de administrador' : 'Ingreso de administrador'}
            </h1>
            <p className="auth__lead">
              {registro
                ? 'Crea tu cuenta con tu correo y una contraseña segura. Al terminar entrarás directo a tu perfil.'
                : 'Ingresa con el correo y la contraseña de tu cuenta.'}
            </p>

            {error && <div className="alert alert--err" role="alert">{error}</div>}

            <form onSubmit={enviar} noValidate>
              {registro && (
                <div className={`field${errores.nombre ? ' field--err' : ''}`}>
                  <label htmlFor="nombre">Nombre completo</label>
                  <input id="nombre" name="nombre" value={datos.nombre} onChange={cambiar}
                    autoComplete="name" aria-invalid={errores.nombre ? 'true' : undefined} aria-describedby={errores.nombre ? 'err-nombre' : undefined} />
                  <FieldError mensaje={errores.nombre} id="err-nombre" />
                </div>
              )}

              <div className={`field${errores.correo ? ' field--err' : ''}`}>
                <label htmlFor="correo">Correo</label>
                <input id="correo" name="correo" type="email" value={datos.correo} onChange={cambiar}
                  autoComplete="email" aria-invalid={errores.correo ? 'true' : undefined} aria-describedby={errores.correo ? 'err-correo' : undefined} />
                <FieldError mensaje={errores.correo} id="err-correo" />
              </div>

              <CampoClave
                id="contrasena"
                name="contrasena"
                label="Contraseña"
                value={datos.contrasena}
                onChange={cambiar}
                autoComplete={registro ? 'new-password' : 'current-password'}
                error={errores.contrasena}
                describedBy={registro ? 'reglas-clave' : undefined}
              >
                {registro && <ReglasClave clave={datos.contrasena} id="reglas-clave" />}
              </CampoClave>

              {registro && (
                <>
                  <CampoClave
                    id="confirmar"
                    name="confirmar"
                    label="Repetir contraseña"
                    value={datos.confirmar}
                    onChange={cambiar}
                    autoComplete="new-password"
                    error={errores.confirmar}
                  />

                  <div className={`field${errores.codigo ? ' field--err' : ''}`}>
                    <label htmlFor="codigo">Código de autorización</label>
                    <input id="codigo" name="codigo" type="password" value={datos.codigo} onChange={cambiar}
                      autoComplete="off" spellCheck="false"
                      aria-invalid={errores.codigo ? 'true' : undefined}
                      aria-describedby={errores.codigo ? 'err-codigo ayuda-codigo' : 'ayuda-codigo'} />
                    <FieldError mensaje={errores.codigo} id="err-codigo" />
                    <span className="field__hint" id="ayuda-codigo">
                      Te lo entrega quien administra el sitio.
                    </span>
                  </div>
                </>
              )}

              <button type="submit" className="btn btn--primary auth__submit" disabled={enviando}>
                {registro
                  ? (enviando ? 'Creando cuenta…' : 'Crear cuenta de administrador')
                  : (enviando ? 'Ingresando…' : 'Ingresar')}
              </button>
            </form>

            <p className="auth__alt">
              {registro ? '¿Ya tienes cuenta?' : '¿Primera vez aquí?'}{' '}
              <button type="button" className="auth__link" onClick={() => cambiarModo(registro ? 'ingreso' : 'registro')}>
                {registro ? 'Ingresa' : 'Regístrate'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
