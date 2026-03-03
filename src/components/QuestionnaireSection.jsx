import { sections } from '../data/questions';

const WINDOW_COLORS = {
  open: '#AAAAAA',
  blind: '#C5A059',
  secret: '#C5A059',
  unknown: '#AAAAAA',
};

const WINDOW_HIGHLIGHT = {
  open: false,
  blind: true,
  secret: true,
  unknown: false,
};

export default function QuestionnaireSection({ checked, onChange }) {
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const progressPercent = (totalChecked / 100) * 100;

  return (
    <section className="relative py-24 px-6" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="max-w-3xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-20">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: '#C5A059', fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}
          >
            Questionnaire
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif JP', '游明朝', serif",
              fontWeight: 300,
              fontSize: 'clamp(20px, 2.5vw, 36px)',
              color: '#111111',
              wordBreak: 'keep-all',
              letterSpacing: '0.08em',
              lineHeight: 1.8,
            }}
          >
            100の問いに、誠実に向き合え。
          </h2>
          <p
            className="mt-6"
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
              fontSize: '13px',
              color: '#888888',
              letterSpacing: '0.1em',
            }}
          >
            自信を持って「Yes」と言えるものにチェックを入れてください。
          </p>
        </div>

        {/* Progress */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-3">
            <span
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 300,
                fontSize: '11px',
                color: '#AAAAAA',
                letterSpacing: '0.2em',
              }}
            >
              PROGRESS
            </span>
            <span
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: '20px',
                color: '#C5A059',
                fontWeight: 300,
              }}
            >
              {totalChecked}
              <span style={{ fontSize: '12px', color: '#AAAAAA' }}> / 100</span>
            </span>
          </div>
          <div className="w-full h-px relative overflow-hidden" style={{ backgroundColor: '#E5E5E5' }}>
            <div
              className="absolute left-0 top-0 h-full transition-all duration-700 ease-out gold-shimmer"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-24">
          {sections.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              checked={checked}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionBlock({ section, checked, onChange }) {
  const total = section.quadrants.reduce((s, q) => s + q.questions.length, 0);
  const sectionChecked = section.quadrants.reduce(
    (s, q) => s + q.questions.filter((_, i) => checked[`q${q.globalStart + i}`]).length,
    0
  );

  return (
    <div>
      {/* Section header */}
      <div className="mb-14">
        <div className="flex items-center gap-4 mb-5">
          <span
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
              fontSize: '11px',
              color: '#C5A059',
              letterSpacing: '0.3em',
            }}
          >
            SECTION {section.id}
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#E8E8E8' }} />
          <span
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
              fontSize: '11px',
              color: '#CCCCCC',
              letterSpacing: '0.1em',
            }}
          >
            {sectionChecked}/{total}
          </span>
        </div>
        <h3
          style={{
            fontFamily: "'Noto Serif JP', '游明朝', serif",
            fontWeight: 400,
            fontSize: 'clamp(18px, 2vw, 26px)',
            color: '#111111',
            wordBreak: 'keep-all',
            letterSpacing: '0.06em',
          }}
        >
          {section.title}
        </h3>
        <p
          className="mt-1"
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 300,
            fontSize: '12px',
            color: '#AAAAAA',
            letterSpacing: '0.12em',
          }}
        >
          {section.note}
        </p>
      </div>

      {/* Quadrants */}
      <div className="space-y-16">
        {section.quadrants.map((quad) => (
          <QuadrantBlock
            key={quad.id}
            section={section}
            quad={quad}
            checked={checked}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

function QuadrantBlock({ section, quad, checked, onChange }) {
  const highlight = WINDOW_HIGHLIGHT[quad.id];
  const color = WINDOW_COLORS[quad.id];
  const quadChecked = quad.questions.filter((_, i) => checked[`q${quad.globalStart + i}`]).length;

  return (
    <div>
      {/* Quadrant header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
              fontSize: '10px',
              color: highlight ? '#C5A059' : '#CCCCCC',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            {quad.windowEn}
          </span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: highlight ? 'rgba(197,160,89,0.3)' : '#F0F0F0' }}
          />
          <span
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
              fontSize: '11px',
              color: '#CCCCCC',
              letterSpacing: '0.1em',
            }}
          >
            {quadChecked}/{quad.questions.length}
          </span>
        </div>
        <div className="flex items-baseline gap-3">
          <h4
            style={{
              fontFamily: "'Noto Serif JP', '游明朝', serif",
              fontWeight: highlight ? 400 : 300,
              fontSize: 'clamp(15px, 1.6vw, 19px)',
              color: highlight ? '#111111' : '#888888',
              wordBreak: 'keep-all',
              letterSpacing: '0.06em',
            }}
          >
            {quad.window}の窓
          </h4>
          <p
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
              fontSize: '11px',
              color: highlight ? '#888888' : '#CCCCCC',
              letterSpacing: '0.08em',
              wordBreak: 'keep-all',
            }}
          >
            {quad.description}
          </p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-0">
        {quad.questions.map((question, i) => {
          const key = `q${quad.globalStart + i}`;
          const isChecked = !!checked[key];
          const globalNum = quad.globalStart + i;
          return (
            <label
              key={key}
              className="flex items-start gap-5 cursor-pointer group"
              style={{ padding: '18px 0', borderBottom: '1px solid #F0F0F0' }}
            >
              <input
                type="checkbox"
                className="custom-checkbox mt-[3px]"
                checked={isChecked}
                onChange={() => onChange(key)}
              />
              <span
                className="transition-colors duration-200"
                style={{
                  fontFamily: "'Noto Serif JP', '游明朝', serif",
                  fontWeight: 300,
                  fontSize: 'clamp(13px, 1.2vw, 15px)',
                  color: isChecked ? '#111111' : '#555555',
                  wordBreak: 'keep-all',
                  lineHeight: 2,
                  letterSpacing: '0.04em',
                }}
              >
                <span
                  className="mr-3 select-none"
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontSize: '10px',
                    color: '#CCCCCC',
                    letterSpacing: '0.1em',
                  }}
                >
                  {String(globalNum).padStart(2, '0')}
                </span>
                {question}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
