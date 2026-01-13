
import React, { useState, useCallback } from 'react';
import { PromptConfig, GenerationResult, DrawStyle } from './types';
import { generateMvPrompts } from './services/geminiService';
import InputPanel from './components/InputPanel';
import PromptCard from './components/PromptCard';

const App: React.FC = () => {
  const [config, setConfig] = useState<PromptConfig>({
    lyrics: '',
    duration: 60,
    style: DrawStyle.ANIME,
    character: ''
  });

  const [results, setResults] = useState<GenerationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfigChange = (updates: Partial<PromptConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleGenerate = async () => {
    if (!config.lyrics.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const generated = await generateMvPrompts(config);
      setResults(generated);
    } catch (err: any) {
      setError(err.message || "予期せぬエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAll = () => {
    const fullText = results
      .map(r => `[${r.timestamp}] ${r.prompt}`)
      .join('\n\n');
    navigator.clipboard.writeText(fullText);
    alert('すべてのプロンプトをクリップボードにコピーしました');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 tracking-tight">
          MV PROMPT GENERATOR
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          歌詞を読み込み、AIが楽曲の世界観を分析。5秒間隔で高品質な画像生成用プロンプトを自動的に書き出します。
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Panel: Settings */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 md:p-8 rounded-3xl shadow-2xl sticky top-8">
            <InputPanel
              config={config}
              onChange={handleConfigChange}
              onGenerate={handleGenerate}
              isLoading={loading}
            />
          </div>
        </div>

        {/* Right Panel: Output */}
        <div className="lg:col-span-7">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </div>
          )}

          {!results.length && !loading && !error && (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-500 text-center px-10">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-magic text-3xl"></i>
              </div>
              <p className="text-lg font-medium">生成されたプロンプトがここに表示されます</p>
              <p className="text-sm">歌詞を入力して、生成ボタンを押してください</p>
            </div>
          )}

          {loading && (
            <div className="space-y-4 animate-pulse">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-slate-800 h-32 rounded-xl border border-slate-700"></div>
              ))}
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-800/80 p-4 rounded-2xl sticky top-8 z-10 border border-slate-700 shadow-xl backdrop-blur">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <i className="fas fa-list-ul text-indigo-400"></i>
                  生成結果 ({results.length}枚分)
                </h2>
                <button
                  onClick={handleCopyAll}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-copy"></i>
                  すべてコピー
                </button>
              </div>

              <div className="space-y-4 pb-20">
                {results.map((item, index) => (
                  <PromptCard key={`${item.timestamp}-${index}`} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="mt-20 pt-10 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© 2024 MV Prompt Generator | Powered by Gemini 3 Flash</p>
        <p className="mt-2">Aspect Ratio: 16:9 fixed, Quality Optimized</p>
      </footer>
    </div>
  );
};

export default App;
