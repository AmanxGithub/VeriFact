import React, { useState, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface FactInputProps {
  onCheck: (fact: string) => void;
  isLoading: boolean;
}

const FactInput: React.FC<FactInputProps> = ({ onCheck, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onCheck(input.trim());
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">What would you like to verify?</h2>
      <p className="text-slate-500 mb-6">Enter a statement, news headline, or claim to check its validity against real-time sources.</p>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., The Eiffel Tower grows taller in the summer..."
            className="w-full pl-4 pr-14 py-4 text-lg bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 text-slate-900"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            aria-label="Check fact"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Search className="h-6 w-6" />
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
        <span>Try:</span>
        <button onClick={() => setInput("Honey never spoils")} className="text-blue-600 hover:underline">"Honey never spoils"</button>
        <span>•</span>
        <button onClick={() => setInput("Humans use only 10% of their brains")} className="text-blue-600 hover:underline">"Humans use only 10% of their brains"</button>
        <span>•</span>
        <button onClick={() => setInput("The Great Wall of China is visible from space")} className="text-blue-600 hover:underline">"Great Wall visibility"</button>
      </div>
    </div>
  );
};

export default FactInput;
