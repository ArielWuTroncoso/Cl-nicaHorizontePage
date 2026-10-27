import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarCheck, CheckCircle2, Clock, MessageCircle, Phone, Send } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import FieldError from '../components/common/FieldError';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { enviarCita } from '../services/citasService';
import { mensajeError } from '../utils/errores';
import { CLINICA, FRANJAS, enlaceWhatsApp } from '../data/clinica';
import { TRATAMIENTOS, porSlug } from '../data/tratamientos';

const VACIO = { nombre: '', telefono: '', correo: '', tratamiento: '', fecha: '', franja: '', primeraVez: false, mensaje: '' };

/** Fecha de hoy en hora local, como la pide <input type="date">. */
function hoy() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

const esFinDeSemana = (iso) => [0, 6].includes(new Date(`${iso}T12:00:00`).getDay());

export default function ReservarPage() {
  useDocumentTitle('Reservar hora', `Reserva tu hora en el Centro Odontológico Horizonte, ${CLINICA.direccion}, ${CLINICA.ciudad}.`);

  const [params] = useSearchParams();
  const inicial = porSlug(params.get('tratamiento'))?.slug ?? '';

  const [datos, setDatos] = useState({ ...VACIO, tratamiento: inicial });
  const [errores, setErrores] = useState({});
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const okRef = useRef(null);
  const formRef = useRef(null);

  // Al fallar la validación, el foco va al primer campo con error: así se ve qué corregir, también con teclado o lector de pantalla.
  useEffect(() => {
    if (Object.values(errores).every((v) => !v)) return;
    formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
  }, [errores]);

  // Al enviar, la confirmación pasa a la vista y recibe el foco.
  useEffect(() => { if (enviado) okRef.current?.focus(); }, [enviado]);

  const cambiar = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos((d) => ({ ...d, [name]: type === 'checkbox' ? checked : value }));
    if (errores[name]) setErrores((x) => ({ ...x, [name]: null }));
  };

  const validar = () => {
    const e = {};
    if (!datos.nombre.trim()) e.nombre = 'Escribe tu nombre.';
    if (!datos.telefono.trim()) e.telefono = 'Necesitamos un teléfono para confirmar tu hora.';
    else if (!/^[+\d\s()-]{8,20}$/.test(datos.telefono.trim())) e.telefono = 'Revisa el número: usa solo dígitos, espacios y +.';
    if (datos.correo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())) e.correo = 'Revisa el formato del correo.';
    if (datos.fecha) {
      if (datos.fecha < hoy()) e.fecha = 'Elige una fecha desde hoy en adelante.';
      else if (esFinDeSemana(datos.fecha)) e.fecha = `Atendemos de ${CLINICA.horario.dias.toLowerCase()}. Elige un día de semana.`;
    }
    if (datos.mensaje.length > 1000) e.mensaje = 'El mensaje es muy largo: resúmelo en menos de 1.000 caracteres.';
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const enviar = async (ev) => {
    ev.preventDefault();
    setError('');
    if (!validar()) return;

    setEnviando(true);
    try {
      await enviarCita({
        nombre: datos.nombre.trim(),
        telefono: datos.telefono.trim(),
        correo: datos.correo.trim() || null,
        tratamiento: datos.tratamiento || null,
        fechaPreferida: datos.fecha || null,
        franja: datos.franja || null,
        primeraVez: datos.primeraVez,
        mensaje: datos.mensaje.trim() || null,
      });
      setEnviado(datos);
      setDatos(VACIO);
    } catch (err) {
      setError(`${mensajeError(err)} Si el problema continúa, escríbenos por WhatsApp o llama al ${CLINICA.telefono.label}.`);
    } finally {
      setEnviando(false);
    }
  };

  const resumenWhatsApp = (d) => {
    const trat = porSlug(d.tratamiento)?.nombre;
    const partes = [`Hola, soy ${d.nombre.trim()}. Quisiera reservar una hora`];
    if (trat) partes.push(`para ${trat.toLowerCase()}`);
    return `${partes.join(' ')}.`;
  };

  return (
    <>
      <PageHeader
        titulo="Reservar hora"
        descripcion="Cuéntanos cuándo te acomoda y qué necesitas. Te contactamos para confirmar la hora."
        migas={[{ label: 'Reservar hora' }]}
      />

      <section className="section section--bruma">
        <div className="container reservar">
          {enviado ? (
            <div className="reservar__ok" role="status" ref={okRef} tabIndex={-1}>
              <CheckCircle2 size={44} aria-hidden="true" />
              <h2 className="display h2">Recibimos tu solicitud, {enviado.nombre.trim().split(/\s+/)[0]}</h2>
              <p className="lead">
                Te contactaremos al {enviado.telefono.trim()} para confirmar tu hora. Atendemos de{' '}
                {CLINICA.horario.dias.toLowerCase()}, de {CLINICA.horario.horas}.
              </p>
              <div className="reservar__ok-acciones">
                <a className="btn btn--primary" href={enlaceWhatsApp(resumenWhatsApp(enviado))} target="_blank" rel="noreferrer noopener">
                  <MessageCircle size={19} /> Confirmar también por WhatsApp
                </a>
                <button type="button" className="btn btn--ghost" onClick={() => setEnviado(null)}>Enviar otra solicitud</button>
              </div>
            </div>
          ) : (
            <form className="form-card" onSubmit={enviar} noValidate ref={formRef}>
              <h2 className="display h3">Tus datos</h2>
              <p className="muted form-card__nota">
                Los campos con <span className="req" aria-hidden="true">*</span><span className="sr-only">asterisco</span> son obligatorios.
              </p>

              {error && <div className="alert alert--err" role="alert">{error}</div>}

              <div className="field-row">
                <div className={`field${errores.nombre ? ' field--err' : ''}`}>
                  <label htmlFor="nombre">Nombre <span className="req" aria-hidden="true">*</span></label>
                  <input id="nombre" name="nombre" value={datos.nombre} onChange={cambiar} autoComplete="name"
                    aria-required="true" aria-invalid={Boolean(errores.nombre)} aria-describedby="err-nombre" />
                  <FieldError mensaje={errores.nombre} id="err-nombre" />
                </div>
                <div className={`field${errores.telefono ? ' field--err' : ''}`}>
                  <label htmlFor="telefono">Teléfono <span className="req" aria-hidden="true">*</span></label>
                  <input id="telefono" name="telefono" type="tel" inputMode="tel" value={datos.telefono} onChange={cambiar} autoComplete="tel"
                    placeholder="+56 9 ..." aria-required="true" aria-invalid={Boolean(errores.telefono)} aria-describedby="err-telefono" />
                  <FieldError mensaje={errores.telefono} id="err-telefono" />
                </div>
              </div>

              <div className={`field${errores.correo ? ' field--err' : ''}`}>
                <label htmlFor="correo">Correo <span className="field__opt">(opcional)</span></label>
                <input id="correo" name="correo" type="email" value={datos.correo} onChange={cambiar} autoComplete="email"
                  aria-invalid={Boolean(errores.correo)} aria-describedby="err-correo" />
                <FieldError mensaje={errores.correo} id="err-correo" />
              </div>

              <h2 className="display h3 form-card__sub">Tu visita</h2>

              <div className="field">
                <label htmlFor="tratamiento">¿Qué necesitas?</label>
                <select id="tratamiento" name="tratamiento" value={datos.tratamiento} onChange={cambiar}>
                  <option value="">Aún no lo sé: quiero una evaluación</option>
                  {TRATAMIENTOS.map((t) => <option key={t.slug} value={t.slug}>{t.nombre}</option>)}
                  <option value="otro">Otra consulta</option>
                </select>
              </div>

              <div className="field-row">
                <div className={`field${errores.fecha ? ' field--err' : ''}`}>
                  <label htmlFor="fecha">Día que prefieres <span className="field__opt">(opcional)</span></label>
                  <input id="fecha" name="fecha" type="date" min={hoy()} value={datos.fecha} onChange={cambiar}
                    aria-invalid={Boolean(errores.fecha)} aria-describedby="err-fecha" />
                  <small className="field__hint">Atendemos {CLINICA.horario.dias.toLowerCase()}.</small>
                  <FieldError mensaje={errores.fecha} id="err-fecha" />
                </div>
                <fieldset className="field field--choice">
                  <legend>Horario que prefieres</legend>
                  <div className="choices">
                    {[{ id: '', etiqueta: 'Cualquiera', detalle: '' }, ...FRANJAS].map((f) => (
                      <label className="choice" key={f.id || 'cualquiera'}>
                        <input type="radio" name="franja" value={f.id} checked={datos.franja === f.id} onChange={cambiar} />
                        <span><b>{f.etiqueta}</b>{f.detalle && <small>{f.detalle}</small>}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <label className="check">
                <input type="checkbox" name="primeraVez" checked={datos.primeraVez} onChange={cambiar} />
                <span>Es mi primera visita a Horizonte</span>
              </label>

              <div className={`field${errores.mensaje ? ' field--err' : ''}`}>
                <label htmlFor="mensaje">Cuéntanos más <span className="field__opt">(opcional)</span></label>
                <textarea id="mensaje" name="mensaje" value={datos.mensaje} onChange={cambiar}
                  placeholder="Por ejemplo: tengo dolor en una muela, o quiero cambiar una restauración."
                  aria-invalid={Boolean(errores.mensaje)} aria-describedby="err-mensaje" />
                <small className={`field__hint${datos.mensaje.length > 1000 ? ' field__hint--err' : ''}`}>{datos.mensaje.length}/1000</small>
                <FieldError mensaje={errores.mensaje} id="err-mensaje" />
              </div>

              <button type="submit" className="btn btn--primary form-card__submit" disabled={enviando}>
                {enviando ? 'Enviando…' : <><Send size={18} /> Solicitar hora</>}
              </button>
              <p className="form-card__legal">
                Usamos tus datos solo para contactarte por tu hora. Esto es una solicitud: la hora queda reservada cuando te la confirmamos.
              </p>
            </form>
          )}

          <aside className="reservar__aside" aria-label="Otras formas de reservar">
            <div className="reserva-card">
              <h2 className="display h3">¿Prefieres hablar?</h2>
              <p>Reserva directamente con el equipo.</p>
              <a className="btn btn--ghost" href={`tel:${CLINICA.telefono.tel}`}><Phone size={19} /> {CLINICA.telefono.label}</a>
              <a className="btn btn--ghost" href={enlaceWhatsApp()} target="_blank" rel="noreferrer noopener">
                <MessageCircle size={19} /> Escribir por WhatsApp
              </a>
              <p className="reserva-card__horario"><Clock size={16} aria-hidden="true" /> {CLINICA.horario.dias}, {CLINICA.horario.horas}</p>
            </div>
            <div className="siguiente">
              <h2 className="display h3"><CalendarCheck size={22} aria-hidden="true" /> Después de enviar</h2>
              <ol>
                <li>Recibimos tu solicitud.</li>
                <li>Te llamamos o escribimos para acordar el día y la hora.</li>
                <li>Te esperamos en {CLINICA.direccion}, {CLINICA.ciudad}.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
