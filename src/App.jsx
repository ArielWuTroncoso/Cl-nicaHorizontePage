import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AccesoSecreto from './components/auth/AccesoSecreto';
import LoadingScreen from './components/common/LoadingScreen';
import BarraContacto from './components/common/BarraContacto';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';

const TratamientosPage = lazy(() => import('./pages/TratamientosPage'));
const TratamientoPage  = lazy(() => import('./pages/TratamientoPage'));
const ClinicaPage      = lazy(() => import('./pages/ClinicaPage'));
const ReservarPage     = lazy(() => import('./pages/ReservarPage'));
const ContactoPage     = lazy(() => import('./pages/ContactoPage'));
const AccesoPage       = lazy(() => import('./pages/AccesoPage'));
const AdminPage        = lazy(() => import('./pages/AdminPage'));
const NotFoundPage     = lazy(() => import('./pages/NotFoundPage'));

/** Cada cambio de ruta vuelve al inicio de la página. */
function ScrollAlTope() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <ScrollAlTope />
      <AccesoSecreto />
      <Header />

      <main id="contenido">
        <Suspense fallback={<LoadingScreen mensaje="Cargando" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tratamientos" element={<TratamientosPage />} />
            <Route path="/tratamientos/:slug" element={<TratamientoPage />} />
            <Route path="/clinica" element={<ClinicaPage />} />
            <Route path="/reservar" element={<ReservarPage />} />
            <Route path="/contacto" element={<ContactoPage />} />

            <Route path="/acceso" element={<AccesoPage />} />
            <Route path="/admin" element={<ProtectedRoute soloAdmin><AdminPage /></ProtectedRoute>} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <BarraContacto />
    </AuthProvider>
  );
}
