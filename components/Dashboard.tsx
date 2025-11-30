import React from 'react';
import { Unit } from '../types';
import { Book, ChevronRight, Activity, Microscope, HeartPulse, Wind, Dumbbell, Droplets, Utensils, Syringe, BrainCircuit } from 'lucide-react';

interface DashboardProps {
  units: Unit[];
  onSelectUnit: (unit: Unit) => void;
}

const getIconForUnit = (title: string) => {
  if (title.includes('I')) return <Microscope className="w-6 h-6" />;
  if (title.includes('II')) return <Activity className="w-6 h-6" />; // Growth/Inflammation
  if (title.includes('III')) return <BrainCircuit className="w-6 h-6" />; // Nervous
  if (title.includes('IV')) return <HeartPulse className="w-6 h-6" />; // Cardio
  if (title.includes('V')) return <Wind className="w-6 h-6" />; // Respiratory
  if (title.includes('VI')) return <Dumbbell className="w-6 h-6" />; // Muscle
  if (title.includes('VII')) return <Droplets className="w-6 h-6" />; // Renal
  if (title.includes('VIII')) return <Utensils className="w-6 h-6" />; // Digestive
  if (title.includes('IX')) return <Syringe className="w-6 h-6" />; // Endocrine
  return <Book className="w-6 h-6" />;
};

const Dashboard: React.FC<DashboardProps> = ({ units, onSelectUnit }) => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
          GENE <span className="text-green-500">BIOMEDICINA</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Sua plataforma central de Fisiopatologia. Estudo, Quiz e Casos Clínicos potencializados por Inteligência Artificial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => {
           const Icon = getIconForUnit(unit.title); 

           return (
            <button
              key={unit.id}
              onClick={() => onSelectUnit(unit)}
              className="group bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-green-500/50 hover:shadow-green-900/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {React.cloneElement(Icon as React.ReactElement, { className: "w-24 h-24 text-green-500" })}
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-zinc-800 text-green-500 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                     {Icon}
                  </div>
                  <span className="font-bold text-sm text-green-500 uppercase tracking-wider">{unit.title}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-green-400 transition-colors">
                  {unit.subtitle}
                </h3>
                
                <div className="space-y-1 mb-6">
                  {unit.topics.slice(0, 3).map((topic, i) => (
                    <p key={i} className="text-sm text-zinc-500 truncate">• {topic}</p>
                  ))}
                  {unit.topics.length > 3 && (
                    <p className="text-xs text-zinc-600 italic mt-1">+ {unit.topics.length - 3} tópicos</p>
                  )}
                </div>

                <div className="flex items-center text-sm font-semibold text-green-500 mt-auto group-hover:translate-x-1 transition-transform">
                  Acessar Módulo
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;