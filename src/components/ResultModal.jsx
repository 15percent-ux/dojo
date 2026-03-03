import { useEffect, useRef } from 'react';

export default function ResultModal({ result, score, quadrantScores, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (result) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [result]);

  if (!result) return null;

  const scorePercent = Math.round((score / 100) * 100);
  const scoreLabel =
    score >= 80 ? 'きわめて高い水準' :
    score >= 60 ? '相応の水準' :
    score >= 40 ? '基礎を持っている' :
    'これからの段階';

  const lines = result.split('\n');

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-start justify-center py-8 px-4 overflow-y-auto modal-backdrop"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
    >
      <div
        className="relative w-full max-w-2xl fade-in-up"
        style={{
          backgroundColor: '#FAFAF8',
          border: '1px solid #E8E4DC',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 transition-colors duration-200"
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 300,
            fontSize: '11px',
            color: '#AAAAAA',
            letterSpacing: '0.2em',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#111111')}
          onMouseLeave={(e) => (e.target.style.color = '#AAAAAA')}
        >
          CLOSE
        </button>

        {/* Header */}
        <div
          className="px-12 pt-14 pb-10 text-center"
          style={{ borderBottom: '1px solid #EEEBE4' }}
        >
          <p
            className="mb-4"
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
              fontSize: '10px',
              color: '#C5A059',
              letterSpacing: '0.4em',
            }}
          >
            DIAGNOSIS REPORT
          </p>

          {/* Score ring */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <svg width="100" height="100" className="-rotate-90">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#EEEBE4" strokeWidth="1" />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#C5A059"
                strokeWidth="1"
                strokeDasharray={`${2 * Math.PI * 44}`}
                strokeDashoffset={`${2 * Math.PI * 44 * (1 - scorePercent / 100)}`}
                strokeLinecap="butt"
                style={{ transition: 'stroke-dashoffset 1.5s ease' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontSize: '28px',
                  color: '#111111',
                  fontWeight: 300,
                  lineHeight: 1,
                }}
              >
                {score}
              </span>
              <span
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: '9px',
                  color: '#AAAAAA',
                  letterSpacing: '0.2em',
                }}
              >
                / 100
              </span>
            </div>
          </div>

          {/* Quadrant breakdown */}
          {quadrantScores && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2px',
                width: '100%',
                maxWidth: '320px',
                margin: '0 auto 24px',
              }}
            >
              {[
                { label: '盲点', highlight: true,
                  count: quadrantScores['A-blind'].count + quadrantScores['B-blind'].count,
                  total: quadrantScores['A-blind'].total + quadrantScores['B-blind'].total },
                { label: '秘密', highlight: true,
                  count: quadrantScores['A-secret'].count + quadrantScores['B-secret'].count,
                  total: quadrantScores['A-secret'].total + quadrantScores['B-secret'].total },
                { label: '開放',
                  count: quadrantScores['A-open'].count + quadrantScores['B-open'].count,
                  total: quadrantScores['A-open'].total + quadrantScores['B-open'].total },
                { label: '未知',
                  count: quadrantScores['A-unknown'].count + quadrantScores['B-unknown'].count,
                  total: quadrantScores['A-unknown'].total + quadrantScores['B-unknown'].total },
              ].map((q) => (
                <div
                  key={q.label}
                  style={{
                    padding: '12px 8px',
                    border: `1px solid ${q.highlight ? '#C5A059' : '#EEEBE4'}`,
                    backgroundColor: q.highlight ? 'rgba(197,160,89,0.04)' : 'transparent',
                    textAlign: 'center',
                  }}
                >
                  <p style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontWeight: 300,
                    fontSize: '10px',
                    color: q.highlight ? '#C5A059' : '#CCCCCC',
                    letterSpacing: '0.2em',
                    marginBottom: '4px',
                  }}>
                    {q.label}の窓
                  </p>
                  <p style={{
                    fontFamily: "'Noto Serif JP', serif",
                    fontWeight: 300,
                    fontSize: '18px',
                    color: q.highlight ? '#111111' : '#AAAAAA',
                  }}>
                    {q.count}
                    <span style={{ fontSize: '10px', color: '#CCCCCC' }}>/{q.total}</span>
                  </p>
                </div>
              ))}
            </div>
          )}

          <h2
            style={{
              fontFamily: "'Noto Serif JP', '游明朝', serif",
              fontWeight: 300,
              fontSize: 'clamp(16px, 2vw, 22px)',
              color: '#111111',
              wordBreak: 'keep-all',
              letterSpacing: '0.08em',
            }}
          >
            診断結果
          </h2>
          <p
            className="mt-2"
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
              fontSize: '12px',
              color: '#C5A059',
              letterSpacing: '0.2em',
            }}
          >
            {scoreLabel}
          </p>
        </div>

        {/* Report body */}
        <div className="px-12 py-12">
          <div
            style={{
              fontFamily: "'Noto Serif JP', '游明朝', serif",
              fontWeight: 300,
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              color: '#333333',
              lineHeight: 2.2,
              letterSpacing: '0.04em',
              wordBreak: 'keep-all',
            }}
          >
            {lines.map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={i} className="h-4" />;
              if (trimmed.startsWith('─')) {
                return <div key={i} className="divider-gold my-6" />;
              }
              if (trimmed.startsWith('【') || trimmed.startsWith('全体評価') || trimmed.startsWith('最も')) {
                return (
                  <p
                    key={i}
                    className="mb-3"
                    style={{
                      fontFamily: "'Noto Sans JP', sans-serif",
                      fontWeight: 400,
                      fontSize: '11px',
                      color: '#C5A059',
                      letterSpacing: '0.3em',
                    }}
                  >
                    {trimmed.replace(/【|】/g, '')}
                  </p>
                );
              }
              return (
                <p key={i} className="mb-0">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer / CTA */}
        <div
          className="px-12 pb-14 pt-6 text-center"
          style={{ borderTop: '1px solid #EEEBE4' }}
        >
          <p
            className="mb-6"
            style={{
              fontFamily: "'Noto Serif JP', '游明朝', serif",
              fontWeight: 300,
              fontSize: '13px',
              color: '#888888',
              wordBreak: 'keep-all',
              lineHeight: 2,
              letterSpacing: '0.06em',
            }}
          >
            この診断が、あなたの現在地を示す地図になれば幸いです。
            <br />
            本質的な価値を持つプロダクトを育てる場があります。
          </p>

          <div className="divider-gold w-12 mx-auto mb-6" />

          {/* Dojo link — understated, elegant */}
          <a
            href="#"
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
              fontSize: '11px',
              color: '#888888',
              letterSpacing: '0.25em',
              textDecoration: 'none',
              borderBottom: '1px solid #DDDDDD',
              paddingBottom: '2px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#C5A059';
              e.target.style.borderBottomColor = '#C5A059';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#888888';
              e.target.style.borderBottomColor = '#DDDDDD';
            }}
          >
            年商道場（審査制・20名限定）について →
          </a>

          <p
            className="mt-4"
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
              fontSize: '10px',
              color: '#CCCCCC',
              letterSpacing: '0.15em',
            }}
          >
            月額 80,000円 ／ 完全審査制
          </p>
        </div>
      </div>
    </div>
  );
}
