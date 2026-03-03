import { useState } from 'react';
import { computeQuadrantScores } from '../data/questions';

function buildPrompt(checked, total) {
  const scores = computeQuadrantScores(checked);
  const fmt = (key) => `${scores[key].count}/${scores[key].total}`;

  return `あなたは高単価ビジネスの本質を熟知したビジネスアドバイザーです。以下は「ジョハリの窓」の4象限構造に基づく自己診断結果です。

【核心の方程式】
盲点を開く × 秘密を晒す ＝ 比較不能なブランド

【A：モノ / サービス（50問）の結果】
・開放の窓（自他ともに認める事実）：${fmt('A-open')}問
・盲点の窓（市場は知っているが自覚していなかった領域）：${fmt('A-blind')}問
・秘密の窓（自覚しているが市場に開示していない価値）：${fmt('A-secret')}問
・未知の窓（極限状態で初めて現れる事業の軸）：${fmt('A-unknown')}問

【B：ヒト / 売り手（50問）の結果】
・開放の窓：${fmt('B-open')}問
・盲点の窓：${fmt('B-blind')}問
・秘密の窓：${fmt('B-secret')}問
・未知の窓：${fmt('B-unknown')}問

合計：${total}/100問
盲点合計（A+B）：${scores['A-blind'].count + scores['B-blind'].count}/24
秘密合計（A+B）：${scores['A-secret'].count + scores['B-secret'].count}/26

この結果を踏まえ、以下の形式で診断レポートを日本語で作成してください。

1.【核心診断】（3文）：方程式「盲点を開く × 秘密を晒す」の観点から見たブランドの現在地。盲点と秘密の各スコアに基づき具体的に分析してください。
2.【モノの診断】：Aセクションの4象限パターンから見た商品の伸び代と最優先改善領域。
3.【ヒトの診断】：Bセクションの4象限パターンから見た売り手の強みと死角。
4.【今すぐ実行すべき一手】：スコアパターンから導かれる、最も効果的なアクションを一つだけ。

文体は「煽り」や「過剰な励まし」を一切排除し、信頼できる鑑定士が静かに語りかけるような、凛とした日本語で。`;
}

function generateLocalResult(checked, total) {
  const scores = computeQuadrantScores(checked);
  const s = (key) => scores[key];

  const aBlind = s('A-blind');
  const aSecret = s('A-secret');
  const aUnknown = s('A-unknown');
  const bBlind = s('B-blind');
  const bSecret = s('B-secret');
  const bUnknown = s('B-unknown');

  const blindTotal = aBlind.count + bBlind.count;
  const secretTotal = aSecret.count + bSecret.count;
  const blindRatio = blindTotal / 24;
  const secretRatio = secretTotal / 26;
  const aUnknownRatio = aUnknown.count / aUnknown.total;
  const bUnknownRatio = bUnknown.count / bUnknown.total;

  // 1. 核心診断
  let core;
  if (blindRatio >= 0.6 && secretRatio >= 0.6) {
    core = `「盲点を開く × 秘密を晒す」の方程式は、すでに機能し始めている。盲点スコア${blindTotal}/24、秘密スコア${secretTotal}/26という数値は、市場の見えない欲求を掴みながら、自社の独自性を言語化できていることを示している。このまま徹底すれば、比較対象のないブランドへの道は現実となる。`;
  } else if (blindRatio < 0.4 && secretRatio < 0.4) {
    core = `「盲点を開く × 秘密を晒す」の方程式が、両輪ともに止まっている。盲点スコア${blindTotal}/24、秘密スコア${secretTotal}/26——市場から見えていない事実があり、かつ自社の本質的価値が言語化されていない状態だ。これは技術や品質の問題ではない。「言語化」という唯一の武器を手放していることへの代償である。`;
  } else if (blindRatio < 0.4) {
    core = `「秘密を晒す」側（${secretTotal}/26）には片鱗が見える。しかし「盲点を開く」（${blindTotal}/24）が機能していない。自分の美学を語れるかもしれないが、顧客が本当に何を求めているかという問いから、まだ逃げている。言葉が的を外れ続ける原因はここにある。`;
  } else if (secretRatio < 0.4) {
    core = `顧客理解という「盲点を開く」作業（${blindTotal}/24）には手が届き始めている。しかし「秘密を晒す」（${secretTotal}/26）が機能していない。市場が求めるものは分かっていても、自分だけが知っている本質的価値をまだ隠している。その沈黙が、競合との価格競争を生み出し続けている。`;
  } else {
    core = `方程式の両輪（盲点${blindTotal}/24、秘密${secretTotal}/26）はいずれも途中段階にある。現状は「売れてはいるが、なぜ売れているのか言語化できていない」という中途半端な状態だ。ここから抜け出す唯一の方法は、「なぜあなたでなければならないか」という問いへの完全な答えを言葉にすることだ。`;
  }

  // 2. モノの診断
  let mono;
  if (aUnknownRatio < 0.4) {
    mono = `商品の「未知の窓」（${aUnknown.count}/${aUnknown.total}）が最も脆弱だ。極限状態に置かれた時、あなたのブランドが語れる理由がまだない。これは商品設計ではなく、哲学の問題だ。`;
  } else if (aSecret.count / aSecret.total < 0.4) {
    mono = `商品の「秘密の窓」（${aSecret.count}/${aSecret.total}）が封印されたままだ。同業者がやらない手間、選択の理由、怒り——これらを開示しない限り、どれだけ品質を上げても比較の土俵から出られない。`;
  } else if (aBlind.count / aBlind.total < 0.4) {
    mono = `商品の「盲点の窓」（${aBlind.count}/${aBlind.total}）が閉じている。顧客が実際に買う理由をまだ掴んでいない。この状態での訴求は、的外れな射撃を続けることと同義だ。`;
  } else {
    mono = `商品の4象限スコアは全体的にバランスが取れているが、それは「尖っていない」とも言える。最強のブランドは、1つの象限が突出することで生まれる。最も得意な領域に全力投下することを検討せよ。`;
  }

  // 3. ヒトの診断
  let hito;
  if (bUnknownRatio < 0.4) {
    hito = `売り手の「未知の窓」（${bUnknown.count}/${bUnknown.total}）が空白だ。事業の根源的な使命がまだ言語化されていない。この状態ではいくら手法を学んでも、ブレない軸が存在しないため外部の言葉に振り回され続ける。`;
  } else if (bSecret.count / bSecret.total < 0.4) {
    hito = `売り手の「秘密の窓」（${bSecret.count}/${bSecret.total}）が閉じている。事業を始めた本当の理由、業界への怒り、恥の歴史——これらを開示することへの抵抗が、あなた自身のブランド化を妨げている。最強の武器が金庫の中にある状態だ。`;
  } else if (bBlind.count / bBlind.total < 0.4) {
    hito = `売り手の「盲点の窓」（${bBlind.count}/${bBlind.total}）に課題がある。自分の言動が顧客にどう映っているか、この視点が薄い。技術や情熱があっても、伝わり方に盲点があると、せっかくの価値が相手に届かない。`;
  } else {
    hito = `売り手としての自己認識は一定の深さに達している。しかし「未知の窓」（${bUnknown.count}/${bUnknown.total}）で明らかになる覚悟の深さこそが、長期的な事業の差別化要因になる。ここへの投資を惜しまないこと。`;
  }

  // 4. 今すぐ実行すべき一手
  let action;
  if (blindRatio < secretRatio) {
    action = '今週中に、直近10人の購入者に「この商品を買った本当の理由」を聞いてください。表面的な回答の奥に隠れた「裏の欲求」を一文で言語化する。これが「盲点を開く」最初の一手です。';
  } else if (secretRatio < blindRatio) {
    action = '今日中に、「なぜ自分はこの商材でなければならないか」という問いに対して、業界への怒り・恥の歴史・捨てた選択肢の3点から答えを書き出してください。その言葉をそのまま次の発信に使うこと。';
  } else if (aUnknownRatio < 0.5 || bUnknownRatio < 0.5) {
    action = '「明日、価格を2倍にする」という制約のもと、既存客への手紙を書いてください。説得の言葉ではなく、あなたが一生やり続ける理由を書く。その理由がブランドの軸です。';
  } else {
    action = '最もスコアの低い象限の問いに戻り、最初の一問を選んでください。「Yes」と言えるようになるための具体的な行動を、今日中に一つだけ決める。それ以上を決めてはいけない。';
  }

  return `【診断結果】${total}/100

─────────────────────────────

核心診断（盲点を開く × 秘密を晒す）

${core}

─────────────────────────────

モノ / サービスの診断

${mono}

─────────────────────────────

ヒト（売り手）の診断

${hito}

─────────────────────────────

今すぐ実行すべき一手

${action}

─────────────────────────────`;
}

export default function ActionSection({ checked, onResult, isLoading, setIsLoading }) {
  const [hovered, setHovered] = useState(false);
  const totalChecked = Object.values(checked).filter(Boolean).length;

  async function handleDiagnose() {
    setIsLoading(true);
    const quadrantScores = computeQuadrantScores(checked);
    try {
      const prompt = buildPrompt(checked, totalChecked);
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      onResult(data.result, totalChecked, quadrantScores);
    } catch {
      onResult(generateLocalResult(checked, totalChecked), totalChecked, quadrantScores);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-32 px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="divider-gold w-24 mx-auto mb-16" />

        <p
          className="mb-4"
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 300,
            fontSize: '11px',
            color: '#C5A059',
            letterSpacing: '0.4em',
          }}
        >
          DIAGNOSIS
        </p>

        <h2
          className="mb-6"
          style={{
            fontFamily: "'Noto Serif JP', '游明朝', serif",
            fontWeight: 300,
            fontSize: 'clamp(18px, 2vw, 28px)',
            color: '#111111',
            wordBreak: 'keep-all',
            letterSpacing: '0.08em',
          }}
        >
          あなたのプロダクトの真価を、問う。
        </h2>

        <p
          className="mb-16"
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 300,
            fontSize: '13px',
            color: '#AAAAAA',
            letterSpacing: '0.1em',
          }}
        >
          現在 {totalChecked}/100 の問いに「Yes」と答えています。
        </p>

        <button
          onClick={handleDiagnose}
          disabled={isLoading || totalChecked === 0}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative inline-flex items-center justify-center transition-all duration-500"
          style={{
            minWidth: '280px',
            padding: '20px 48px',
            backgroundColor: isLoading ? '#333333' : '#111111',
            color: isLoading ? '#888888' : hovered ? '#C5A059' : '#FFFFFF',
            border: `1px solid ${hovered && !isLoading ? '#C5A059' : 'transparent'}`,
            fontFamily: "'Noto Serif JP', '游明朝', serif",
            fontWeight: 300,
            fontSize: 'clamp(13px, 1.2vw, 16px)',
            letterSpacing: '0.2em',
            wordBreak: 'keep-all',
            cursor: isLoading || totalChecked === 0 ? 'not-allowed' : 'pointer',
            opacity: totalChecked === 0 ? 0.4 : 1,
            boxShadow: hovered && !isLoading ? '0 0 40px rgba(197, 160, 89, 0.08)' : 'none',
          }}
        >
          {isLoading ? (
            <span className="flex items-center gap-3">
              <LoadingDots />
              <span>鑑定中</span>
            </span>
          ) : (
            '真価を判定する（AI診断）'
          )}
        </button>

        {totalChecked === 0 && (
          <p
            className="mt-6"
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 300,
              fontSize: '12px',
              color: '#CCCCCC',
              letterSpacing: '0.1em',
            }}
          >
            まず上記の問いに向き合ってください。
          </p>
        )}

        <div className="divider-gold w-24 mx-auto mt-16" />
      </div>
    </section>
  );
}

function LoadingDots() {
  return (
    <span className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-1 h-1 rounded-full"
          style={{
            backgroundColor: '#C5A059',
            animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </span>
  );
}
