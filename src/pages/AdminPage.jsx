import { useEffect, useState } from 'react';
import { CalendarCheck, Inbox, RefreshCw } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import EmptyState from '../components/common/EmptyState';
import LoadingScreen from '../components/common/LoadingScreen';
import BienvenidaPerfil from '../components/auth/BienvenidaPerfil';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { listarCitas, marcarAtendida } from '../services/citasService';
import { mensajeError } from '../utils/errores';
import { porSlug } from '../data/tratamientos';
import { FRANJAS } from '../data/clinica';

const fecha = (iso, opciones) => (iso ? new Date(iso).toLocaleDateString('es-CL', opciones) : '—');
const nombreTratamiento = (slug) => porSlug(slug)?.nombre ?? (slug === 'evaluacion' ? 'Evaluación' : slug || '—');
const franja = (id) => FRANJAS.find((f) => f.id === id)?.etiqueta;

export default function AdminPage() {
  useDocumentTitle('Panel de administración');
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargar = async () => {
    setCargando(true); setError('');
    try {
      const datos = await listarCitas();
      setCitas(Array.isArray(datos) ? datos : []);
    } catch (err) {
      setError(mensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  const atender = async (id) => {
    try {
      await marcarAtendida(id);
      setCitas((lista) => lista.map((c) => (c.id === id ? { ...c, atendida: true } : c)));
    } catch (err) {
      setError(mensajeError(err));
    }
  };

  const pendientes = citas.filter((c) => !c.atendida).length;

  return (
    <>
      <BienvenidaPerfil />
      <PageHeader
        titulo="Solicitudes de hora"
        descripcion="Lo que las personas piden desde el sitio. Confirma la hora por teléfono o WhatsApp y marca la solicitud como atendida."
        migas={[{ label: 'Panel' }]}
      />

      <section className="section section--white">
        <div className="container">
          <div className="admin__bar">
            <p className="admin__count">
              <CalendarCheck size={18} aria-hidden="true" />
              {cargando ? 'Cargando…' : `${pendientes} ${pendientes === 1 ? 'pendiente' : 'pendientes'} de ${citas.length}`}
            </p>
            <button type="button" className="btn btn--ghost btn--sm" onClick={cargar}>
              <RefreshCw size={16} /> Actualizar
            </button>
          </div>

          {error && <div className="alert alert--err" role="alert">{error}</div>}
          {cargando && <LoadingScreen mensaje="Cargando solicitudes" />}

          {!cargando && !error && citas.length === 0 && (
            <EmptyState
              icono={Inbox} titulo="Aún no hay solicitudes"
              mensaje="Cuando alguien reserve desde el formulario, la solicitud aparecerá aquí."
            />
          )}

          {!cargando && citas.length > 0 && (
            <div className="admin__scroll">
              <table className="admin__table">
                <thead>
                  <tr>
                    <th>Recibida</th><th>Paciente</th><th>Contacto</th>
                    <th>Tratamiento</th><th>Prefiere</th><th>Estado</th><th><span className="sr-only">Acción</span></th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((c) => (
                    <tr key={c.id}>
                      <td>{fecha(c.fechaCreacion)}</td>
                      <td>
                        <strong>{c.nombre}</strong>
                        {c.primeraVez && <span className="admin__tag">Primera visita</span>}
                        {c.mensaje && <p className="admin__msg">{c.mensaje}</p>}
                      </td>
                      <td>
                        <a href={`tel:${c.telefono}`}>{c.telefono}</a>
                        {c.correo && <><br /><a href={`mailto:${c.correo}`}>{c.correo}</a></>}
                      </td>
                      <td>{nombreTratamiento(c.tratamiento)}</td>
                      <td>
                        {c.fechaPreferida ? fecha(`${c.fechaPreferida}T12:00:00`, { weekday: 'short', day: 'numeric', month: 'short' }) : 'Sin preferencia'}
                        {franja(c.franja) && <><br /><span className="admin__sub">{franja(c.franja)}</span></>}
                      </td>
                      <td>
                        <span className={`admin__state admin__state--${c.atendida ? 'on' : 'off'}`}>
                          {c.atendida ? 'Atendida' : 'Pendiente'}
                        </span>
                      </td>
                      <td>
                        {!c.atendida && (
                          <button type="button" className="btn btn--ghost btn--sm" onClick={() => atender(c.id)}>
                            Marcar atendida
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
