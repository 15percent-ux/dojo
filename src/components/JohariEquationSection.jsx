const serif = "'Noto Serif JP', '游明朝', serif";
const sans = "'Noto Sans JP', sans-serif";
const gold = '#C5A059';

const quadrants = [
  [
    { name: '開放の窓', desc: '基本スペック・実績', highlight: false },
    { name: '秘密の窓', desc: '美学・怒り・手間', highlight: true },
  ],
  [
    { name: '盲点の窓', desc: '顧客の裏の欲求', highlight: true },
    { name: '未知の窓', desc: '根源的価値', highlight: false },
  ],
];

const eqItems = [
  { main: '盲点を開く', sub: '顧客理解' },
  { operator: '×' },
  { main: '秘密を晒す', sub: '言語化' },
  { operator: '=' },
  { main: '比較不能なブランド', sub: 'Priceless Brand', isResult: true },
];

export default function JohariEquationSection() {
  return (
    <section style={{ backgroundColor: '#FAFAF8', padding: 'clamp(80px, 12vw, 160px) clamp(32px, 8vw, 120px)' }}>
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Label */}
        <p
          style={{
            fontFamily: sans,
            fontWeight: 300,
            fontSize: '11px',
            color: gold,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginBottom: '56px',
          }}
        >
          Diagnosis Framework
        </p>

        {/* 2×2 Grid */}
        <div style={{ width: '100%', marginBottom: '64px' }}>
          {/* Column headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '56px 1fr 1fr',
              gap: '2px',
              marginBottom: '8px',
            }}
          >
            <div />
            <p
              style={{
                textAlign: 'center',
                fontFamily: sans,
                fontWeight: 300,
                fontSize: '11px',
                color: '#BBBBBB',
                letterSpacing: '0.08em',
              }}
            >
              市場に伝わっている
            </p>
            <p
              style={{
                textAlign: 'center',
                fontFamily: sans,
                fontWeight: 300,
                fontSize: '11px',
                color: '#BBBBBB',
                letterSpacing: '0.08em',
              }}
            >
              市場に伝わっていない
            </p>
          </div>

          {quadrants.map((row, ri) => (
            <div
              key={ri}
              style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr 1fr',
                gap: '2px',
                marginBottom: '2px',
              }}
            >
              {/* Row label */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p
                  style={{
                    fontFamily: sans,
                    fontWeight: 300,
                    fontSize: '11px',
                    color: '#BBBBBB',
                    letterSpacing: '0.08em',
                    transform: 'rotate(-90deg)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {ri === 0 ? '自覚あり' : '自覚なし'}
                </p>
              </div>

              {row.map((cell, ci) => (
                <div
                  key={ci}
                  style={{
                    padding: 'clamp(18px, 2.5vw, 28px)',
                    border: `1px solid ${cell.highlight ? gold : '#EBEBEB'}`,
                    backgroundColor: cell.highlight ? 'rgba(197,160,89,0.05)' : 'rgba(255,255,255,0.6)',
                    minHeight: '88px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: serif,
                      fontWeight: 300,
                      fontSize: 'clamp(13px, 1.6vw, 16px)',
                      color: cell.highlight ? '#111111' : '#CCCCCC',
                      letterSpacing: '0.05em',
                      wordBreak: 'keep-all',
                    }}
                  >
                    {cell.name}
                  </p>
                  <p
                    style={{
                      fontFamily: sans,
                      fontWeight: 300,
                      fontSize: 'clamp(10px, 1.1vw, 12px)',
                      color: cell.highlight ? '#888888' : '#DDDDDD',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {cell.desc}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Connector */}
        <div
          style={{
            width: '1px',
            height: '48px',
            background: `linear-gradient(to bottom, transparent, ${gold})`,
            marginBottom: '48px',
          }}
        />

        {/* Equation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'clamp(12px, 2.5vw, 32px)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {eqItems.map((item, i) => {
            if (item.operator) {
              return (
                <div key={i} style={{ paddingTop: '6px' }}>
                  <span
                    style={{
                      fontFamily: sans,
                      fontWeight: 300,
                      fontSize: 'clamp(18px, 2.5vw, 28px)',
                      color: gold,
                      opacity: 0.7,
                    }}
                  >
                    {item.operator}
                  </span>
                </div>
              );
            }
            return (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <p
                  style={{
                    fontFamily: serif,
                    fontWeight: 300,
                    fontSize: item.isResult
                      ? 'clamp(17px, 2.4vw, 28px)'
                      : 'clamp(15px, 2vw, 22px)',
                    color: item.isResult ? '#111111' : '#333333',
                    letterSpacing: '0.05em',
                    wordBreak: 'keep-all',
                    borderBottom: item.isResult ? `1px solid ${gold}` : 'none',
                    paddingBottom: item.isResult ? '8px' : 0,
                  }}
                >
                  {item.main}
                </p>
                <p
                  style={{
                    fontFamily: sans,
                    fontWeight: 300,
                    fontSize: '10px',
                    color: item.isResult ? gold : '#AAAAAA',
                    letterSpacing: '0.25em',
                  }}
                >
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
