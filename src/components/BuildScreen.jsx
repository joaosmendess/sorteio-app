import './BuildScreen.css';
import { StarIcon, PlusIcon, XIcon } from './icons';

export default function BuildScreen({
  cats,
  newCat,
  drafts,
  maxPerCat,
  catColors,
  shade,
  onSetNewCat,
  onAddCat,
  onRemoveCat,
  onSetDraft,
  onAddOption,
  onRemoveOption,
  onGoWheel,
  ready,
  total,
  nCats
}) {
  const handleNewCatKey = (e) => {
    if (e.key === 'Enter') onAddCat();
  };

  const handleDraftKey = (id) => (e) => {
    if (e.key === 'Enter') onAddOption(id);
  };

  const totalLabel = total === 0
    ? 'Adicione ao menos 2 opções'
    : `${total} opção${total > 1 ? 'ões' : ''} na roleta`;

  const catCountLabel = nCats === 0 ? '' : `${nCats} categoria${nCats > 1 ? 's' : ''}`;

  return (
    <div className="build-screen">
      <div className="header">
        <span className="logo-badge">
          <StarIcon />
        </span>
        <h1 className="logo-text">Decide a Roleta</h1>
      </div>

      <div className="hero-card">
        <div className="hero-circles"></div>
        <svg className="hero-star" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l1.8 5.4L19 9l-5.4 1.8L12 16l-1.8-5.2L5 9l5.4-1.6z"/>
        </svg>
        <div className="hero-content">
          <div className="hero-label">Sorteio da Decisão</div>
          <h2 className="hero-title">O que vamos<br />fazer?</h2>
          <p className="hero-desc">Junte as opções, gire a roleta e deixe a sorte decidir.</p>
        </div>
      </div>

      <div className="section-header">
        <span className="section-label">Suas categorias</span>
        <span className="cat-count">{catCountLabel}</span>
      </div>

      <div className="input-group">
        <input
          type="text"
          value={newCat}
          onChange={(e) => onSetNewCat(e.target.value)}
          onKeyDown={handleNewCatKey}
          placeholder="Nova categoria — ex: Cinema"
          className="input-text"
        />
        <button onClick={onAddCat} className="btn-add-small">
          <PlusIcon />
        </button>
      </div>

      <div className="cats-list">
        {nCats > 0 ? (
          cats.map((cat, ci) => {
            const base = catColors()[ci % catColors().length];
            const chipBg = shade(base, 0.84);
            const chipBorder = shade(base, 0.58);
            const chipText = shade(base, -0.28);
            const len = cat.options.length;
            const isFull = len >= maxPerCat;

            return (
              <div key={cat.id} className="cat-card">
                <div className="cat-header">
                  <div className="cat-name-container">
                    <span className="cat-icon" style={{ background: chipBg }}>
                      <StarIcon color={base} />
                    </span>
                    <span className="cat-name">{cat.name}</span>
                  </div>
                  <div className="cat-actions">
                    <span className="cat-count-badge">{len}/{maxPerCat}</span>
                    <button
                      onClick={() => onRemoveCat(cat.id)}
                      className="btn-remove"
                      title="Remover categoria"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="restaurants-list">
                  {cat.options.map((r, idx) => (
                    <span
                      key={idx}
                      className="restaurant-chip"
                      style={{
                        background: chipBg,
                        borderColor: chipBorder,
                        color: chipText
                      }}
                    >
                      {r}
                      <button
                        onClick={() => onRemoveOption(cat.id, idx)}
                        className="btn-remove-chip"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                {!isFull && (
                  <div className="add-restaurant">
                    <input
                      type="text"
                      value={drafts[cat.id] || ''}
                      onChange={(e) => onSetDraft(cat.id, e.target.value)}
                      onKeyDown={handleDraftKey(cat.id)}
                      placeholder="Adicionar opção"
                      className="input-restaurant"
                    />
                    <button
                      onClick={() => onAddOption(cat.id)}
                      className="btn-add"
                    >
                      <PlusIcon />
                      Add
                    </button>
                  </div>
                )}
                {isFull && (
                  <p className="full-msg">Máximo de {maxPerCat} — remova um para trocar.</p>
                )}
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            Crie sua primeira categoria<br />
            no campo acima.
          </div>
        )}
      </div>

      <div className="footer-sticky">
        <span className="footer-label">{totalLabel}</span>
        <button
          onClick={onGoWheel}
          disabled={!ready}
          className="btn-cta"
          style={{ opacity: ready ? 1 : 0.32, cursor: ready ? 'pointer' : 'default' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>
          </svg>
          Sortear
        </button>
      </div>
    </div>
  );
}
