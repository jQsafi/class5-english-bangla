import React, { useState } from 'react';
import { BookmarkCheck, Search, Sparkles, Volume2, BookOpen, ChevronRight } from 'lucide-react';
import { grammarData } from '../data/grammarData';
import { AudioButton } from '../components/AudioButton';

export const GrammarPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');

  const filteredGrammar = grammarData.filter((g) => {
    const matchSearch =
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.titleBn.includes(search) ||
      g.explanationBn.includes(search);
    const matchUnit = selectedUnit === 'all' || g.unitId === selectedUnit;
    return matchSearch && matchUnit;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold font-english backdrop-blur">
            <BookmarkCheck size={14} />
            <span>GRAMMAR & LANGUAGE FOCUS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            পঞ্চম শ্রেণির ইংরেজি ব্যাকরণ সহায়িকা
          </h1>
          <p className="text-sm text-purple-100">
            পাঠ্যবইয়ের ২০টি ইউনিটের ব্যাকরণ নিয়মাবলী, সহজ বাংলা ব্যাখ্যা, ফর্মুলা ও বাস্তব কথোপকথনের উদাহরণ।
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="ব্যাকরণ বা নিয়ম খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">ইউনিট:</span>
          <select
            value={selectedUnit}
            onChange={(e) =>
              setSelectedUnit(e.target.value === 'all' ? 'all' : parseInt(e.target.value))
            }
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-indigo-500 w-full sm:w-auto"
          >
            <option value="all">সকল অধ্যায় (All Units)</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((u) => (
              <option key={u} value={u}>
                Unit {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grammar Cards List */}
      <div className="space-y-4">
        {filteredGrammar.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-6 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 font-english mb-1">
                  Unit {rule.unitId}
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-english">
                  {rule.title}
                </h3>
                <h4 className="text-sm font-semibold text-slate-600 font-bangla">
                  {rule.titleBn}
                </h4>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                সহজ ব্যাখ্যা:
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-bangla">
                {rule.explanationBn}
              </p>
              <p className="text-xs text-slate-500 font-english">
                {rule.explanation}
              </p>
            </div>

            {/* Examples */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                বাস্তব উদাহরণ (Examples):
              </div>
              <div className="grid grid-cols-1 gap-2">
                {rule.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-100/60 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 font-english">
                        {ex.en}
                      </div>
                      <div className="text-xs text-slate-600 font-bangla mt-0.5">
                        {ex.bn}
                      </div>
                      {ex.note && (
                        <div className="text-xs text-indigo-600 font-medium italic mt-1">
                          💡 {ex.note}
                        </div>
                      )}
                    </div>
                    <AudioButton text={ex.en} size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            {rule.tips && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium font-bangla flex items-center gap-2">
                <Sparkles size={16} className="text-amber-600 shrink-0" />
                <span>{rule.tips}</span>
              </div>
            )}
          </div>
        ))}

        {filteredGrammar.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-2">
            <p className="text-slate-500 font-medium">কোনো ব্যাকরণ টপিক পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
};
