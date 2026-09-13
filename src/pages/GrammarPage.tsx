import React, { useState, useEffect } from 'react';
import {
  BookmarkCheck,
  Search,
  Sparkles,
  BookOpen,
  Bot,
  Send,
  Loader2,
  Trash2,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Filter,
  Lightbulb,
  X
} from 'lucide-react';
import { GrammarRule } from '../types/english';
import { grammarData } from '../data/grammarData';
import { AudioButton } from '../components/AudioButton';
import { explainGrammarTopic } from '../services/aiService';

const CATEGORIES = [
  { key: 'all', label: 'সকল বিষয়', labelEn: 'All Topics' },
  { key: 'parts_of_speech', label: 'পদ প্রকরণ', labelEn: 'Parts of Speech' },
  { key: 'tenses', label: 'কাল ও সময়', labelEn: 'Tenses' },
  { key: 'sentences', label: 'বাক্যরীতি', labelEn: 'Sentences' },
  { key: 'articles', label: 'আর্টিকেল', labelEn: 'Articles' },
  { key: 'punctuation', label: 'বিরামচিহ্ন', labelEn: 'Punctuation' },
  { key: 'number_gender', label: 'বচন ও লিঙ্গ', labelEn: 'Number & Gender' },
  { key: 'degrees', label: 'তুলনা', labelEn: 'Degrees' },
  { key: 'modals', label: 'মোডাল ও অনুরোধ', labelEn: 'Modals' },
  { key: 'prepositions', label: 'প্রেপজিশন', labelEn: 'Prepositions' },
  { key: 'connectors', label: 'সংযোজক ও প্রত্যয়', labelEn: 'Connectors' },
  { key: 'ai_custom', label: 'এআই সংগৃহীত', labelEn: 'AI Generated' },
] as const;

const QUICK_PROMPTS = [
  'Present Continuous Tense',
  'A বনাম An-এর ব্যবহার',
  'Could you দিয়ে ভদ্র অনুরোধ',
  'Preposition: in, on, at',
  'Irregular Plurals (Child/Children)',
  'Subject-Verb Agreement',
];

export const GrammarPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [customRules, setCustomRules] = useState<GrammarRule[]>([]);
  
  // AI query states
  const [aiQuery, setAiQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  // Load custom grammar rules from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('class5_custom_grammar');
      if (saved) {
        setCustomRules(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load custom grammar rules', e);
    }
  }, []);

  // Save custom rules helper
  const saveCustomRules = (updated: GrammarRule[]) => {
    setCustomRules(updated);
    try {
      localStorage.setItem('class5_custom_grammar', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save custom grammar rules', e);
    }
  };

  // Handle AI grammar query
  const handleAiExplain = async (topicToQuery?: string) => {
    const query = (topicToQuery || aiQuery).trim();
    if (!query) return;

    setIsAiLoading(true);
    setAiError(null);
    setAiSuccessMessage(null);

    try {
      const result = await explainGrammarTopic(query);
      // Prepend to custom rules
      const updated = [result, ...customRules.filter((r) => r.id !== result.id)];
      saveCustomRules(updated);
      setAiQuery('');
      setAiSuccessMessage(`"${result.title}" সফলভাবে যুক্ত হয়েছে!`);
      setSelectedCategory('all');
    } catch (err: any) {
      console.error(err);
      setAiError(err?.message || 'এআই থেকে ব্যাকরণ ব্যাখ্যা সংগ্রহ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Delete custom rule
  const handleDeleteCustomRule = (id: string) => {
    const updated = customRules.filter((r) => r.id !== id);
    saveCustomRules(updated);
  };

  // Combine default dataset with user custom AI rules
  const allGrammar = [...customRules, ...grammarData];

  // Filtering
  const filteredGrammar = allGrammar.filter((g) => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      g.title.toLowerCase().includes(q) ||
      g.titleBn.toLowerCase().includes(q) ||
      g.explanationBn.toLowerCase().includes(q) ||
      (g.formula && g.formula.toLowerCase().includes(q)) ||
      (g.categoryBn && g.categoryBn.toLowerCase().includes(q));

    const matchCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'ai_custom'
        ? (g.source === 'ai_generated' || g.source === 'ai')
        : g.category === selectedCategory;

    const matchUnit = selectedUnit === 'all' || g.unitId === selectedUnit;

    return matchSearch && matchCategory && matchUnit;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold font-english backdrop-blur">
            <BookmarkCheck size={14} />
            <span>ENGLISH GRAMMAR LAB & AI TUTOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-bangla">
            পঞ্চম শ্রেণির ১০০টি পূর্ণাঙ্গ ইংরেজি ব্যাকরণ সহায়িকা
          </h1>
          <p className="text-sm text-purple-100 font-bangla">
            পাঠ্যবই ও জাতীয় শিক্ষাক্রম অনুসারে সাজানো ১০০টি বিষয়—সহজ বাংলা ব্যাখ্যা, নিয়ম ও সূত্র, বাস্তব উদাহরণ, অডিও উচ্চারণ এবং প্রচলিত ভুলের সমাধান!
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="px-2.5 py-1 bg-white/10 rounded-lg border border-white/20">
              📚 মোট বিষয়: {allGrammar.length}টি
            </span>
            <span className="px-2.5 py-1 bg-white/10 rounded-lg border border-white/20">
              🎧 অডিও উচ্চারণ সংযুক্ত
            </span>
            <span className="px-2.5 py-1 bg-emerald-400/20 text-emerald-200 rounded-lg border border-emerald-400/30">
              🤖 এআই ব্যাকরণ শিক্ষক সক্রিয়
            </span>
          </div>
        </div>
      </div>

      {/* Interactive AI Grammar Assistant Search Box */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white rounded-2xl border-2 border-indigo-200 p-5 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-base font-bangla">
            <Bot size={20} className="text-indigo-600 animate-pulse" />
            <span>এআই ব্যাকরণ শিক্ষক (AI Grammar Assistant)</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold font-english">
            Groq Llama / Qwen
          </span>
        </div>
        <p className="text-xs text-slate-600 font-bangla">
          যেকোনো ইংরেজি ব্যাকরণ নিয়ম বা প্রশ্ন লিখুন। এআই তাৎক্ষণিক বাংলা অর্থ, সূত্র, উদাহরণ ও ভুল সংশোধনের নোট তৈরি করে দেবে।
        </p>

        {/* Input bar */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="উদাহরণ: Past Continuous Tense, Wh-question rules, A vs An..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isAiLoading) {
                  handleAiExplain();
                }
              }}
              disabled={isAiLoading}
              className="w-full pl-4 pr-10 py-2.5 text-sm bg-white border border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-english placeholder:font-bangla transition-all disabled:opacity-50"
            />
            {aiQuery && (
              <button
                onClick={() => setAiQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => handleAiExplain()}
            disabled={isAiLoading || !aiQuery.trim()}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            {isAiLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>ব্যাখ্যা তৈরি হচ্ছে...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>এআই দিয়ে বুঝুন</span>
              </>
            )}
          </button>
        </div>

        {/* Quick prompt suggestions */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs font-semibold text-slate-500 font-bangla flex items-center gap-1">
            <Lightbulb size={13} className="text-amber-500" />
            দ্রুত জানতে চাপুন:
          </span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAiQuery(prompt);
                handleAiExplain(prompt);
              }}
              disabled={isAiLoading}
              className="text-xs px-2.5 py-1 bg-white hover:bg-indigo-100/70 text-indigo-700 border border-indigo-200 rounded-lg transition-all font-bangla disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Success message */}
        {aiSuccessMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 font-bangla animate-fade-in">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{aiSuccessMessage}</span>
          </div>
        )}

        {/* Error message */}
        {aiError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2 font-bangla">
            <AlertCircle size={16} className="text-rose-600 shrink-0" />
            <span>{aiError}</span>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Filter size={13} />
          <span>ব্যাকরণ বিভাগ অনুযায়ী ফিল্টার করুন:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            const count =
              cat.key === 'all'
                ? allGrammar.length
                : cat.key === 'ai_custom'
                ? customRules.length
                : allGrammar.filter((g) => g.category === cat.key).length;

            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-200'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300 border border-slate-200'
                }`}
              >
                <span className="font-bangla">{cat.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-english font-semibold leading-none ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="শব্দ বা ব্যাকরণ বিষয় খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white font-bangla transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold whitespace-nowrap font-bangla">
            পাঠ্যবইয়ের ইউনিট:
          </span>
          <select
            value={selectedUnit}
            onChange={(e) =>
              setSelectedUnit(e.target.value === 'all' ? 'all' : parseInt(e.target.value))
            }
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:border-indigo-500 w-full sm:w-auto font-bangla"
          >
            <option value="all">সকল অধ্যায় (All 20 Units)</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((u) => (
              <option key={u} value={u}>
                Unit {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-bangla">
        <span>
          প্রদর্শিত হচ্ছে: <strong className="text-slate-800 font-english">{filteredGrammar.length}</strong> টি বিষয়
        </span>
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-indigo-600 hover:underline font-semibold"
          >
            সার্চ রিসেট করুন
          </button>
        )}
      </div>

      {/* Grammar Cards List */}
      <div className="space-y-5">
        {filteredGrammar.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-6 shadow-sm hover:shadow-md transition-all space-y-4 relative"
          >
            {/* Top Bar with Badges */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {rule.unitId && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 font-english">
                      Unit {rule.unitId}
                    </span>
                  )}
                  {rule.categoryBn && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100 font-bangla">
                      {rule.categoryBn}
                    </span>
                  )}
                  {(rule.source === 'ai_generated' || rule.source === 'ai') && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-bangla">
                      <Sparkles size={12} />
                      এআই তৈরি
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-english pt-1">
                  {rule.title}
                </h3>
                <h4 className="text-sm font-semibold text-slate-600 font-bangla">
                  {rule.titleBn}
                </h4>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {(rule.source === 'ai_generated' || rule.source === 'ai') && (
                  <button
                    onClick={() => handleDeleteCustomRule(rule.id)}
                    title="এই ব্যাকরণ নিয়মটি মুছে ফেলুন"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Formula / Structure (if available) */}
            {rule.formula && (
              <div className="p-3 bg-purple-50/80 rounded-xl border border-purple-100 space-y-1">
                <div className="text-[11px] font-bold text-purple-900 uppercase tracking-wider font-bangla flex items-center gap-1">
                  <span>📐 ব্যাকরণ সূত্র / গঠন কাঠামো (Formula):</span>
                </div>
                <div className="text-xs sm:text-sm font-mono font-semibold text-purple-950 bg-white/80 px-3 py-1.5 rounded-lg border border-purple-200 overflow-x-auto">
                  {rule.formula}
                </div>
              </div>
            )}

            {/* Explanation in Bengali and English */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider font-bangla">
                সহজ বাংলা ব্যাখ্যা:
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-bangla">
                {rule.explanationBn}
              </p>
              <p className="text-xs text-slate-500 font-english leading-relaxed">
                {rule.explanation}
              </p>
            </div>

            {/* Examples with Audio */}
            {rule.examples && rule.examples.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-bangla">
                  বাস্তব উদাহরণ (Examples):
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {rule.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-100/60 flex items-center justify-between gap-3 hover:bg-indigo-50/70 transition-all"
                    >
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-slate-900 font-english">
                          {ex.en}
                        </div>
                        <div className="text-xs text-slate-600 font-bangla">
                          {ex.bn}
                        </div>
                        {ex.note && (
                          <div className="text-xs text-indigo-600 font-medium italic mt-1 font-bangla">
                            💡 {ex.note}
                          </div>
                        )}
                      </div>
                      <AudioButton text={ex.en} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Common Mistakes (if available) */}
            {rule.commonMistakes && rule.commonMistakes.length > 0 && (
              <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200 space-y-2">
                <div className="text-xs font-bold text-rose-800 uppercase tracking-wider font-bangla flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-rose-600" />
                  <span>সাধারণ ভুল ও সতর্কতা (Common Mistakes):</span>
                </div>
                <div className="space-y-2">
                  {rule.commonMistakes.map((m, idx) => (
                    <div
                      key={idx}
                      className="text-xs bg-white p-2.5 rounded-lg border border-rose-100 space-y-1"
                    >
                      <div className="flex items-center gap-2 font-english flex-wrap">
                        <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-bold text-[11px]">
                          ❌ ভুল:
                        </span>
                        <span className="line-through text-slate-600">{m.incorrect}</span>
                      </div>
                      <div className="flex items-center gap-2 font-english flex-wrap">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                          ✅ সঠিক:
                        </span>
                        <span className="font-bold text-emerald-900">{m.correct}</span>
                      </div>
                      <div className="text-slate-600 font-bangla text-[11px] pt-0.5">
                        💡 <strong>কেন ভুল:</strong> {m.reasonBn || m.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Memory Tips */}
            {rule.tips && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium font-bangla flex items-start gap-2">
                <Sparkles size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>মনে রাখার টিপস:</strong> {rule.tips}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Empty state */}
        {filteredGrammar.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
            <HelpCircle size={40} className="mx-auto text-slate-300" />
            <p className="text-slate-600 font-semibold font-bangla">
              কোনো ব্যাকরণ বিষয় খুঁজে পাওয়া যায়নি।
            </p>
            <p className="text-xs text-slate-400 font-bangla">
              আপনি উপরের এআই সার্চ বক্সে লিখলে এআই সরাসরি নতুন ব্যাখ্যা তৈরি করে দেবে!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
