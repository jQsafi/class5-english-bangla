import React, { useState } from 'react';
import { Search, Volume2, Languages, Layers, Sparkles, Filter, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { vocabularyData } from '../data/vocabularyData';
import { AudioButton } from '../components/AudioButton';

export const VocabularyPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [selectedPos, setSelectedPos] = useState<string>('all');
  const [mode, setMode] = useState<'list' | 'flashcard'>('list');
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredWords = vocabularyData.filter((v) => {
    const matchSearch =
      v.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.meaningBn.includes(searchTerm) ||
      v.meaningEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchUnit = selectedUnit === 'all' || v.unitId === selectedUnit;
    const matchPos = selectedPos === 'all' || v.partOfSpeech === selectedPos;
    return matchSearch && matchUnit && matchPos;
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold font-english backdrop-blur">
            <Languages size={14} />
            <span>VOCABULARY BANK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            পঞ্চম শ্রেণির ইংরেজি শব্দভাণ্ডার
          </h1>
          <p className="text-sm text-indigo-100">
            NCTB ২০২৬ পাঠ্যবইয়ের প্রতিটি ইউনিটের নির্বাচিত গুরুত্বপূর্ণ শব্দসমূহ, আন্তর্জাতিক ফোনেটিক উচ্চারণ, বাংলা অর্থ ও উদাহরণ বাক্য।
          </p>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="শব্দ বা বাংলা অর্থ দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
            />
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto justify-center">
            <button
              type="button"
              onClick={() => setMode('list')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
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
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1 text-slate-500 font-semibold">
            <Filter size={14} />
            <span>ফিল্টার:</span>
          </div>

          {/* Unit Filter */}
          <select
            value={selectedUnit}
            onChange={(e) =>
              setSelectedUnit(e.target.value === 'all' ? 'all' : parseInt(e.target.value))
            }
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="all">সকল ইউনিট (All Units)</option>
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
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="all">সকল পদ (All Parts of Speech)</option>
            <option value="noun">Noun (বিশেষ্য)</option>
            <option value="verb">Verb (ক্রিয়া)</option>
            <option value="adjective">Adjective (বিশেষণ)</option>
            <option value="adverb">Adverb (ক্রিয়াবিশেষণ)</option>
          </select>

          <span className="text-slate-400 ml-auto font-bangla">
            মোট প্রাপ্ত শব্দ: <strong className="text-indigo-600">{filteredWords.length}</strong>
          </span>
        </div>
      </div>

      {/* Mode 1: List Grid */}
      {mode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-english border border-indigo-100">
                    Unit {item.unitId}
                  </span>
                  <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-english">
                    {item.partOfSpeech}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 mt-2">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 font-english">
                      {item.word}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono font-english">
                      {item.phonetic}
                    </div>
                  </div>
                  <AudioButton text={item.word} size="md" />
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="text-base font-bold text-indigo-700 font-bangla">
                    {item.meaningBn}
                  </div>
                  <div className="text-xs text-slate-500 font-english mt-0.5">
                    {item.meaningEn}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-100">
                <div className="flex items-center justify-between font-english font-medium text-slate-800">
                  <span>"{item.example}"</span>
                  <AudioButton text={item.example} size="sm" />
                </div>
                <div className="text-slate-500 font-bangla">{item.exampleBn}</div>
              </div>
            </div>
          ))}

          {filteredWords.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-2">
              <p className="text-slate-500 font-medium">কোনো শব্দ পাওয়া যায়নি।</p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedUnit('all');
                  setSelectedPos('all');
                }}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Interactive Flashcard View */}
      {mode === 'flashcard' && currentCard && (
        <div className="max-w-xl mx-auto space-y-6 py-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-2">
            <span>
              কার্ড: <strong>{flashcardIdx + 1}</strong> / {filteredWords.length}
            </span>
            <span>ক্লিক করে কার্ডটি উল্টান (Click to Flip)</span>
          </div>

          {/* Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[300px] bg-white rounded-3xl border-2 border-indigo-200 shadow-xl p-8 flex flex-col justify-between items-center text-center cursor-pointer hover:shadow-2xl hover:border-indigo-400 transition-all select-none relative"
          >
            <div className="w-full flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold font-english">
                Unit {currentCard.unitId} • {currentCard.partOfSpeech.toUpperCase()}
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
                <div className="text-sm text-slate-400 font-mono font-english">
                  {currentCard.phonetic}
                </div>
                <div className="text-xs text-indigo-600 font-semibold pt-2">
                  (অর্থ দেখতে ক্লিক করুন)
                </div>
              </div>
            ) : (
              <div className="space-y-4 my-auto animate-in fade-in duration-200">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700 font-bangla">
                  {currentCard.meaningBn}
                </div>
                <div className="text-sm text-slate-600 font-english">
                  {currentCard.meaningEn}
                </div>
                <div className="p-3 bg-indigo-50/50 rounded-xl text-xs text-slate-700 font-english border border-indigo-100 max-w-md">
                  "{currentCard.example}"
                </div>
              </div>
            )}

            <div className="text-[11px] text-slate-400 font-bangla">
              {isFlipped ? 'মূল শব্দ দেখতে চাপুন' : 'বাংলা অর্থ দেখতে চাপুন'}
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
              className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
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
