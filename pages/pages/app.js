import { useState, useEffect } from 'react';
import Predictor from '../components/Predictor';

export default function App() {
  const [horses, setHorses] = useState([]);
  const [results, setResults] = useState([]);

  // 📥 CSVから読み込み
  useEffect(() => {
    fetch('/race_data.csv')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n');
        const data = lines.slice(1).filter(Boolean).map(line => {
          const [name, weightDiff, jockeyWinRate, previousRank, stadiumWinRate] = line.split(',');
          return {
            name,
            weightDiff: parseFloat(weightDiff),
            jockeyWinRate: parseFloat(jockeyWinRate),
            previousRank: parseInt(previousRank),
            stadiumWinRate: parseFloat(stadiumWinRate)
          };
        });
        setHorses(data);
      });
  }, []);

  const handlePredict = async () => {
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ horses })
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎯 出走馬予想アプリ</h1>
      <button onClick={handlePredict}>予想する</button>
      <Predictor horses={results} />
    </div>
  );
}
