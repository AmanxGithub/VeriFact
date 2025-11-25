import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, ExternalLink } from 'lucide-react';
import { FactCheckResult, Source } from '../types';

interface ResultCardProps {
  result: FactCheckResult;
}

const VerdictBadge: React.FC<{ verdict: FactCheckResult['verdict'] }> = ({ verdict }) => {
  const styles = {
    True: "bg-emerald-100 text-emerald-800 border-emerald-200",
    False: "bg-red-100 text-red-800 border-red-200",
    Misleading: "bg-orange-100 text-orange-800 border-orange-200",
    Mixed: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Unverified: "bg-slate-100 text-slate-800 border-slate-200",
  };

  const icons = {
    True: <CheckCircle2 className="h-5 w-5 mr-2" />,
    False: <XCircle className="h-5 w-5 mr-2" />,
    Misleading: <AlertTriangle className="h-5 w-5 mr-2" />,
    Mixed: <AlertTriangle className="h-5 w-5 mr-2" />,
    Unverified: <HelpCircle className="h-5 w-5 mr-2" />,
  };

  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-full border ${styles[verdict]} font-medium text-sm`}>
      {icons[verdict]}
      {verdict.toUpperCase()}
    </div>
  );
};

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up">
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <VerdictBadge verdict={result.verdict} />
        </div>
        
        <div className="prose prose-slate max-w-none mb-8">
          <ReactMarkdown>{result.text}</ReactMarkdown>
        </div>

        {result.sources.length > 0 && (
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center">
              Sources & Evidence
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {result.sources.map((source, index) => (
                <a
                  key={index}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="h-6 w-6 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-500">
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                  <div className="ml-3 overflow-hidden">
                    <p className="text-sm font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {source.title || "Unknown Source"}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {source.uri}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
        <p className="text-xs text-slate-400 text-center">
          AI-generated content can be inaccurate. Always verify important information independently.
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
