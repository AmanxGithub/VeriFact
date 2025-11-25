import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">VeriFact</h1>
        </div>
        <div className="text-sm text-slate-500 hidden sm:block">
          Powered by Gemini 2.5 & Google Search
        </div>
      </div>
    </header>
  );
};

export default Header;
