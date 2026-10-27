import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CalendarCheck, Instagram, LogOut, Menu, MessageCircle, Phone, X } from 'lucide-react';
import Logo from '../brand/Logo';
import EstadoHorario from '../common/EstadoHorario';
import { useAuth } from '../../context/useAuth';
import { CLINICA, enlaceWhatsApp } from '../../data/clinica';

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
      {/* Franja de contacto: lo primero que se busca en una clínica, siempre a la vista al abrir la página. */}
      <div className="topbar">
        <div className="container topbar__in">
          <EstadoHorario className="topbar__estado" />
          <span className="topbar__horas">{CLINICA.horario.dias}, {CLINICA.horario.horas}</span>
          <span className="topbar__rx">Rayos X en la clínica</span>
          <nav className="topbar__links" aria-label="Contacto directo">
            <a href={`tel:${CLINICA.telefono.tel}`}><Phone size={15} aria-hidden="true" /> <span className="topbar__num">{CLINICA.telefono.label}</span><span className="topbar__llamar">Llamar</span></a>
            <a href={enlaceWhatsApp()} target="_blank" rel="noreferrer noopener" className="topbar__wa"><MessageCircle size={15} aria-hidden="true" /> WhatsApp</a>
            <a href={CLINICA.instagram.url} target="_blank" rel="noreferrer noopener" aria-label="Instagram de la clínica"><Instagram size={15} aria-hidden="true" /> <span className="topbar__ig">{CLINICA.instagram.usuario}</span></a>
          </nav>
        </div>
      </div>

      <div className="hdr__main">
        <div className="container hdr__bar">
          <Link to="/" className="hdr__brand" aria-label="Centro Odontológico Horizonte, ir al inicio">
            <Logo ancho={236} />
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
            <Link to="/reservar" className="btn btn--primary hdr__cta">
              <CalendarCheck size={18} /> Reservar hora
            </Link>
            <button
              type="button" className="hdr__icon-btn hdr__burger" onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto} aria-controls="menu-movil" aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            >
              {abierto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <nav id="menu-movil" className={`hdr__mobile${abierto ? ' is-open' : ''}`} aria-label="Navegación móvil" hidden={!abierto}>
        <div className="container">
          {NAV.map(({ to, label, exact }) => (
            <NavLink key={to} to={to} end={exact} className={clase}>{label}</NavLink>
          ))}
          <Link to="/reservar" className="btn btn--primary hdr__mobile-cta"><CalendarCheck size={18} /> Reservar hora</Link>
          <a className="btn btn--ghost" href={`tel:${CLINICA.telefono.tel}`}><Phone size={18} /> Llamar al {CLINICA.telefono.label}</a>
          {autenticado && <button type="button" className="btn btn--ghost" onClick={salir}>Cerrar sesión</button>}
        </div>
      </nav>
    </header>
  );
}
