
import React from 'react';
import { DevotionalContent } from '../types';

interface DevotionalDisplayProps {
  content: DevotionalContent;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className = '' }) => (
  <div className={`bg-neutral-900 p-6 md:p-8 rounded-2xl shadow-xl border border-neutral-800 mb-6 transition-all duration-300 hover:shadow-2xl ${className}`}>
    <div className="flex items-center mb-4">
      <span className="text-gold mr-3 p-2 bg-gold/10 rounded-lg">{icon}</span>
      <h3 className="text-xl font-bold text-white font-serif">{title}</h3>
    </div>
    <div className="text-gray-300 leading-relaxed text-lg">
      {children}
    </div>
  </div>
);

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const ReflectionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.674a1 1 0 00.922-.617l2.108-5.271A1 1 0 0016.445 10H3.555a1 1 0 00-.922 1.112l2.108 5.271a1 1 0 00.922.617z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V10M12 2v4M4.93 4.93l2.83 2.83M19.07 4.93l-2.83 2.83" />
    </svg>
);

const ApplicationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const PrayerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
);

const ActionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const DevotionalDisplay: React.FC<DevotionalDisplayProps> = ({ content }) => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <header className="text-center py-10 px-6 bg-black rounded-3xl shadow-2xl border-2 border-neutral-800 relative overflow-hidden">
        {/* Elemento decorativo sutil */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold opacity-10 rounded-full -mr-16 -mt-16"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-serif leading-tight relative z-10">{content.titulo}</h2>
      </header>
      
      <Section title="Versículo do Dia" icon={<BookIcon />}>
        <blockquote className="border-l-4 border-gold pl-6 py-2">
          <p className="text-xl italic font-serif text-white">"{content.versiculo.texto}"</p>
          <cite className="block text-right mt-4 not-italic font-bold text-gold tracking-wider uppercase text-sm">{content.versiculo.referencia}</cite>
        </blockquote>
      </Section>
      
      <Section title="Reflexão" icon={<ReflectionIcon />}>
        <p className="whitespace-pre-line">{content.reflexao}</p>
      </Section>
      
      <Section title="Aplicação Prática" icon={<ApplicationIcon />}>
        <p>{content.aplicacao}</p>
      </Section>
      
      <div className="bg-gradient-to-br from-orange-vibrant to-gold text-white p-10 rounded-3xl shadow-2xl text-center my-10 border-b-8 border-black">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16C10.9124 16 10.017 16.8954 10.017 18L10.017 21H4.01703V11C4.01703 10.4477 4.46474 10 5.01703 10H19.017C19.5693 10 20.017 10.4477 20.017 11V21H14.017Z" />
        </svg>
        <p className="text-2xl italic font-serif leading-relaxed">"{content.frase}"</p>
      </div>
      
      <Section title="Momento de Oração" icon={<PrayerIcon />}>
        <p className="italic text-gray-400 bg-black/40 p-4 rounded-xl border-l-2 border-gold/30">{content.oracao}</p>
      </Section>
      
      <Section title="Desafio do Dia" icon={<ActionIcon />} className="bg-gold/5 border-2 border-gold/20">
        <p className="font-bold text-white text-xl">{content.acao}</p>
      </Section>
    </div>
  );
};

export default DevotionalDisplay;
