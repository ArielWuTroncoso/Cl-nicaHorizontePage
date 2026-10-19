
export default function LoadingScreen({ mensaje }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>{mensaje ?? 'Cargando'}…</p>
    </div>
  );
}
