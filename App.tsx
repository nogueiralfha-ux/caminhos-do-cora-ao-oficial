
import React, { useState, useCallback } from 'react';
import { DevotionalContent } from './types';
import { generateDevotional } from './services/geminiService';
import DevotionalDisplay from './components/DevotionalDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ShemaModal from './components/ShemaModal';

type View = 'dashboard' | 'devotional';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [theme, setTheme] = useState<string>('');
  const [devotional, setDevotional] = useState<DevotionalContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isShemaOpen, setIsShemaOpen] = useState<boolean>(false);

  const handleGenerateDevotional = useCallback(async () => {
    if (!theme.trim()) {
      setError('Por favor, insira um tema para o devocional.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setDevotional(null);

    try {
      const result = await generateDevotional(theme);
      setDevotional(result);
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao gerar o devocional. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [theme]);

  const resetToDashboard = () => {
    setActiveView('dashboard');
    setDevotional(null);
    setTheme('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-black-ink text-white p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <main className="w-full max-w-4xl mx-auto">
        <header className="flex flex-col items-center text-center mb-10">
          <button 
            onClick={resetToDashboard}
            className="mb-6 transform hover:scale-105 transition-transform duration-500 cursor-pointer"
          >
            <img 
              src="https://images.squarespace-cdn.com/content/v1/5e3b0923e59591459483324c/1581452140662-M1W5O7G5R3S3S7W9E6G7/Missio+Dei+Logo.png" 
              alt="Missio Dei Logo" 
              className="h-24 md:h-32 object-contain drop-shadow-xl invert brightness-200"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </button>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-serif tracking-tight">Caminhos do Coração</h1>
          <div className="h-1 w-24 bg-gold my-4 rounded-full"></div>
          <p className="text-lg text-gray-400 font-light italic">Inspiração e comunhão através da Missio Dei</p>
        </header>

        {activeView === 'dashboard' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {/* Card Devocional */}
            <button
              onClick={() => setActiveView('devotional')}
              className="group bg-neutral-900 p-8 rounded-3xl shadow-2xl border-t-8 border-white hover:border-orange-vibrant transition-all duration-500 text-left flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white font-serif mb-3">Devocional Diário</h2>
              <p className="text-gray-400 mb-6 flex-grow">Receba uma palavra de inspiração e reflexão baseada no tema que você escolher.</p>
              <span className="px-6 py-2 bg-orange-vibrant text-white rounded-full text-sm font-bold group-hover:px-8 transition-all shadow-lg">Começar</span>
            </button>

            {/* Card Shema */}
            <button
              onClick={() => setIsShemaOpen(true)}
              className="group bg-neutral-900 p-8 rounded-3xl shadow-2xl border-t-8 border-gold hover:border-orange-vibrant transition-all duration-500 text-left flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gold font-serif mb-3">SHEMÁ</h2>
              <p className="text-gray-400 mb-6 flex-grow">Faça uma pergunta ao Shemá e receba uma orientação espiritual acolhedora.</p>
              <span className="px-6 py-2 bg-gold text-white rounded-full text-sm font-bold group-hover:px-8 transition-all shadow-lg">Perguntar</span>
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <button 
              onClick={resetToDashboard}
              className="mb-6 flex items-center text-white font-bold hover:text-orange-vibrant transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar ao Início
            </button>

            <div className="bg-neutral-900 rounded-2xl shadow-2xl p-6 md:p-8 mb-10 border-t-4 border-white">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="Qual o tema da sua busca hoje? (ex: Paz, Força, Família)"
                  className="flex-grow w-full px-5 py-4 border-2 border-neutral-800 rounded-xl focus:outline-none focus:border-orange-vibrant transition-all duration-300 bg-black text-white"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateDevotional()}
                />
                <button
                  onClick={handleGenerateDevotional}
                  disabled={isLoading}
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-orange-vibrant text-white font-bold rounded-xl hover:bg-orange-600 hover:shadow-lg disabled:bg-gray-600 transition-all duration-300 transform active:scale-95 whitespace-nowrap shadow-md"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.993 7.993 0 003 12c0 4.418 3.582 8 8 8s8-3.582 8-8a7.993 7.993 0 00-6-7.196V10a1 1 0 01-1 1H9V4.804z" />
                      </svg>
                      Gerar Devocional
                    </>
                  )}
                </button>
              </div>
              {error && <p className="text-red-400 mt-4 text-center font-medium">{error}</p>}
            </div>

            {isLoading && <LoadingSpinner />}

            {devotional && (
              <div className="animate-fade-in pb-16">
                <DevotionalDisplay content={devotional} />
              </div>
            )}
          </div>
        )}

        <footer className="text-center mt-12 p-8 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm">
          <p className="text-gray-400 italic leading-relaxed">"Porque Deus amou o mundo de tal maneira..." - O propósito da Missio Dei é que todos conheçam o Seu amor.</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="h-px w-8 bg-neutral-800"></span>
            <p className="text-gold font-bold tracking-widest text-sm uppercase">Caminhos do Coração &bull; Missio Dei</p>
            <span className="h-px w-8 bg-neutral-800"></span>
          </div>
          <p className="text-xs text-gray-500 mt-2">&copy; {new Date().getFullYear()} - Todos os direitos reservados</p>
        </footer>
      </main>

      <ShemaModal isOpen={isShemaOpen} onClose={() => setIsShemaOpen(false)} />
    </div>
  );
};

export default App;
