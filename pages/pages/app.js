import { useState } from 'react';
import Predictor from '../components/Predictor';

export default function App() {
  const [horses, setHorses] = useState([
    { name: '', weightDiff: '', jockeyWinRate: '', previousRank: '', stadiumWinRate: '' }
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...horses];
    updated[index][field] = value;
    setHorses(updated);
  };

  const addHorse = () => {
    setHorses([...horses, { name: '', weightDiff: '', jockeyWinRate: '', previousRank: '', stadiumWinRate: '' }]);
  };

  const handlePredict = async () => {
    const formatted = horses.map(h => ({
      name: h.name,
      weightDiff: parseFloat(h.weightDiff),
      jockeyWinRate: parseFloat(h.jockeyWinRate),
      previousRank: parseInt(h.previousRank),
      stadiumWinRate: parseFloat(h.stadiumWinRate)
    }));

    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ horses: formatted })
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎯 出走馬予想アプリ</h1>
      {horses.map((horse, idx) => (
        <div key={idx} style={{ marginBottom: '1rem' }}>
          <input placeholder="馬名" value={horse.name} onChange={e => handleChange(idx, 'name', e.target.value)} />
          <input placeholder="馬体重差" value={horse.weightDiff} onChange={e => handleChange(idx, 'weightDiff', e.target.value)} />
          <input placeholder="騎手勝率" value={horse.jockeyWinRate} onChange={e => handleChange(idx, 'jockeyWinRate', e.target.value)} />
          <input placeholder="前走順位" value={horse.previousRank} onChange={e => handleChange(idx, 'previousRank', e.target.value)} />
          <input placeholder="競馬場勝率" value={horse.stadiumWinRate} onChange={e => handleChange(idx, 'stadiumWinRate', e.target.value)} />
        </div>
      ))}
      <button onClick={addHorse}>＋馬を追加</button>
      <button onClick={handlePredict} style={{ marginLeft: '1rem' }}>予想する</button>
      <Predictor horses={results} />
    </div>
  );
}
