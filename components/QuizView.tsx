import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, ChevronRight, RefreshCcw } from 'lucide-react';

interface QuizViewProps {
  questions: QuizQuestion[];
  onRetry: () => void;
  title?: string;
}

const QuizView: React.FC<QuizViewProps> = ({ questions, onRetry, title = "Quiz Finalizado!" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleOptionClick = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    if (index === questions[currentIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-zinc-500 mb-4">Nenhuma questão disponível.</p>
        <button onClick={onRetry} className="text-green-500 font-semibold hover:underline">Tentar Novamente</button>
      </div>
    );
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-zinc-900 rounded-xl shadow-md border border-zinc-800 p-8 text-center max-w-lg mx-auto mt-10">
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <div className="mb-6">
          <span className={`text-6xl font-black ${percentage >= 70 ? 'text-green-500' : 'text-orange-500'}`}>
            {percentage}%
          </span>
          <p className="text-zinc-400 mt-2">Você acertou {score} de {questions.length} questões.</p>
        </div>
        <button
          onClick={onRetry}
          className="flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <RefreshCcw className="w-5 h-5 mr-2" />
          Tentar Novamente
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6 flex justify-between items-center text-sm text-zinc-400 font-medium">
        <span>Questão {currentIndex + 1} de {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-2.5 mb-8">
        <div 
          className="bg-green-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 overflow-hidden">
        <div className="p-6 md:p-8">
          <h3 className="text-lg md:text-xl text-zinc-100 mb-6 leading-relaxed whitespace-pre-wrap">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between group ";
              
              if (showResult) {
                if (idx === currentQuestion.correctAnswer) {
                  btnClass += "border-green-500 bg-green-900/30 text-green-300";
                } else if (idx === selectedOption) {
                  btnClass += "border-red-500 bg-red-900/30 text-red-300";
                } else {
                  btnClass += "border-zinc-800 text-zinc-500 opacity-60";
                }
              } else {
                btnClass += "border-zinc-700 hover:border-green-500/50 hover:bg-zinc-800 text-zinc-300";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={showResult}
                  className={btnClass}
                >
                  <span className="font-medium text-sm md:text-base">{option}</span>
                  {showResult && idx === currentQuestion.correctAnswer && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />}
                  {showResult && idx === selectedOption && idx !== currentQuestion.correctAnswer && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Area */}
          {showResult && (
            <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 animate-in fade-in slide-in-from-top-4">
              <h4 className="font-bold text-green-400 mb-1 flex items-center">
                Explicação:
              </h4>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {showResult && (
          <div className="bg-zinc-950/50 px-6 py-4 border-t border-zinc-800 flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
              {currentIndex === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizView;