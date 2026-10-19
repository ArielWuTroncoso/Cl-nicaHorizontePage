import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CalendarCheck, LogOut, Menu, X } from 'lucide-react';
import Logo from '../brand/Logo';
import { useAuth } from '../../context/useAuth';

export const NAV = [
  { to: '/', label: 'Inicio', exact: true },
  { to: '/tratamientos', label: 'Tratamientos' },
  { to: '/clinica', label: 'La clínica' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { autenticado, esAdmin, cerrarSesion } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => { setAbierto(false); }, [pathname]);

  useEffect(() => {
    const alScroll = () => setScrolled(window.scrollY > 8);
    alScroll();
    window.addEventListener('scroll', alScroll, { passive: true });
    return () => window.removeEventListener('scroll', alScroll);
  }, []);

  // Con el menú abierto en el celular, la página de atrás no se desplaza.
  useEffect(() => {
    if (!abierto) return undefined;
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const alTeclear = (e) => { if (e.key === 'Escape') setAbierto(false); };
    document.addEventListener('keydown', alTeclear);
    return () => { document.body.style.overflow = previo; document.removeEventListener('keydown', alTeclear); };
  }, [abierto]);

  const salir = () => { cerrarSesion(); navigate('/'); };
  const clase = ({ isActive }) => `hdr__link${isActive ? ' is-active' : ''}`;

  return (
    <header className={`hdr${scrolled || abierto ? ' is-scrolled' : ''}`}>
      <div className="container hdr__bar">
        <Link to="/" className="hdr__brand" aria-label="Centro Odontológico Horizonte, ir al inicio">
          <Logo size={46} tono="claro" />
        </Link>

        <nav className="hdr__nav" aria-label="Navegación principal">
          {NAV.map(({ to, label, exact }) => (
            <NavLink key={to} to={to} end={exact} className={clase}>{label}</NavLink>
          ))}
        </nav>

        <div className="hdr__actions">
          {/* El acceso de administración no tiene enlace público: se entra con ↑ ↓. */}
          {autenticado && (
            <>
              {esAdmin && <Link to="/admin" className="btn btn--ghost btn--sm">Panel</Link>}
              <button type="button" className="hdr__icon-btn" onClick={salir} aria-label="Cerrar sesión"><LogOut size={19} /></button>
            </>
          )}
          <Link to="/reservar" className="btn btn--primary btn--sm hdr__cta">
            <CalendarCheck size={17} /> Reservar hora
          </Link>
          <button
            type="button" className="hdr__icon-btn hdr__burger" onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto} aria-controls="menu-movil" aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          >
            {abierto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <nav id="menu-movil" className={`hdr__mobile${abierto ? ' is-open' : ''}`} aria-label="Navegación móvil" hidden={!abierto}>
        <div className="container">
          {NAV.map(({ to, label, exact }) => (
            <NavLink key={to} to={to} end={exact} className={clase}>{label}</NavLink>
          ))}
          <Link to="/reservar" className="btn btn--primary hdr__mobile-cta"><CalendarCheck size={18} /> Reservar hora</Link>
          {autenticado && <button type="button" className="btn btn--ghost" onClick={salir}>Cerrar sesión</button>}
        </div>
      </nav>
    </header>
  );
}
