import React, { useState } from 'react';
import Header from './components/Header';
import FactInput from './components/FactInput';
import ResultCard from './components/ResultCard';
import { checkFactWithGemini } from './services/geminiService';
import { FactCheckResult } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckFact = async (fact: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await checkFactWithGemini(fact);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Verify info in seconds.
          </h2>
          <p className="text-lg text-slate-600">
            Harness the power of AI to fact-check statements against reliable sources across the web.
          </p>
        </div>

        <FactInput onCheck={handleCheckFact} isLoading={loading} />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3 text-red-800">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-32 bg-slate-200 rounded-2xl"></div>
            <div className="h-16 bg-slate-200 rounded-xl"></div>
          </div>
        )}

        {result && !loading && (
          <div className="pb-12">
            <ResultCard result={result} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
