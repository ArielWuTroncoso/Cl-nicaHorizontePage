import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('Página no encontrada');

  return (
    <section className="notfound">
      <div className="trama" aria-hidden="true" />
      <div className="container notfound__inner">
        <p className="notfound__code" aria-hidden="true">404</p>
        <h1 className="display h2">No encontramos esa página</h1>
        <p className="lead">Puede que la dirección haya cambiado. Vuelve al inicio o revisa nuestros tratamientos.</p>
        <div className="notfound__acciones">
          <Link to="/" className="btn btn--primary">Volver al inicio</Link>
          <Link to="/tratamientos" className="btn btn--ghost">Ver tratamientos</Link>
        </div>
      </div>
    </section>
  );
}
