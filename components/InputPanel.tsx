
import React from 'react';
import { PromptConfig, DrawStyle } from '../types';
import { STYLE_OPTIONS } from '../constants';

interface InputPanelProps {
  config: PromptConfig;
  onChange: (updates: Partial<PromptConfig>) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ config, onChange, onGenerate, isLoading }) => {
  return (
    <div className="space-y-6">
      <section>
        <label className="block text-sm font-semibold mb-2 text-indigo-300">
          <i className="fas fa-music mr-2"></i>歌詞入力
        </label>
        <textarea
          value={config.lyrics}
          onChange={(e) => onChange({ lyrics: e.target.value })}
          placeholder="ここに歌詞を入力してください（日本語）"
          className="w-full h-48 bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
        />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section>
          <label className="block text-sm font-semibold mb-2 text-indigo-300">
            <i className="fas fa-clock mr-2"></i>再生時間 (秒)
          </label>
          <input
            type="number"
            value={config.duration}
            onChange={(e) => onChange({ duration: Number(e.target.value) })}
            min={5}
            max={600}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </section>

        <section>
          <label className="block text-sm font-semibold mb-2 text-indigo-300">
            <i className="fas fa-palette mr-2"></i>描画スタイル
          </label>
          <select
            value={config.style}
            onChange={(e) => onChange({ style: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {STYLE_OPTIONS.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </section>
      </div>

      <section>
        <label className="block text-sm font-semibold mb-2 text-indigo-300">
          <i className="fas fa-user-circle mr-2"></i>キャラクター設定 (任意)
        </label>
        <textarea
          value={config.character}
          onChange={(e) => onChange({ character: e.target.value })}
          placeholder="性別、髪型、服装などの一貫した特徴"
          className="w-full h-24 bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
        />
      </section>

      <button
        onClick={onGenerate}
        disabled={isLoading || !config.lyrics.trim()}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 ${
          isLoading || !config.lyrics.trim()
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/20'
        }`}
      >
        {isLoading ? (
          <>
            <i className="fas fa-circle-notch animate-spin"></i>
            生成中...
          </>
        ) : (
          <>
            <i className="fas fa-magic"></i>
            プロンプトを一括生成
          </>
        )}
      </button>
    </div>
  );
};

export default InputPanel;
