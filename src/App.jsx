import { useState, useRef, useEffect } from 'react';
import './App.css';
import BuildScreen from './components/BuildScreen';
import WheelScreen from './components/WheelScreen';
import ResultModal from './components/ResultModal';

export default function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);
  const [screen, setScreen] = useState('build');
  const [cats, setCats] = useState([
    { id: 'c0', name: 'Cinema', options: ['Ação', 'Comédia'] },
    { id: 'c1', name: 'Atividade', options: ['Parque', 'Museu'] },
    { id: 'c2', name: 'Comida', options: ['Pizza', 'Sushi'] }
  ]);
  const [drafts, setDrafts] = useState({});
  const [newCat, setNewCat] = useState('');
  const [rot, setRot] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [resultShown, setResultShown] = useState(false);
  const [maxPerCat] = useState(3);
  const [accent] = useState('Tomate');
  const spinTimeoutRef = useRef(null);
  const idCounterRef = useRef(cats.length);

  const catColors = () => ['#E0542E', '#D98A22', '#4F8A5B', '#3E7C8C', '#9A5685', '#C7462E'];

  const accentHex = () => {
    const map = {
      'Tomate': '#E0542E',
      'Páprica': '#C7462E',
      'Verde': '#4F8A5B',
      'Azul': '#3E7C8C',
      'Berry': '#9A5685'
    };
    return map[accent] || '#E0542E';
  };

  const shade = (hex, t) => {
    const h = hex.replace('#', '');
    const n = parseInt(h, 16);
    let r = (n >> 16) & 255;
    let g = (n >> 8) & 255;
    let b = n & 255;
    const tgt = t < 0 ? 0 : 255;
    const a = Math.abs(t);
    r = Math.round(r + (tgt - r) * a);
    g = Math.round(g + (tgt - g) * a);
    b = Math.round(b + (tgt - b) * a);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

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

  const addCategory = () => {
    const n = newCat.trim();
    if (!n) return;
    const id = 'c' + (idCounterRef.current++);
    setCats([...cats, { id, name: n, options: [] }]);
    setNewCat('');
  };

  const removeCategory = (id) => {
    setCats(cats.filter(c => c.id !== id));
  };

  const setDraft = (id, val) => {
    setDrafts({ ...drafts, [id]: val });
  };

  const addOption = (id) => {
    const v = (drafts[id] || '').trim();
    if (!v) return;
    setCats(cats.map(c =>
      c.id === id && c.options.length < maxPerCat
        ? { ...c, options: [...c.options, v] }
        : c
    ));
    setDrafts({ ...drafts, [id]: '' });
  };

  const removeOption = (id, idx) => {
    setCats(cats.map(c =>
      c.id === id
        ? { ...c, options: c.options.filter((_, i) => i !== idx) }
        : c
    ));
  };

  const goWheel = () => {
    if (flat().length < 2) return;
    setScreen('wheel');
    setResultShown(false);
    setResult(null);
  };

  const goBuild = () => {
    setScreen('build');
    setResultShown(false);
  };

  const spin = () => {
    if (spinning) return;
    const list = flat();
    const n = list.length;
    if (n < 2) return;
    const k = Math.floor(Math.random() * n);
    const seg = 360 / n;
    const jitter = (Math.random() - 0.5) * seg * 0.7;
    const desired = (((360 - ((k + 0.5) * seg) - jitter) % 360) + 360) % 360;
    const cur = ((rot % 360) + 360) % 360;
    const delta = 360 * (6 + Math.floor(Math.random() * 3)) + (((desired - cur) % 360) + 360) % 360;
    const newRot = rot + delta;
    setRot(newRot);
    setSpinning(true);
    setResultShown(false);
    setResult(null);
    clearTimeout(spinTimeoutRef.current);
    spinTimeoutRef.current = setTimeout(() => {
      setSpinning(false);
      setResult(list[k]);
      setResultShown(true);
    }, 5550);
  };

  const closeResult = () => {
    setResultShown(false);
  };

  const total = flat().length;
  const nCats = cats.length;
  const ready = total >= 2;

  return (
    <div className="app-wrapper">
      {screen === 'build' && (
        <BuildScreen
          cats={cats}
          newCat={newCat}
          drafts={drafts}
          maxPerCat={maxPerCat}
          accent={accent}
          catColors={catColors}
          shade={shade}
          onSetNewCat={setNewCat}
          onAddCat={addCategory}
          onRemoveCat={removeCategory}
          onSetDraft={setDraft}
          onAddOption={addOption}
          onRemoveOption={removeOption}
          onGoWheel={goWheel}
          ready={ready}
          total={total}
          nCats={nCats}
        />
      )}

      {screen === 'wheel' && (
        <WheelScreen
          cats={cats}
          rot={rot}
          spinning={spinning}
          catColors={catColors}
          shade={shade}
          accent={accent}
          onSpin={spin}
          onGoBuild={goBuild}
          total={total}
        />
      )}

      {resultShown && result && (
        <ResultModal
          result={result}
          cats={cats}
          catColors={catColors}
          shade={shade}
          onClose={closeResult}
          onSpin={spin}
          onGoBuild={goBuild}
        />
      )}
    </div>
  );
}
