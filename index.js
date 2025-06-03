import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🏇 競馬予想AIアプリ</h1>
      <p>以下のリンクから予想アプリとダッシュボードに進めます。</p>
      <div style={{ marginTop: '1rem' }}>
        <Link href="/app">🎯 予想アプリを開く</Link><br />
        <Link href="/dashboard">📊 学習ダッシュボード</Link>
      </div>
    </div>
  );
}
