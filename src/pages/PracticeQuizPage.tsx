import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Sparkles,
  Bot,
  BookOpen,
  Loader2,
  AlertCircle,
  Flame,
  Check,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types/english';
import { quizzesData } from '../data/quizzesData';
import { AudioButton } from '../components/AudioButton';
import { generateQuizQuestions } from '../services/aiService';

const QUIZ_TOPICS = [
  { id: 'General Model Test', nameBn: 'সার্বিক মডেল টেস্ট (General Mix)' },
  { id: 'Tenses & Verb Forms', nameBn: 'কাল ও ক্রিয়া (Tenses & Verbs)' },
  { id: 'Vocabulary & Word Meanings', nameBn: 'শব্দভাণ্ডার ও অর্থ (Vocabulary)' },
  { id: 'Prepositions of Time & Place', nameBn: 'পদান্বয়ী অব্যয় (Prepositions)' },
  { id: 'Articles (A, An, The)', nameBn: 'আর্টিকেল (A, An, The)' },
  { id: 'Sentence Structure & Wh-Questions', nameBn: 'বাক্যরীতি ও Wh-প্রশ্ন' },
  { id: 'Punctuation & Capitalization', nameBn: 'বিরামচিহ্ন ও বড় হাতের অক্ষর' },
  { id: 'Number & Gender', nameBn: 'বচন ও লিঙ্গ (Number & Gender)' },
];

export const PracticeQuizPage: React.FC = () => {
  // Mode: 'curriculum' (textbook static) vs 'ai' (dynamic generated)
  const [quizMode, setQuizMode] = useState<'curriculum' | 'ai'>('ai');

  // Curriculum mode states
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');

  // AI mode generator params
  const [aiUnit, setAiUnit] = useState<number | 'all'>('all');
  const [aiTopic, setAiTopic] = useState<string>('General Model Test');
  const [aiCount, setAiCount] = useState<number>(5);
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Dynamic AI Questions State (initialized empty, or generated on demand)
  const [aiQuestions, setAiQuestions] = useState<QuizQuestion[]>([]);

  // Quiz Interaction States
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // Determine current active questions based on mode
  const activeQuestions: QuizQuestion[] =
    quizMode === 'curriculum'
      ? quizzesData.filter((q) => selectedUnit === 'all' || q.unitId === selectedUnit)
      : aiQuestions;

  // Handle generating fresh AI questions
  const handleGenerateAiQuiz = async (customParams?: {
    topic?: string;
    count?: number;
    unitId?: number | 'all';
    difficulty?: 'easy' | 'medium' | 'hard';
  }) => {
    setIsAiGenerating(true);
    setAiError(null);
    setSelectedAnswers({});
    setShowResults(false);

    const targetUnit = customParams?.unitId !== undefined ? customParams.unitId : aiUnit;
    const targetTopic = customParams?.topic || aiTopic;
    const targetCount = customParams?.count || aiCount;
    const targetDiff = customParams?.difficulty || aiDifficulty;

    try {
      const generated = await generateQuizQuestions({
        unitId: targetUnit,
        topic: targetTopic,
        count: targetCount,
        difficulty: targetDiff,
      });

      setAiQuestions(generated);
      setQuizMode('ai');
    } catch (err: any) {
      console.error(err);
      setAiError(err?.message || 'এআই প্রশ্ন তৈরিতে সাময়িক সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSelectOption = (questionId: string, option: string) => {
    if (showResults) return; // Prevent changing after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    activeQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setShowResults(true);
    const score = calculateScore();
    const ratio = score / (activeQuestions.length || 1);
    if (ratio >= 0.7) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const score = calculateScore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold font-english backdrop-blur">
            <HelpCircle size={14} />
            <span>PRACTICE LAB & DYNAMIC AI QUIZ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-bangla">
            অনুশীলন ল্যাব ও কুইজ পরীক্ষা
          </h1>
          <p className="text-sm text-emerald-100 font-bangla">
            পঞ্চম শ্রেণির ইংরেজি বইয়ের অধ্যায়ভিত্তিক অনুশীলন অথবা প্রতিবার এআই দিয়ে সম্পূর্ণ নতুন নতুন প্রশ্ন তৈরি করে পরীক্ষা দিন!
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="px-2.5 py-1 bg-white/10 rounded-lg border border-white/20">
              📚 পাঠ্যবইয়ের ২০টি অধ্যায়
            </span>
            <span className="px-2.5 py-1 bg-emerald-400/20 text-emerald-200 rounded-lg border border-emerald-400/30">
              🤖 সীমাহীন এআই প্রশ্ন জেনারেশন
            </span>
            <span className="px-2.5 py-1 bg-white/10 rounded-lg border border-white/20">
              🎉 তাৎক্ষণিক উত্তর যাচাই ও ফলাফল
            </span>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
        <button
          onClick={() => {
            setQuizMode('ai');
            handleReset();
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            quizMode === 'ai'
              ? 'bg-white text-indigo-700 shadow-sm border border-indigo-100'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bot size={17} className={quizMode === 'ai' ? 'text-indigo-600 animate-pulse' : ''} />
          <span className="font-bangla">এআই কুইজ ল্যাব (Dynamic AI Quiz)</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-700 font-english font-bold">
            নতুন
          </span>
        </button>

        <button
          onClick={() => {
            setQuizMode('curriculum');
            handleReset();
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            quizMode === 'curriculum'
              ? 'bg-white text-emerald-700 shadow-sm border border-emerald-100'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen size={16} />
          <span className="font-bangla">পাঠ্যবইয়ের নির্ধারিত কুইজ ({quizzesData.length}টি)</span>
        </button>
      </div>

      {/* AI Quiz Generator Control Box (Visible in AI Mode) */}
      {quizMode === 'ai' && (
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white rounded-3xl border-2 border-indigo-200 p-5 sm:p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-base font-bangla">
              <Sparkles size={18} className="text-indigo-600" />
              <span>এআই প্রশ্ন জেনারেটর (AI Question Generator)</span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold font-bangla">
              যতবার খুশি নতুন প্রশ্ন
            </span>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-slate-500 font-bangla flex items-center gap-1">
              <Zap size={13} className="text-amber-500" />
              <span>এক ক্লিকে দ্রুত পরীক্ষা শুরু করুন:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  handleGenerateAiQuiz({
                    topic: 'Tenses & Verb Forms',
                    count: 5,
                    difficulty: 'medium',
                  })
                }
                disabled={isAiGenerating}
                className="px-3 py-1.5 bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold font-bangla transition-all disabled:opacity-50"
              >
                🎯 ৫টি Tense প্রশ্ন
              </button>
              <button
                onClick={() =>
                  handleGenerateAiQuiz({
                    topic: 'Prepositions of Time & Place',
                    count: 5,
                    difficulty: 'medium',
                  })
                }
                disabled={isAiGenerating}
                className="px-3 py-1.5 bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold font-bangla transition-all disabled:opacity-50"
              >
                📍 ৫টি Preposition প্রশ্ন
              </button>
              <button
                onClick={() =>
                  handleGenerateAiQuiz({
                    topic: 'Articles (A, An, The)',
                    count: 5,
                    difficulty: 'medium',
                  })
                }
                disabled={isAiGenerating}
                className="px-3 py-1.5 bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold font-bangla transition-all disabled:opacity-50"
              >
                🔤 ৫টি Article প্রশ্ন
              </button>
              <button
                onClick={() =>
                  handleGenerateAiQuiz({
                    topic: 'Vocabulary & Word Meanings',
                    count: 5,
                    difficulty: 'medium',
                  })
                }
                disabled={isAiGenerating}
                className="px-3 py-1.5 bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold font-bangla transition-all disabled:opacity-50"
              >
                📖 ৫টি Vocabulary প্রশ্ন
              </button>
              <button
                onClick={() =>
                  handleGenerateAiQuiz({
                    topic: 'General Model Test',
                    count: 10,
                    difficulty: 'medium',
                  })
                }
                disabled={isAiGenerating}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold font-bangla shadow-sm transition-all disabled:opacity-50"
              >
                🌟 সার্বিক মডেল টেস্ট (১০টি প্রশ্ন)
              </button>
            </div>
          </div>

          {/* Custom Settings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {/* Unit Picker */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 font-bangla">অধ্যায় (Unit):</label>
              <select
                value={aiUnit}
                onChange={(e) =>
                  setAiUnit(e.target.value === 'all' ? 'all' : parseInt(e.target.value))
                }
                className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-xl text-xs text-slate-800 font-bangla focus:outline-none focus:border-indigo-500 shadow-sm"
              >
                <option value="all">সকল অধ্যায় (All Units)</option>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((u) => (
                  <option key={u} value={u}>
                    Unit {u}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic Picker */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 font-bangla">বিষয় (Topic):</label>
              <select
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-xl text-xs text-slate-800 font-bangla focus:outline-none focus:border-indigo-500 shadow-sm"
              >
                {QUIZ_TOPICS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nameBn}
                  </option>
                ))}
              </select>
            </div>

            {/* Question Count */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 font-bangla">প্রশ্নের সংখ্যা:</label>
              <select
                value={aiCount}
                onChange={(e) => setAiCount(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-xl text-xs text-slate-800 font-bangla focus:outline-none focus:border-indigo-500 shadow-sm"
              >
                <option value={5}>৫টি বহুনির্বাচনী প্রশ্ন</option>
                <option value={10}>১০টি বহুনির্বাচনী প্রশ্ন</option>
                <option value={15}>১৫টি পূর্ণাঙ্গ পরীক্ষা</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 font-bangla">কাঠিন্য মাত্রা:</label>
              <select
                value={aiDifficulty}
                onChange={(e) => setAiDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-xl text-xs text-slate-800 font-bangla focus:outline-none focus:border-indigo-500 shadow-sm"
              >
                <option value="easy">সহজ (Easy)</option>
                <option value="medium">মাঝারি (Medium)</option>
                <option value="hard">চ্যালেঞ্জিং (Challenging)</option>
              </select>
            </div>
          </div>

          {/* Main Generate Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => handleGenerateAiQuiz()}
              disabled={isAiGenerating}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-indigo-200 transition-all active:scale-95"
            >
              {isAiGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span className="font-bangla">নতুন প্রশ্ন তৈরি হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span className="font-bangla">
                    {aiQuestions.length === 0
                      ? 'নতুন এআই প্রশ্ন তৈরি করুন'
                      : 'আবার সম্পূর্ণ নতুন প্রশ্ন তৈরি করুন'}
                  </span>
                </>
              )}
            </button>

            {aiQuestions.length > 0 && (
              <span className="text-xs text-indigo-700 font-semibold font-bangla">
                ✨ {aiQuestions.length}টি নতুন এআই প্রশ্ন প্রস্তুত আছে
              </span>
            )}
          </div>

          {/* Error Message */}
          {aiError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2 font-bangla">
              <AlertCircle size={16} className="text-rose-600 shrink-0" />
              <span>{aiError}</span>
            </div>
          )}
        </div>
      )}

      {/* Curriculum Control Bar (Visible in Curriculum Mode) */}
      {quizMode === 'curriculum' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold font-bangla">অধ্যায় নির্বাচন:</span>
            <select
              value={selectedUnit}
              onChange={(e) => {
                setSelectedUnit(e.target.value === 'all' ? 'all' : parseInt(e.target.value));
                handleReset();
              }}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:border-indigo-500 font-bangla"
            >
              <option value="all">সকল অধ্যায় (All 20 Units)</option>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((u) => (
                <option key={u} value={u}>
                  Unit {u}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600 font-bangla">
              উত্তর দেওয়া হয়েছে: <strong>{totalAnswered}</strong> / {activeQuestions.length}
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="পুনরায় শুরু করুন"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      )}

      {/* AI Empty State Prompt (When in AI mode but no questions generated yet) */}
      {quizMode === 'ai' && aiQuestions.length === 0 && !isAiGenerating && (
        <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-indigo-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Bot size={36} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 font-bangla">
              আপনার পছন্দের বিষয়ে নতুন এআই পরীক্ষা শুরু করুন
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-bangla max-w-md mx-auto">
              উপরে "নতুন এআই প্রশ্ন তৈরি করুন" অথবা যেকোনো দ্রুত বিষয়ের বাটনে চাপুন। এআই তাৎক্ষণিক স্বতন্ত্র বহুনির্বাচনী প্রশ্ন সেট তৈরি করে দেবে!
            </p>
          </div>
          <button
            onClick={() => handleGenerateAiQuiz()}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all font-bangla inline-flex items-center gap-2"
          >
            <Sparkles size={16} />
            <span>এখনই ৫টি প্রশ্ন তৈরি করুন</span>
          </button>
        </div>
      )}

      {/* Score Summary Card (When submitted) */}
      {showResults && (
        <div className="bg-white rounded-3xl border-2 border-emerald-400 p-6 sm:p-8 shadow-xl text-center space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Award size={36} />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900 font-bangla">
              তোমার ফলাফল: <span className="text-emerald-600 font-english">{score}</span> /{' '}
              <span className="font-english">{activeQuestions.length}</span>
            </h3>
            <p className="text-sm font-semibold text-slate-600 font-bangla">
              {score / activeQuestions.length >= 0.8
                ? 'দারুণ! তুমি অসাধারণ প্রস্তুতি নিয়েছ! 🎉🏆'
                : score / activeQuestions.length >= 0.5
                ? 'ভালো চেষ্টা! ভুলগুলো দেখে নিয়ে আবার অনুশীলন করো! 💪'
                : 'মন খারাপ কোরো না! ব্যাখ্যাগুলো পড়ে নিয়ে আবার পরীক্ষা দাও! 📚'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {quizMode === 'ai' ? (
              <button
                type="button"
                onClick={() => handleGenerateAiQuiz()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all font-bangla"
              >
                <Sparkles size={16} />
                <span>সম্পূর্ণ নতুন প্রশ্ন নিয়ে আবার পরীক্ষা দাও</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all font-bangla"
              >
                <RotateCcw size={16} />
                <span>আবার পরীক্ষা দাও</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all font-bangla"
            >
              <span>এই প্রশ্নের উত্তরগুলো পুনরায় চেষ্টা করুন</span>
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      {activeQuestions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-bangla">
              {quizMode === 'ai' ? '🤖 এআই দ্বারা তৈরিকৃত প্রশ্নসমূহ:' : '📚 পাঠ্যবইয়ের প্রশ্নসমূহ:'}
            </span>
            <span className="text-xs font-semibold text-slate-500 font-bangla">
              সম্পন্ন হয়েছে: <strong className="text-slate-800 font-english">{totalAnswered}</strong> /{' '}
              <span className="font-english">{activeQuestions.length}</span>
            </span>
          </div>

          {activeQuestions.map((q, idx) => {
            const userAnswer = selectedAnswers[q.id];
            const isAnswered = Boolean(userAnswer);
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm transition-all space-y-3 ${
                  showResults
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : 'border-rose-300 bg-rose-50/20'
                    : 'border-slate-200 hover:border-indigo-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 font-english">
                        Question {idx + 1}
                      </span>
                      {q.unitId && (
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full font-english">
                          Unit {q.unitId}
                        </span>
                      )}
                      {q.source === 'ai' && (
                        <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100 font-bangla flex items-center gap-1">
                          <Sparkles size={11} />
                          এআই তৈরি
                        </span>
                      )}
                      {q.difficulty && (
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-english">
                          • {q.difficulty}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-english pt-1 leading-snug">
                      {q.question}
                    </h3>
                    {q.questionBn && (
                      <h4 className="text-xs sm:text-sm text-slate-600 font-bangla font-medium">
                        {q.questionBn}
                      </h4>
                    )}
                  </div>
                  <AudioButton text={q.question} size="sm" />
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = userAnswer === opt;
                    let optionStyle =
                      'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300';

                    if (showResults) {
                      if (opt === q.correctAnswer) {
                        optionStyle =
                          'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-200';
                      } else if (isSelected && !isCorrect) {
                        optionStyle =
                          'bg-rose-100 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-200';
                      } else {
                        optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle =
                        'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold shadow-sm ring-2 ring-indigo-100';
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        disabled={showResults}
                        onClick={() => handleSelectOption(q.id, opt)}
                        className={`p-3.5 rounded-xl border text-sm font-medium text-left transition-all flex items-center justify-between gap-2 ${optionStyle}`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-6 h-6 rounded-full bg-white/80 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0 font-english">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="font-english truncate">{opt}</span>
                        </div>
                        {showResults && opt === q.correctAnswer && (
                          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                        )}
                        {showResults && isSelected && !isCorrect && (
                          <XCircle size={18} className="text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation after submit */}
                {showResults && (
                  <div className="mt-3 p-3.5 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-slate-200 font-bangla">
                    <div className="font-bold flex items-center gap-1.5">
                      {isCorrect ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <Check size={14} /> সঠিক উত্তর!
                        </span>
                      ) : (
                        <span className="text-rose-700 flex items-center gap-1">
                          <XCircle size={14} /> সঠিক উত্তর ছিল: <strong className="font-english">{q.correctAnswer}</strong>
                        </span>
                      )}
                    </div>
                    {(q.explanationBn || q.explanation) && (
                      <div className="text-slate-700 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-100">
                        <strong>💡 ব্যাখ্যা: </strong>
                        {q.explanationBn || q.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Submit Action Floating Bar */}
      {!showResults && activeQuestions.length > 0 && (
        <div className="sticky bottom-4 z-20 flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={totalAnswered === 0}
            className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-base shadow-xl shadow-indigo-300 hover:shadow-indigo-400 transition-all active:scale-95 flex items-center gap-2 font-bangla"
          >
            <span>ফলাফল দেখুন</span>
            <span className="font-english">
              ({totalAnswered} / {activeQuestions.length} সম্পন্ন)
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
