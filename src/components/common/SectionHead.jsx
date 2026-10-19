export default function SectionHead({ kicker, titulo, descripcion, nivel = 2 }) {
  const H = `h${nivel}`;
  return (
    <header className="section__head">
      {kicker && <span className="kicker">{kicker}</span>}
      <H className="display h2">{titulo}</H>
      {descripcion && <p className="lead">{descripcion}</p>}
    </header>
  );
}
