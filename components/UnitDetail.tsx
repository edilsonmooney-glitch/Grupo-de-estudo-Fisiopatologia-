import React, { useState, useEffect } from 'react';
import { Unit, TabState, QuizQuestion } from '../types';
import { ArrowLeft, BookOpen, BrainCircuit, Loader2, Sparkles, RefreshCcw, Stethoscope } from 'lucide-react';
import { generateStudyContent, generateQuiz, generateClinicalCases } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';
import QuizView from './QuizView';

interface UnitDetailProps {
  unit: Unit;
  onBack: () => void;
}

const UnitDetail: React.FC<UnitDetailProps> = ({ unit, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabState>('STUDY');
  
  // Study Content State
  const [studyContent, setStudyContent] = useState<string | null>(null);
  const [loadingStudy, setLoadingStudy] = useState(false);
  
  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  // Clinical Cases State
  const [clinicalCases, setClinicalCases] = useState<QuizQuestion[] | null>(null);
  const [loadingCases, setLoadingCases] = useState(false);

  const fetchStudyContent = async () => {
    setLoadingStudy(true);
    const content = await generateStudyContent(unit);
    setStudyContent(content);
    setLoadingStudy(false);
  };

  const fetchQuiz = async () => {
    setLoadingQuiz(true);
    const questions = await generateQuiz(unit);
    setQuizQuestions(questions);
    setLoadingQuiz(false);
  };

  const fetchCases = async () => {
    setLoadingCases(true);
    const cases = await generateClinicalCases(unit);
    setClinicalCases(cases);
    setLoadingCases(false);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-green-500 font-medium mb-4 hover:text-green-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para GENE BIOMEDICINA
        </button>
        <h1 className="text-3xl font-bold text-white">{unit.title}</h1>
        <h2 className="text-xl text-green-500 mt-1">{unit.subtitle}</h2>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-800 mb-8 pb-1">
        <button
          onClick={() => setActiveTab('STUDY')}
          className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center ${
            activeTab === 'STUDY'
              ? 'border-green-500 text-green-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Material de Estudo
        </button>
        <button
          onClick={() => setActiveTab('QUIZ')}
          className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center ${
            activeTab === 'QUIZ'
              ? 'border-green-500 text-green-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <BrainCircuit className="w-4 h-4 mr-2" />
          Quiz Prático
        </button>
        <button
          onClick={() => setActiveTab('CASES')}
          className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center ${
            activeTab === 'CASES'
              ? 'border-green-500 text-green-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Stethoscope className="w-4 h-4 mr-2" />
          Casos Clínicos
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'STUDY' && (
          <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 p-6 md:p-10">
            {!studyContent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-zinc-800 p-4 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Gerar Material de Estudo com IA</h3>
                <p className="text-zinc-400 max-w-md mb-6">
                  Nossa inteligência artificial irá criar um resumo detalhado e estruturado sobre todos os tópicos desta unidade.
                </p>
                <button
                  onClick={fetchStudyContent}
                  disabled={loadingStudy}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-md transition-all flex items-center"
                >
                  {loadingStudy ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Gerando Conteúdo...
                    </>
                  ) : (
                    'Gerar Conteúdo'
                  )}
                </button>
              </div>
            ) : (
              <div>
                 <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                    <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Resumo Gerado por IA</span>
                    <button onClick={fetchStudyContent} disabled={loadingStudy} className="text-sm text-green-500 hover:underline flex items-center">
                      {loadingStudy ? <Loader2 className="w-3 h-3 animate-spin mr-1"/> : <RefreshCcw className="w-3 h-3 mr-1"/>}
                      Regerar
                    </button>
                 </div>
                 <MarkdownRenderer content={studyContent} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'QUIZ' && (
          <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 p-6 md:p-10">
             {!quizQuestions ? (
               <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-zinc-800 p-4 rounded-full mb-4">
                  <BrainCircuit className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Testar Conhecimentos</h3>
                <p className="text-zinc-400 max-w-md mb-6">
                  Gere um quiz interativo com perguntas de nível superior para testar sua retenção.
                </p>
                <button
                  onClick={fetchQuiz}
                  disabled={loadingQuiz}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-md transition-all flex items-center"
                >
                  {loadingQuiz ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Criando Perguntas...
                    </>
                  ) : (
                    'Iniciar Quiz'
                  )}
                </button>
              </div>
             ) : (
               <QuizView questions={quizQuestions} onRetry={fetchQuiz} title="Quiz Concluído!" />
             )}
          </div>
        )}

        {activeTab === 'CASES' && (
          <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 p-6 md:p-10">
             {!clinicalCases ? (
               <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-zinc-800 p-4 rounded-full mb-4">
                  <Stethoscope className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Casos Clínicos Interativos</h3>
                <p className="text-zinc-400 max-w-md mb-6">
                  Analise cenários reais e aplique seus conhecimentos de fisiopatologia para diagnosticar e tratar.
                </p>
                <button
                  onClick={fetchCases}
                  disabled={loadingCases}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-md transition-all flex items-center"
                >
                  {loadingCases ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Elaborando Casos...
                    </>
                  ) : (
                    'Gerar Casos'
                  )}
                </button>
              </div>
             ) : (
               <QuizView questions={clinicalCases} onRetry={fetchCases} title="Casos Analisados!" />
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitDetail;