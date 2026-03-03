export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #111 0px, #111 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #111 0px, #111 1px, transparent 1px, transparent 60px)',
        }}
      />

      {/* Top label */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full">
        <p
          className="text-xs tracking-[0.4em] uppercase mb-12"
          style={{ color: '#C5A059', fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
        >
          Self-Assessment · 100 Criteria
        </p>

        {/* Gold divider top */}
        <div className="divider-gold w-24 mb-14" />

        {/* Main title */}
        <h1
          className="leading-tight mb-8"
          style={{
            fontFamily: "'Noto Serif JP', '游明朝', serif",
            fontWeight: 300,
            fontSize: 'clamp(28px, 4vw, 64px)',
            color: '#111111',
            wordBreak: 'keep-all',
            letterSpacing: '0.05em',
            lineHeight: 1.6,
          }}
        >
          プロダクトの真価を問う
          <br />
          <span style={{ color: '#C5A059' }}>100</span>
          の絶対基準
        </h1>

        {/* Gold divider bottom */}
        <div className="divider-gold w-48 mb-14" />

        {/* Sub copy */}
        <p
          className="leading-loose max-w-xl"
          style={{
            fontFamily: "'Noto Serif JP', '游明朝', serif",
            fontWeight: 300,
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            color: '#444444',
            wordBreak: 'keep-all',
            letterSpacing: '0.08em',
            lineHeight: 2.2,
          }}
        >
          マーケティングを学ぶな。
          <br />
          売れる商品を持っているかが全てである。
        </p>

        {/* Decorative text */}
        <p
          className="mt-16"
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 300,
            fontSize: '11px',
            color: '#AAAAAA',
            letterSpacing: '0.2em',
          }}
        >
          年商道場 — 診断プログラム
        </p>

        {/* Scroll cue */}
        <div className="mt-20 flex flex-col items-center gap-3 opacity-40">
          <div
            className="w-px h-16"
            style={{
              background: 'linear-gradient(to bottom, transparent, #C5A059)',
            }}
          />
          <p
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
              fontSize: '10px',
              color: '#888888',
              letterSpacing: '0.3em',
            }}
          >
            SCROLL
          </p>
        </div>
      </div>
    </section>
  );
}
