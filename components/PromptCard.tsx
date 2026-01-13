
import React, { useState } from 'react';
import { GenerationResult } from '../types';

interface PromptCardProps {
  item: GenerationResult;
}

const PromptCard: React.FC<PromptCardProps> = ({ item }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg transition-all hover:border-indigo-500/50 group">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <span className="bg-indigo-600 text-xs font-bold px-2 py-1 rounded text-white font-mono">
            {item.timestamp}
          </span>
          <span className="text-sm text-slate-400 font-medium">
            {item.keywordsJp}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`text-xs px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
            copied 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
          }`}
        >
          <i className={copied ? "fas fa-check" : "far fa-copy"}></i>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 group-hover:bg-slate-900 transition-colors">
        {item.prompt}
      </p>
    </div>
  );
};

export default PromptCard;
