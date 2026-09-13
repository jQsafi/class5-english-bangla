import React, { useState, useEffect } from 'react';
import {
  Search,
  Languages,
  Layers,
  Sparkles,
  Filter,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Loader2,
  Trash2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { vocabularyData } from '../data/vocabularyData';
import { VocabularyItem } from '../types/english';
import { AudioButton } from '../components/AudioButton';
import { lookupDictionaryWord, generateThemedVocabulary } from '../services/aiService';

const POS_LABELS: Record<string, { en: string; bn: string; color: string }> = {
  noun: { en: 'Noun', bn: 'বিশেষ্য', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  'noun phrase': { en: 'Noun Phrase', bn: 'বিশেষ্য পদগুচ্ছ', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  verb: { en: 'Verb', bn: 'ক্রিয়া', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'verb phrase': { en: 'Verb Phrase', bn: 'ক্রিয়া পদগুচ্ছ', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  adjective: { en: 'Adjective', bn: 'বিশেষণ', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  adverb: { en: 'Adverb', bn: 'ভাববিশেষণ', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  preposition: { en: 'Preposition', bn: 'পদান্বয়ী অব্যয়', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  conjunction: { en: 'Conjunction', bn: 'সংযোজক অব্যয়', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  pronoun: { en: 'Pronoun', bn: 'সর্বনাম', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  phrase: { en: 'Phrase', bn: 'শব্দগুচ্ছ', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  idiom: { en: 'Idiom', bn: 'বাগধারা', color: 'bg-purple-50 text-purple-700 border-purple-200' },
};

const QUICK_THEMES = [
  { id: 'school', label: '🏫 বিদ্যালয় ও শিক্ষা', theme: 'Classroom, school subjects, and learning objects' },
  { id: 'nature', label: '🌿 প্রকৃতি ও পরিবেশ', theme: 'Trees, flowers, weather, animals, and environment' },
  { id: 'daily', label: '💡 দৈনন্দিন জীবন', theme: 'Daily routines, home, meals, and healthy habits' },
  { id: 'science', label: '🔬 বিজ্ঞান ও আবিষ্কার', theme: 'Simple science, planets, technology, and discoveries' },
  { id: 'emotions', label: '💖 গুণ ও অনুভূতি', theme: 'Positive character traits, emotions, and friendship' },
];

export const VocabularyPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [selectedPos, setSelectedPos] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<'all' | 'textbook' | 'ai'>('all');
  const [mode, setMode] = useState<'list' | 'flashcard'>('list');
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Custom / AI Words saved in localStorage
  const [customWords, setCustomWords] = useState<VocabularyItem[]>(() => {
    try {
      const saved = localStorage.getItem('class5_custom_vocab');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // AI Lookup & Generation states
  const [aiLoading, setAiLoading] = useState(false);
  const [aiThemeLoading, setAiThemeLoading] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('class5_custom_vocab', JSON.stringify(customWords));
    } catch (e) {
      console.error('Failed to save custom vocabulary:', e);
    }
  }, [customWords]);

  const allWords: VocabularyItem[] = [...customWords, ...vocabularyData];

  // Filtering
  const filteredWords = allWords.filter((v) => {
    const term = searchTerm.trim().toLowerCase();
    const matchSearch =
      !term ||
      v.word.toLowerCase().includes(term) ||
      v.meaningBn.includes(term) ||
      v.meaningEn.toLowerCase().includes(term) ||
      v.synonyms?.some((s) => s.toLowerCase().includes(term)) ||
      v.antonyms?.some((a) => a.toLowerCase().includes(term));

    const matchUnit = selectedUnit === 'all' || v.unitId === selectedUnit;
    const matchPos = selectedPos === 'all' || v.partOfSpeech.toLowerCase() === selectedPos.toLowerCase();
    const isAiWord = v.source === 'ai' || (!v.unitId && customWords.some((c) => c.id === v.id));
    const matchSource =
      selectedSource === 'all' ||
      (selectedSource === 'textbook' && !isAiWord) ||
      (selectedSource === 'ai' && isAiWord);

    return matchSearch && matchUnit && matchPos && matchSource;
  });

  const currentCard = filteredWords[flashcardIdx] || filteredWords[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIdx((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIdx((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  // Cross-linking: clicking any word chip (synonym, antonym, form)
  const handleWordChipClick = async (targetWord: string) => {
    const cleanWord = targetWord.replace(/[^a-zA-Z -]/g, '').trim().toLowerCase();
    if (!cleanWord) return;

    // Check if word exists in current vocabulary
    const exists = allWords.find((w) => w.word.toLowerCase() === cleanWord);
    if (exists) {
      setSearchTerm(cleanWord);
      setSelectedSource('all');
      setSelectedUnit('all');
      setSelectedPos('all');
      setMode('list');
      setStatusMessage({
        text: `"${cleanWord}" শব্দটি অভিধানে খুঁজে পাওয়া গেছে!`,
        type: 'success',
      });
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } else {
      // Trigger AI lookup for this word directly
      await handleAiLookupWord(cleanWord);
    }
  };

  // Single word AI lookup
  const handleAiLookupWord = async (wordToLookup?: string) => {
    const query = (wordToLookup || searchTerm).trim();
    if (!query || aiLoading) return;

    setAiLoading(true);
    setStatusMessage({
      text: `"${query}" এর বিস্তারিত অর্থ, রূপান্তর ও উদাহরণ এআই দিয়ে তৈরি হচ্ছে...`,
      type: 'info',
    });

    try {
      const newEntry = await lookupDictionaryWord(query);
      // Remove previous duplicate if present
      const updated = [newEntry, ...customWords.filter((w) => w.word.toLowerCase() !== newEntry.word.toLowerCase())];
      setCustomWords(updated);
      setSearchTerm(newEntry.word);
      setSelectedSource('all');
      setSelectedUnit('all');
      setSelectedPos('all');
      setStatusMessage({
        text: `"${newEntry.word}" সফলভাবে উন্নত অভিধানে যোগ করা হয়েছে! ✨`,
        type: 'success',
      });
    } catch (err: any) {
      setStatusMessage({
        text: err.message || 'শব্দটি বিশ্লেষণ করা যায়নি। নেটওয়ার্ক চেক করুন।',
        type: 'error',
      });
    } finally {
      setAiLoading(false);
    }
  };

  // Bulk Theme Generation
  const handleGenerateTheme = async (themeObj: typeof QUICK_THEMES[0]) => {
    if (aiThemeLoading) return;

    setAiThemeLoading(themeObj.id);
    setStatusMessage({
      text: `"${themeObj.label}" সম্পর্কিত ৫টি গুরুত্বপূর্ণ শব্দ এআই তৈরি করছে...`,
      type: 'info',
    });

    try {
      const generated = await generateThemedVocabulary(themeObj.theme, 5);
      // Filter out duplicates
      const existingWords = new Set(allWords.map((w) => w.word.toLowerCase()));
      const uniqueNew = generated.filter((w) => !existingWords.has(w.word.toLowerCase()));

      setCustomWords((prev) => [...uniqueNew, ...prev]);
      setSelectedSource('ai');
      setSearchTerm('');
      setStatusMessage({
        text: `${uniqueNew.length}টি নতুন শব্দ যোগ করা হয়েছে! 🌟`,
        type: 'success',
      });
    } catch (err: any) {
      setStatusMessage({
        text: err.message || 'থিম শব্দ তৈরি করা যায়নি। আবার চেষ্টা করুন।',
        type: 'error',
      });
    } finally {
      setAiThemeLoading(null);
    }
  };

  const handleDeleteCustomWord = (id: string, word: string) => {
    setCustomWords((prev) => prev.filter((w) => w.id !== id));
    setStatusMessage({
      text: `"${word}" শব্দটি অভিধান থেকে সরানো হয়েছে।`,
      type: 'info',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold font-english backdrop-blur">
            <Languages size={14} />
            <span>AI ADVANCED DICTIONARY & VOCABULARY BANK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            পঞ্চম শ্রেণির স্মার্ট ইংরেজি শব্দভাণ্ডার ও উন্নত অভিধান
          </h1>
          <p className="text-sm text-indigo-100 leading-relaxed">
            গুগল ট্রান্সলেট ও অক্সফোর্ড ডিকশনারি আদলে শব্দার্থ, উচ্চারণ, পার্টস অফ স্পিচ রূপান্তর (Word Family), সমার্থক ও বিপরীত শব্দ এবং প্রাঞ্জল উদাহরণ বাক্য। যেকোনো নতুন শব্দ এআই দিয়ে তাৎক্ষণিক যোগ করুন।
          </p>
        </div>
      </div>

      {/* AI Smart Search & Word Generator Bar */}
      <div className="bg-white rounded-3xl border border-indigo-100 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="যেকোনো ইংরেজি বা বাংলা শব্দ লিখুন (যেমন: courageous, library, আনন্দ)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAiLookupWord();
                }
              }}
              className="w-full pl-10 pr-24 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors font-bangla"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
              >
                মুছুন
              </button>
            )}
          </div>

          {/* AI Lookup Button */}
          <button
            type="button"
            onClick={() => handleAiLookupWord()}
            disabled={aiLoading || !searchTerm.trim()}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shrink-0 font-bangla"
          >
            {aiLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>এআই খুঁজছে...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>এআই দিয়ে যোগ করুন</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Themed Vocabulary Generator Chips */}
        <div className="pt-2 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-500 mb-2 font-bangla flex items-center gap-1.5">
            <Sparkles size={14} className="text-purple-600" />
            <span>এক ক্লিকে এআই দিয়ে নতুন প্রয়োজনীয় শব্দ তৈরি করুন:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {QUICK_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleGenerateTheme(theme)}
                disabled={Boolean(aiThemeLoading)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 font-bangla ${
                  aiThemeLoading === theme.id
                    ? 'bg-purple-100 text-purple-800 border-purple-300 animate-pulse'
                    : 'bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border-slate-200'
                }`}
              >
                {aiThemeLoading === theme.id ? <Loader2 size={12} className="animate-spin" /> : null}
                <span>{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback / Status Alert */}
        {statusMessage && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center justify-between gap-2 animate-in fade-in duration-150 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : statusMessage.type === 'error'
                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bangla font-medium">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle size={16} className="shrink-0 text-indigo-600" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-xs opacity-70 hover:opacity-100 font-bold px-1"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Control Bar: Filters & View Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Source Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedSource('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all font-bangla ${
                selectedSource === 'all'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              সকল শব্দ ({allWords.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedSource('textbook')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all font-bangla ${
                selectedSource === 'textbook'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              পাঠ্যবই ({vocabularyData.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedSource('ai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all font-bangla flex items-center gap-1 ${
                selectedSource === 'ai'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles size={12} />
              <span>এআই সংগৃহীত ({customWords.length})</span>
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto justify-center">
            <button
              type="button"
              onClick={() => setMode('list')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all font-bangla ${
                mode === 'list'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              তালিকা ভিউ (List)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('flashcard');
                setIsFlipped(false);
              }}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 font-bangla ${
                mode === 'flashcard'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers size={14} />
              <span>ফ্ল্যাশ কার্ড (Flashcard)</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <Filter size={14} className="text-slate-400 ml-1" />
          <span className="text-xs font-medium text-slate-500 font-bangla">ফিল্টার:</span>

          {/* Unit Filter */}
          <select
            value={selectedUnit}
            onChange={(e) =>
              setSelectedUnit(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))
            }
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 text-slate-700 font-bangla"
          >
            <option value="all">সকল অধ্যায় (All Units)</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((u) => (
              <option key={u} value={u}>
                Unit {u}
              </option>
            ))}
          </select>

          {/* Part of Speech Filter */}
          <select
            value={selectedPos}
            onChange={(e) => setSelectedPos(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 text-slate-700 font-bangla"
          >
            <option value="all">সকল পার্টস অফ স্পিচ (All Parts)</option>
            <option value="noun">Noun (বিশেষ্য)</option>
            <option value="verb">Verb (ক্রিয়া)</option>
            <option value="adjective">Adjective (বিশেষণ)</option>
            <option value="adverb">Adverb (ভাববিশেষণ)</option>
            <option value="preposition">Preposition (পদান্বয়ী অব্যয়)</option>
            <option value="conjunction">Conjunction (সংযোজক অব্যয়)</option>
            <option value="pronoun">Pronoun (সর্বনাম)</option>
          </select>

          {(selectedUnit !== 'all' || selectedPos !== 'all' || selectedSource !== 'all' || searchTerm) && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedUnit('all');
                setSelectedPos('all');
                setSelectedSource('all');
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-1 font-bangla ml-auto"
            >
              ফিল্টার রিসেট
            </button>
          )}
        </div>
      </div>

      {/* Mode 1: Rich Dictionary List View */}
      {mode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredWords.map((item) => {
            const posMeta = POS_LABELS[item.partOfSpeech.toLowerCase()] || {
              en: item.partOfSpeech,
              bn: item.partOfSpeech,
              color: 'bg-slate-100 text-slate-700 border-slate-200',
            };
            const isCustom = item.source === 'ai' || !item.unitId;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
              >
                {/* Header: Tag + Part of Speech Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {item.unitId ? (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-english border border-indigo-100">
                        Unit {item.unitId}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-700 font-bangla border border-purple-100 flex items-center gap-1">
                        <Sparkles size={11} />
                        <span>এআই সংগৃহীত</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${posMeta.color} font-bangla`}
                      title={`${posMeta.en} - ${posMeta.bn}`}
                    >
                      {posMeta.bn} ({posMeta.en})
                    </span>

                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomWord(item.id, item.word)}
                        title="শব্দটি মুছে ফেলুন"
                        className="p-1 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Primary Word Section */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 font-english tracking-tight">
                        {item.word}
                      </h3>
                      {item.phonetic && (
                        <div className="text-xs text-indigo-600 font-mono font-english mt-0.5 font-medium">
                          {item.phonetic}
                        </div>
                      )}
                    </div>
                    <AudioButton text={item.word} size="md" />
                  </div>

                  {/* Bengali Meaning & English Definition */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                    <div className="text-lg font-bold text-indigo-700 font-bangla">
                      {item.meaningBn}
                    </div>
                    {item.meaningEn && (
                      <div className="text-xs text-slate-500 font-english leading-relaxed">
                        {item.meaningEn}
                      </div>
                    )}
                  </div>
                </div>

                {/* Word Family / Parts of Speech Transformations (রূপান্তর) */}
                {item.forms && Object.values(item.forms).some(Boolean) && (
                  <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100/80 space-y-1.5">
                    <div className="text-[11px] font-bold text-indigo-900 font-bangla flex items-center gap-1">
                      <BookOpen size={12} className="text-indigo-600" />
                      <span>পার্টস অফ স্পিচ রূপান্তর (Word Family):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.forms.noun && (
                        <button
                          type="button"
                          onClick={() => handleWordChipClick(item.forms!.noun!)}
                          className="px-2 py-0.5 rounded-lg bg-white border border-indigo-200 text-xs text-indigo-950 font-english hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <span className="text-[10px] text-slate-400 font-sans">Noun:</span>
                          <strong>{item.forms.noun}</strong>
                          <ArrowRight size={10} className="text-indigo-400" />
                        </button>
                      )}
                      {item.forms.verb && (
                        <button
                          type="button"
                          onClick={() => handleWordChipClick(item.forms!.verb!)}
                          className="px-2 py-0.5 rounded-lg bg-white border border-indigo-200 text-xs text-indigo-950 font-english hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <span className="text-[10px] text-slate-400 font-sans">Verb:</span>
                          <strong>{item.forms.verb}</strong>
                          <ArrowRight size={10} className="text-indigo-400" />
                        </button>
                      )}
                      {item.forms.adjective && (
                        <button
                          type="button"
                          onClick={() => handleWordChipClick(item.forms!.adjective!)}
                          className="px-2 py-0.5 rounded-lg bg-white border border-indigo-200 text-xs text-indigo-950 font-english hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <span className="text-[10px] text-slate-400 font-sans">Adj:</span>
                          <strong>{item.forms.adjective}</strong>
                          <ArrowRight size={10} className="text-indigo-400" />
                        </button>
                      )}
                      {item.forms.adverb && (
                        <button
                          type="button"
                          onClick={() => handleWordChipClick(item.forms!.adverb!)}
                          className="px-2 py-0.5 rounded-lg bg-white border border-indigo-200 text-xs text-indigo-950 font-english hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <span className="text-[10px] text-slate-400 font-sans">Adv:</span>
                          <strong>{item.forms.adverb}</strong>
                          <ArrowRight size={10} className="text-indigo-400" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Synonyms & Antonyms (সমার্থক ও বিপরীত শব্দ) */}
                {((item.synonyms && item.synonyms.length > 0) || (item.antonyms && item.antonyms.length > 0)) && (
                  <div className="space-y-2 pt-1">
                    {/* Synonyms */}
                    {item.synonyms && item.synonyms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-[11px] font-bold text-emerald-800 font-bangla shrink-0">
                          সমার্থক (Synonyms):
                        </span>
                        {item.synonyms.map((syn, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => handleWordChipClick(syn)}
                            className="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-english transition-colors flex items-center gap-1"
                            title={`"${syn}" এর ভোকাবুলারিতে যান`}
                          >
                            <span>{syn}</span>
                            <ExternalLink size={10} className="opacity-60" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Antonyms */}
                    {item.antonyms && item.antonyms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-[11px] font-bold text-rose-800 font-bangla shrink-0">
                          বিপরীত (Antonyms):
                        </span>
                        {item.antonyms.map((ant, aIdx) => (
                          <button
                            key={aIdx}
                            type="button"
                            onClick={() => handleWordChipClick(ant)}
                            className="px-2 py-0.5 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-english transition-colors flex items-center gap-1"
                            title={`"${ant}" এর ভোকাবুলারিতে যান`}
                          >
                            <span>{ant}</span>
                            <ExternalLink size={10} className="opacity-60" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Standard Example Sentence */}
                <div className="p-3.5 bg-slate-50 rounded-2xl text-xs space-y-1.5 border border-slate-100">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-english font-medium text-slate-800 text-xs sm:text-sm leading-relaxed">
                      "{item.example}"
                    </div>
                    <AudioButton text={item.example} size="sm" />
                  </div>
                  {item.exampleBn && (
                    <div className="text-slate-500 font-bangla text-xs pt-1 border-t border-slate-200/50">
                      {item.exampleBn}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filteredWords.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-3xl border-2 border-dashed border-indigo-200 p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Sparkles size={24} />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <p className="text-slate-700 font-bold font-bangla text-base">
                  {searchTerm ? `"${searchTerm}" শব্দটি বর্তমানে তালিকায় নেই` : 'কোনো শব্দ পাওয়া যায়নি'}
                </p>
                <p className="text-xs text-slate-500 font-bangla">
                  আপনি কি এআই ডিকশনারি দিয়ে এই শব্দের সম্পূর্ণ অর্থ, পার্টস অফ স্পিচ রূপান্তর, সমার্থক ও বিপরীত শব্দ বের করতে চান?
                </p>
              </div>

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => handleAiLookupWord()}
                  disabled={aiLoading}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2 font-bangla"
                >
                  {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  <span>এআই দিয়ে "{searchTerm}" বিশ্লেষণ করুন</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Interactive Flashcard View */}
      {mode === 'flashcard' && currentCard && (
        <div className="max-w-xl mx-auto space-y-6 py-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-2 font-bangla">
            <span>
              কার্ড: <strong>{flashcardIdx + 1}</strong> / {filteredWords.length}
            </span>
            <span>ক্লিক করে কার্ডটি উল্টান (Click to Flip)</span>
          </div>

          {/* Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[360px] bg-white rounded-3xl border-2 border-indigo-200 shadow-xl p-6 sm:p-8 flex flex-col justify-between items-center text-center cursor-pointer hover:shadow-2xl hover:border-indigo-400 transition-all select-none relative"
          >
            <div className="w-full flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold font-english">
                {currentCard.unitId ? `Unit ${currentCard.unitId}` : 'AI Generated'} • {currentCard.partOfSpeech.toUpperCase()}
              </span>
              <div onClick={(e) => e.stopPropagation()}>
                <AudioButton text={currentCard.word} size="sm" />
              </div>
            </div>

            {!isFlipped ? (
              <div className="space-y-3 my-auto">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-english">
                  {currentCard.word}
                </div>
                {currentCard.phonetic && (
                  <div className="text-sm text-indigo-600 font-mono font-english font-medium">
                    {currentCard.phonetic}
                  </div>
                )}
                <div className="text-xs text-indigo-600 font-semibold pt-2 font-bangla">
                  (অর্থ ও রূপান্তর দেখতে চাপুন)
                </div>
              </div>
            ) : (
              <div className="space-y-4 my-auto w-full max-w-md animate-in fade-in duration-200">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700 font-bangla">
                    {currentCard.meaningBn}
                  </div>
                  {currentCard.meaningEn && (
                    <div className="text-xs text-slate-500 font-english mt-1">
                      {currentCard.meaningEn}
                    </div>
                  )}
                </div>

                {/* Forms summary */}
                {currentCard.forms && Object.values(currentCard.forms).some(Boolean) && (
                  <div className="p-2.5 bg-indigo-50/60 rounded-xl text-xs flex flex-wrap justify-center gap-1.5 font-english">
                    {currentCard.forms.noun && <span className="text-[11px] bg-white px-2 py-0.5 rounded border">N: <strong>{currentCard.forms.noun}</strong></span>}
                    {currentCard.forms.verb && <span className="text-[11px] bg-white px-2 py-0.5 rounded border">V: <strong>{currentCard.forms.verb}</strong></span>}
                    {currentCard.forms.adjective && <span className="text-[11px] bg-white px-2 py-0.5 rounded border">Adj: <strong>{currentCard.forms.adjective}</strong></span>}
                    {currentCard.forms.adverb && <span className="text-[11px] bg-white px-2 py-0.5 rounded border">Adv: <strong>{currentCard.forms.adverb}</strong></span>}
                  </div>
                )}

                {/* Example sentence */}
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-english border border-slate-100 text-left">
                  <div className="font-medium">"{currentCard.example}"</div>
                  {currentCard.exampleBn && (
                    <div className="text-slate-500 font-bangla mt-1">{currentCard.exampleBn}</div>
                  )}
                </div>
              </div>
            )}

            <div className="text-[11px] text-slate-400 font-bangla">
              {isFlipped ? 'মূল শব্দ দেখতে চাপুন' : 'বাংলা অর্থ ও রূপান্তর দেখতে চাপুন'}
            </div>
          </div>

          {/* Flashcard Controller */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrevCard}
              className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm transition-transform active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2 font-bangla"
            >
              <RotateCcw size={16} />
              <span>{isFlipped ? 'সামনের দিক' : 'উল্টে দেখুন'}</span>
            </button>

            <button
              type="button"
              onClick={handleNextCard}
              className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm transition-transform active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
