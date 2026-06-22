import './ResultModal.css';
import { EditIcon, RefreshCwIcon, StarIcon } from './icons';

export default function ResultModal({
  result,
  cats,
  catColors,
  shade,
  onClose,
  onSpin,
  onGoBuild
}) {
  if (!result) return null;

  const catIdx = cats.findIndex(c => c.name === result.category);
  const resBase = result ? (catColors()[catIdx % catColors().length] || '#E0542E') : '#E0542E';
  const chipBg = shade(resBase, 0.84);
  const chipBorder = shade(resBase, 0.58);
  const chipText = shade(resBase, -0.28);

  const confettiPieces = Array.from({ length: 18 }).map((_, i) => {
    const left = Math.round(Math.random() * 100);
    const sz = 6 + Math.round(Math.random() * 7);
    const delay = (Math.random() * 0.25).toFixed(2);
    const dur = (0.9 + Math.random() * 0.7).toFixed(2);
    const rot = Math.round(Math.random() * 360);
    const round = Math.random() > 0.5 ? '50%' : '2px';
    const color = catColors()[i % catColors().length];

    return (
      <span
        key={i}
        className="confetti-piece"
        style={{
          left: left + '%',
          width: sz,
          height: sz,
          background: color,
          borderRadius: round,
          transform: `rotate(${rot}deg)`,
          animation: `confetti ${dur}s ${delay}s ease-in forwards`
        }}
      />
    );
  });

  return (
    <>
      <div className="result-overlay" onClick={onClose} />
      <div className="result-modal">
        <div className="result-handle" />
        <div className="confetti-container">
          {confettiPieces}
        </div>
        <p className="result-label">
          <StarIcon /> Hoje vocês vão a <StarIcon />
        </p>
        <h2 className="result-name">{result.name}</h2>
        <div className="result-category">
          <span
            className="result-dot"
            style={{ background: resBase }}
          />
          <span className="result-category-text">{result.category}</span>
        </div>
        <div className="result-actions">
          <button onClick={onGoBuild} className="btn-edit">
            <EditIcon />
            Editar
          </button>
          <button onClick={onSpin} className="btn-spin">
            <RefreshCwIcon />
            Girar de novo
          </button>
        </div>
      </div>
    </>
  );
}
