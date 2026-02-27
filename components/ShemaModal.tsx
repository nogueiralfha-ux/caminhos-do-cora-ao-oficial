
import React, { useState } from 'react';
import { askShema } from '../services/geminiService';

interface ShemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShemaModal: React.FC<ShemaModalProps> = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAsk = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setAnswer('');
    try {
      const result = await askShema(question);
      setAnswer(result);
    } catch (error) {
      setAnswer('O Shemá está em silêncio no momento. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-neutral-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-neutral-800">
        <header className="bg-black p-6 text-white flex justify-between items-center border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="bg-gold p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif">SHEMÁ</h2>
              <p className="text-xs text-orange-200 uppercase tracking-widest">Ouvir e Responder</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Sua Pergunta</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="O que inquieta seu coração hoje?"
              className="w-full p-4 border-2 border-neutral-800 rounded-2xl focus:outline-none focus:border-orange-vibrant transition-all resize-none h-32 text-lg bg-black text-white"
            />
          </div>

          <button
            onClick={handleAsk}
            disabled={isLoading || !question.trim()}
            className="w-full py-4 bg-orange-vibrant text-white font-bold rounded-2xl hover:bg-orange-600 disabled:bg-gray-700 transition-all shadow-lg active:scale-[0.98]"
          >
            {isLoading ? 'O Shemá está ouvindo...' : 'Perguntar ao Shemá'}
          </button>

          {answer && (
            <div className="animate-fade-in space-y-2">
              <label className="text-sm font-bold text-gold uppercase tracking-wider">Resposta do Shemá</label>
              <div className="bg-gold/5 p-6 rounded-2xl border border-gold/20 text-gray-200 leading-relaxed text-lg italic font-serif">
                {answer}
              </div>
            </div>
          )}
        </div>

        <footer className="p-4 bg-black text-center text-xs text-gray-500 border-t border-neutral-800">
          "Ouve, ó Israel..." - Shemá Israel
        </footer>
      </div>
    </div>
  );
};

export default ShemaModal;
