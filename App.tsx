import React, { useState } from 'react';
import { Unit, ViewState } from './types';
import { SYLLABUS } from './constants';
import Dashboard from './components/Dashboard';
import UnitDetail from './components/UnitDetail';
import { Dna } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnit(unit);
    setView('UNIT_DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setView('DASHBOARD');
    setSelectedUnit(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-green-500 selection:text-black">
      {/* Navbar */}
      <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={handleBackToDashboard}
          >
            <div className="bg-green-600 p-1.5 rounded-lg mr-3 group-hover:bg-green-500 transition-colors">
              <Dna className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight group-hover:text-green-400 transition-colors">GENE BIOMEDICINA</span>
          </div>
          <div className="text-sm text-zinc-500 hidden sm:block font-medium">
            Biomedicina & Fisiopatologia
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {view === 'DASHBOARD' ? (
          <Dashboard units={SYLLABUS} onSelectUnit={handleUnitSelect} />
        ) : (
          selectedUnit && (
            <UnitDetail 
              unit={selectedUnit} 
              onBack={handleBackToDashboard} 
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} GENE BIOMEDICINA. 
          </p>
          <p className="text-zinc-600 text-xs mt-2">
            Conteúdo gerado por IA (Gemini 2.5) para fins educacionais.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;