const AFFILIATE_ID = import.meta.env.VITE_RAKUTEN_AFFILIATE_ID || '55d46e53.7c1b9418.55d46e54.7a24e32b'
const aff = (url: string) => `https://hb.afl.rakuten.co.jp/hgc/${AFFILIATE_ID}/?pc=${encodeURIComponent(url)}`

const ITEMS = [
  { emoji: '🃏', label: 'トランプ カジノ品質', url: 'https://search.rakuten.co.jp/search/mall/トランプ+カジノ+プロフェッショナル/' },
  { emoji: '🎰', label: 'ポーカーチップセット', url: 'https://search.rakuten.co.jp/search/mall/ポーカーチップ+セット+重り/' },
  { emoji: '🎴', label: 'カードシュー（ディーラー用）', url: 'https://search.rakuten.co.jp/search/mall/カードシュー+ディーラー/' },
  { emoji: '📚', label: 'カジノ数学・確率の本', url: 'https://search.rakuten.co.jp/search/mall/カジノ+数学+確率+本/' },
  { emoji: '🎲', label: 'ルーレットゲーム', url: 'https://search.rakuten.co.jp/search/mall/ルーレット+ゲーム+おもちゃ/' },
]

export default function CasinoAffiliate() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e293b, #2a1a0f)',
      border: '1px solid #f4a81d33',
      borderRadius: 12,
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 16 }}>🎰</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#f4a81d' }}>カジノアイテム</span>
        <span style={{
          background: '#bf0000', color: '#fff', fontSize: 9, fontWeight: 700,
          padding: '1px 6px', borderRadius: 6, lineHeight: '16px',
        }}>楽天</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {ITEMS.map(item => (
          <a key={item.label} href={aff(item.url)} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 8px', borderRadius: 8,
              textDecoration: 'none', color: '#e2e8f0',
              fontSize: 12, transition: 'background 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ffffff1a' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            <span style={{ fontSize: 16 }}>{item.emoji}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            <span style={{ fontSize: 10, color: '#bf0000', fontWeight: 700 }}>楽天</span>
          </a>
        ))}
      </div>
    </div>
  )
}
