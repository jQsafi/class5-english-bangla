import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, Volume2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { quizzesData } from '../data/quizzesData';
import { AudioButton } from '../components/AudioButton';

export const PracticeQuizPage: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const filteredQuizzes = quizzesData.filter(
    (q) => selectedUnit === 'all' || q.unitId === selectedUnit
  );

  const handleSelectOption = (questionId: string, option: string) => {
    if (showResults) return; // Prevent changing after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    filteredQuizzes.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setShowResults(true);
    const score = calculateScore();
    const ratio = score / (filteredQuizzes.length || 1);
    if (ratio >= 0.7) {
      confetti({
        particleCount: 100,
        spread: 70,
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
            <span>PRACTICE & QUIZ LAB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            অনুশীলন ল্যাব ও কুইজ পরীক্ষা
          </h1>
          <p className="text-sm text-emerald-100">
            পঞ্চম শ্রেণির ইংরেজি বইয়ের অধ্যায়ভিত্তিক বহুনির্বাচনী প্রশ্ন, তাৎক্ষণিক উত্তর যাচাই ও বিস্তারিত বাংলা ব্যাখ্যা।
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">অধ্যায় নির্বাচন:</span>
          <select
            value={selectedUnit}
            onChange={(e) => {
              setSelectedUnit(e.target.value === 'all' ? 'all' : parseInt(e.target.value));
              handleReset();
            }}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="all">সকল অধ্যায় (All Units)</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((u) => (
              <option key={u} value={u}>
                Unit {u}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-600 font-bangla">
            উত্তর দেওয়া হয়েছে: <strong>{totalAnswered}</strong> / {filteredQuizzes.length}
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="পুনরায় শুরু করুন"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Score Summary Card (When submitted) */}
      {showResults && (
        <div className="bg-white rounded-2xl border-2 border-emerald-300 p-6 shadow-lg text-center space-y-3 animate-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Award size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            তোমার ফলাফল: <span className="text-emerald-600 font-english">{score}</span> / {filteredQuizzes.length}
          </h3>
          <p className="text-sm text-slate-600 font-bangla">
            {score / filteredQuizzes.length >= 0.8
              ? 'দারুণ! তুমি খুব ভালো প্রস্তুতি নিয়েছ! 🎉'
              : 'ভালো চেষ্টা! ভুলগুলো দেখে নিয়ে আবার অনুশীলন করো! 💪'}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors"
          >
            <RotateCcw size={16} />
            <span>আবার পরীক্ষা দাও</span>
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuizzes.map((q, idx) => {
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
                  <span className="text-xs font-bold text-indigo-600 font-english">
                    Unit {q.unitId} • Question {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-english">
                    {q.question}
                  </h3>
                  {q.questionBn && (
                    <h4 className="text-xs text-slate-500 font-bangla">{q.questionBn}</h4>
                  )}
                </div>
                <AudioButton text={q.question} size="sm" />
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = userAnswer === opt;
                  let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                  if (showResults) {
                    if (opt === q.correctAnswer) {
                      optionStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                    } else {
                      optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold shadow-sm';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, opt)}
                      className={`p-3 rounded-xl border text-sm font-medium text-left transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <span className="font-english">{opt}</span>
                      {showResults && opt === q.correctAnswer && (
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      )}
                      {showResults && isSelected && !isCorrect && (
                        <XCircle size={16} className="text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submit */}
              {showResults && (
                <div className="mt-3 p-3.5 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-200 font-bangla">
                  <div className="font-bold text-slate-800">
                    {isCorrect ? '✅ সঠিক উত্তর!' : '❌ সঠিক উত্তর ছিল: ' + q.correctAnswer}
                  </div>
                  <div className="text-slate-600 leading-relaxed">
                    <strong>ব্যাখ্যা: </strong>
                    {q.explanationBn || q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Action */}
      {!showResults && filteredQuizzes.length > 0 && (
        <div className="sticky bottom-4 z-20 flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={totalAnswered === 0}
            className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-base shadow-xl shadow-indigo-300 hover:shadow-indigo-400 transition-all active:scale-95"
          >
            ফলাফল দেখুন ({totalAnswered} / {filteredQuizzes.length} সম্পন্ন)
          </button>
        </div>
      )}
    </div>
  );
};
