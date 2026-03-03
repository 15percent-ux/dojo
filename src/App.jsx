import { useState } from 'react';
import HeroSection from './components/HeroSection';
import JohariEquationSection from './components/JohariEquationSection';
import QuestionnaireSection from './components/QuestionnaireSection';
import ActionSection from './components/ActionSection';
import ResultModal from './components/ResultModal';

export default function App() {
  const [checked, setChecked] = useState({});
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [quadrantScores, setQuadrantScores] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(key) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleResult(text, total, qs) {
    setResult(text);
    setScore(total);
    setQuadrantScores(qs);
  }

  function handleClose() {
    setResult(null);
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <HeroSection />
      <JohariEquationSection />
      <QuestionnaireSection checked={checked} onChange={handleChange} />
      <ActionSection
        checked={checked}
        onResult={handleResult}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <ResultModal result={result} score={score} quadrantScores={quadrantScores} onClose={handleClose} />
    </div>
  );
}
