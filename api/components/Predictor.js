export default function Predictor({ horses }) {
  if (!horses.length) return null;

  const sorted = [...horses].sort((a, b) => b.score - a.score);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>予想結果（スコア順）</h2>
      <ul>
        {sorted.map((horse, index) => (
          <li key={index}>{index + 1}位：{horse.name}（スコア：{horse.score}）</li>
        ))}
      </ul>
    </div>
  );
}
