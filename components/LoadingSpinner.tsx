
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-xl border border-gray-100">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-[#c5a059] border-r-[#1a2b4b] rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-[#1a2b4b] font-bold text-xl font-serif">Preparando seu momento com Deus...</p>
      <p className="mt-2 text-gray-400 text-sm italic">"Aquietai-vos e sabei que eu sou Deus"</p>
    </div>
  );
};

export default LoadingSpinner;
