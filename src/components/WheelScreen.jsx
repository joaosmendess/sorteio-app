import './WheelScreen.css';
import { ChevronLeftIcon } from './icons';

export default function WheelScreen({
  cats,
  rot,
  spinning,
  catColors,
  shade,
  accent,
  onSpin,
  onGoBuild,
  total
}) {
  const flat = () => {
    const cc = catColors();
    const out = [];
    cats.forEach((c, ci) => {
      const base = cc[ci % cc.length];
      const dark = shade(base, -0.16);
      c.options.forEach((r, ri) => {
        out.push({ name: r, category: c.name, base, fill: ri % 2 === 0 ? base : dark });
      });
    });
    return out;
  };

  const list = flat();
  const n = list.length;
  const size = 290;
  const seg = n ? 360 / n : 360;

  const stops = n === 0
    ? '#EADFCF 0deg 360deg'
    : list.map((o, i) => `${o.fill} ${i * seg}deg ${(i + 1) * seg}deg`).join(', ');
  const gradient = `conic-gradient(from 0deg, ${stops})`;

  const totalLabel = total === 0
    ? 'Adicione ao menos 2 restaurantes'
    : `${total} restaurante${total > 1 ? 's' : ''} na roleta`;

  return (
    <div className="wheel-screen">
      <div className="wheel-header">
        <button onClick={onGoBuild} className="btn-back">
          <ChevronLeftIcon />
          Editar lista
        </button>
        <span className="wheel-label">A roleta</span>
      </div>

      <div className="wheel-container">
        <div className="wheel-text">
          <p className="wheel-title">Quem decide é a sorte<br />
            <span className="wheel-subtitle">toque no centro para girar</span>
          </p>
        </div>

        <div className="wheel-wrapper">
          <div
            className="wheel-pointer"
            style={{
              borderTopColor: accent,
              animation: spinning ? 'tick 0.13s ease-in-out infinite' : 'none'
            }}
          />
          <div
            className="wheel"
            style={{
              background: gradient,
              transform: `rotate(${rot}deg)`,
              animation: spinning ? 'none' : 'none'
            }}
          >
            {list.map((o, i) => {
              const a = (i + 0.5) * seg;
              return (
                <div
                  key={i}
                  className="wheel-label-container"
                  style={{
                    transform: `rotate(${a}deg)`
                  }}
                >
                  <span className="wheel-label-text">
                    {o.name}
                  </span>
                </div>
              );
            })}
          </div>
          <button
            onClick={onSpin}
            disabled={spinning || n < 2}
            className="wheel-button"
            style={{
              color: accent,
              animation: spinning || n < 2 ? 'none' : 'pulse 2.4s ease-in-out infinite'
            }}
          >
            {spinning ? '•••' : 'GIRAR'}
          </button>
        </div>

        <p className="wheel-total">{totalLabel}</p>
      </div>
    </div>
  );
}
