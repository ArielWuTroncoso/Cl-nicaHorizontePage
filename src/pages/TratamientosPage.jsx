import PageHeader from '../components/layout/PageHeader';
import FilaTratamiento from '../components/common/FilaTratamiento';
import BloqueReserva from '../components/common/BloqueReserva';
import AvisoRayosX from '../components/common/AvisoRayosX';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { AREAS, delArea } from '../data/tratamientos';
import { RAYOS_X } from '../data/clinica';
import { IMG } from '../data/imagenes';

export default function TratamientosPage() {
  useDocumentTitle(
    'Tratamientos',
    'Carillas, restauraciones, limpiezas dentales, implantes, endodoncias, coronas y prótesis en Concepción.',
  );

  return (
    <>
      <PageHeader
        titulo="Tratamientos"
        descripcion="Siete tratamientos para cuidar, reparar y reponer tus dientes. Elige uno para ver en qué consiste y cómo lo hacemos."
        migas={[{ label: 'Tratamientos' }]}
        imagen={{ ...IMG.molar, forma: 'tarjeta' }}
      />

      <section className="section section--bruma">
        <div className="container grupos">
          {AREAS.map((a) => (
            <div className="indice" key={a.id}>
              <div className="indice__intro">
                <h2 className="display h3">{a.nombre}</h2>
                <p className="muted">{a.descripcion}</p>
              </div>
              <ul className="indice__lista">
                {delArea(a.id).map((t) => <FilaTratamiento key={t.slug} t={t} />)}
              </ul>
            </div>
          ))}
          <AvisoRayosX texto={`${RAYOS_X.resumen} ${RAYOS_X.detalle}`} />
          <p className="nota">
            La información es general. Qué tratamiento corresponde, y cómo, lo define tu odontólogo después de evaluarte.
          </p>
        </div>
      </section>

      <BloqueReserva titulo="¿No sabes cuál necesitas? Empecemos por una evaluación" />
    </>
  );
}
