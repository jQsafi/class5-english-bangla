import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Volume2,
  Languages,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  Printer,
  ChevronLeft,
  ChevronRight,
  Share2,
  GraduationCap,
  PenTool,
  FileText,
  Check,
  X,
  Loader2,
  Bot,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Award,
  AlertCircle
} from 'lucide-react';
import { UnitData, CreativeExamPassage } from '../types/english';
import { AudioButton } from '../components/AudioButton';
import { speechService } from '../services/speechService';
import { creativeExamsData } from '../data/creativeExamsData';
import { generateCreativeExam } from '../services/aiService';

interface UnitDetailPageProps {
  unit: UnitData;
  totalUnits: number;
  onSelectUnit: (id: number) => void;
  isCompleted: boolean;
  onToggleComplete: (id: number) => void;
  onGoHome: () => void;
  onOpenAiTutor: () => void;
}

export const UnitDetailPage: React.FC<UnitDetailPageProps> = ({
  unit,
  totalUnits,
  onSelectUnit,
  isCompleted,
  onToggleComplete,
  onGoHome,
  onOpenAiTutor,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'vocabulary' | 'grammar' | 'creative' | 'qa'>('text');
  const [showBengali, setShowBengali] = useState(true);

  // Creative Exam State
  const defaultExam =
    creativeExamsData.find((e) => e.unitId === unit.id) || creativeExamsData[0];
  const [activeExam, setActiveExam] = useState<CreativeExamPassage>(defaultExam);
  const [isAiExamLoading, setIsAiExamLoading] = useState(false);
  const [aiExamError, setAiExamError] = useState<string | null>(null);
  const [showExamPassageBn, setShowExamPassageBn] = useState(false);

  // Creative Exam Interactive states
  const [revealedMatching, setRevealedMatching] = useState(false);
  const [userTfAnswers, setUserTfAnswers] = useState<Record<number, boolean>>({});
  const [showTfResults, setShowTfResults] = useState(false);
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  const [revealedComposition, setRevealedComposition] = useState(false);
  const [studentWriting, setStudentWriting] = useState('');

  // Reset creative exam whenever active unit changes
  useEffect(() => {
    const found =
      creativeExamsData.find((e) => e.unitId === unit.id) || creativeExamsData[0];
    setActiveExam(found);
    setRevealedMatching(false);
    setUserTfAnswers({});
    setShowTfResults(false);
    setRevealedQuestions({});
    setRevealedComposition(false);
    setStudentWriting('');
    setAiExamError(null);
  }, [unit.id]);

  // Handle generating fresh AI Creative Exam
  const handleGenerateAiExam = async (type: 'seen' | 'unseen') => {
    setIsAiExamLoading(true);
    setAiExamError(null);

    try {
      const generated = await generateCreativeExam({
        unitId: unit.id,
        unitTitle: unit.title,
        passageType: type,
      });

      setActiveExam(generated);
      setRevealedMatching(false);
      setUserTfAnswers({});
      setShowTfResults(false);
      setRevealedQuestions({});
      setRevealedComposition(false);
      setStudentWriting('');
    } catch (err: any) {
      console.error(err);
      setAiExamError(err?.message || 'এআই সৃজনশীল প্রশ্নপত্র তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsAiExamLoading(false);
    }
  };

  const handlePlayFullUnit = () => {
    const allText = unit.sections
      .map((s) => {
        let text = s.bodyText || '';
        if (s.dialogues) {
          text += ' ' + s.dialogues.map((d) => `${d.speaker}: ${d.text}`).join(' ');
        }
        return text;
      })
      .join(' ');

    if (allText) {
      speechService.speak(allText);
    }
  };

  const toggleQuestionReveal = (idx: number) => {
    setRevealedQuestions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleSetTfAnswer = (idx: number, val: boolean) => {
    setUserTfAnswers((prev) => ({
      ...prev,
      [idx]: val,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 space-y-6">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between no-print">
        <button
          type="button"
          onClick={onGoHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>সকল ইউনিটে ফিরে যান</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold font-english">
            {unit.id} / {totalUnits}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={unit.id <= 1}
              onClick={() => onSelectUnit(unit.id - 1)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
              title="পূর্ববর্তী অধ্যায়"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              disabled={unit.id >= totalUnits}
              onClick={() => onSelectUnit(unit.id + 1)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
              title="পরবর্তী অধ্যায়"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Unit Hero Card */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold font-english uppercase tracking-wider backdrop-blur">
                Unit {unit.id}
              </span>
              <span className="text-xs text-indigo-200 font-medium font-bangla">
                বইয়ের পৃষ্ঠা: {unit.pageRange}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onToggleComplete(unit.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur transition-all ${
                isCompleted
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <CheckCircle2 size={14} />
              <span>{isCompleted ? 'সম্পন্ন হয়েছে' : 'সম্পন্ন করুন'}</span>
            </button>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-english">
              {unit.title}
            </h1>
            <h2 className="text-lg sm:text-xl font-medium text-indigo-100 font-bangla">
              {unit.titleBn}
            </h2>
          </div>

          <p className="text-sm text-indigo-100/90 max-w-2xl leading-relaxed font-bangla">
            {unit.summaryBn}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 no-print">
            <button
              type="button"
              onClick={handlePlayFullUnit}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-indigo-900 font-bold text-xs sm:text-sm shadow-md hover:bg-indigo-50 transition-colors"
            >
              <Volume2 size={16} className="text-indigo-600" />
              <span>সম্পূর্ণ পাঠ শুনুন (Listen All)</span>
            </button>

            <button
              type="button"
              onClick={() => setShowBengali(!showBengali)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur transition-colors font-bangla"
            >
              {showBengali ? <EyeOff size={15} /> : <Eye size={15} />}
              <span>{showBengali ? 'বাংলা অনুবাদ লুকান' : 'বাংলা অনুবাদ দেখুন'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenAiTutor}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs sm:text-sm transition-transform hover:scale-105 active:scale-95 font-bangla"
            >
              <Sparkles size={15} className="text-indigo-900" />
              <span>এআই শিক্ষককে প্রশ্ন করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center border-b border-slate-200 gap-1 overflow-x-auto no-scrollbar no-print">
        {[
          { id: 'text', label: 'মূল পাঠ ও সংলাপ (Read & Listen)', icon: BookOpen },
          { id: 'vocabulary', label: `শব্দার্থ (${unit.vocabulary.length})`, icon: Languages },
          { id: 'grammar', label: 'গ্রামার সহায়িকা (Grammar)', icon: Sparkles },
          { id: 'creative', label: 'সৃজনশীল পরীক্ষা (Creative Exam)', icon: GraduationCap, badge: 'মডেল টেস্ট' },
          { id: 'qa', label: `কুইজ মূল্যায়ন (${unit.quizzes.length})`, icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Icon size={16} />
              <span className="font-bangla">{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold bg-indigo-100 text-indigo-700 rounded-full font-bangla">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Text & Dialogues */}
      {activeTab === 'text' && (
        <div className="space-y-6">
          {unit.sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-bold text-indigo-600 font-english">
                    Section {section.id}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 font-english">
                    {section.title}
                  </h3>
                  <h4 className="text-xs sm:text-sm text-slate-500 font-medium font-bangla">
                    {section.titleBn}
                  </h4>
                </div>
                {section.bodyText && <AudioButton text={section.bodyText} size="sm" />}
              </div>

              {/* Story / Narrative Body Text */}
              {section.bodyText && (
                <div className="space-y-2.5">
                  <div className="p-4 bg-slate-50 rounded-xl font-english text-slate-800 text-base leading-relaxed whitespace-pre-line border border-slate-100">
                    {section.bodyText}
                  </div>
                  {showBengali && section.bodyTextBn && (
                    <div className="p-4 bg-indigo-50/50 rounded-xl text-slate-700 text-sm leading-relaxed whitespace-pre-line border border-indigo-100/60 font-bangla">
                      <div className="text-xs font-bold text-indigo-700 mb-1 flex items-center gap-1 font-bangla">
                        <Languages size={13} />
                        <span>বাংলা অনুবাদ:</span>
                      </div>
                      {section.bodyTextBn}
                    </div>
                  )}
                </div>
              )}

              {/* Dialogues List */}
              {section.dialogues && (
                <div className="space-y-3">
                  {section.dialogues.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3 group hover:bg-indigo-50/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 font-english">
                        {d.speaker.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-sm text-slate-900 font-english">
                            {d.speaker}
                          </span>
                          <span className="text-xs text-slate-400 font-bangla font-medium">
                            ({d.speakerBn})
                          </span>
                        </div>
                        <div className="text-sm text-slate-800 font-english leading-relaxed">
                          {d.text}
                        </div>
                        {showBengali && (
                          <div className="text-xs text-slate-500 font-bangla mt-1">
                            {d.textBn}
                          </div>
                        )}
                      </div>
                      <AudioButton text={d.text} size="sm" />
                    </div>
                  ))}
                </div>
              )}

              {/* Q&A List inside section */}
              {section.qaList && (
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-english">
                    প্রশ্নোত্তর ও উত্তর (Comprehension Q&A)
                  </div>
                  {section.qaList.map((qa, qaIdx) => (
                    <div
                      key={qaIdx}
                      className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-100"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-bold text-sm text-slate-800 font-english">
                            Q{qaIdx + 1}: {qa.question}
                          </div>
                          {showBengali && (
                            <div className="text-xs text-slate-500 font-bangla">
                              {qa.questionBn}
                            </div>
                          )}
                        </div>
                        <AudioButton text={qa.question} size="sm" />
                      </div>

                      <div className="p-3 bg-white rounded-lg border border-slate-100 space-y-1">
                        <div className="text-sm font-medium text-emerald-800 font-english">
                          <span className="font-bold">Ans: </span>
                          {qa.answer}
                        </div>
                        {showBengali && (
                          <div className="text-xs text-slate-600 font-bangla">
                            {qa.answerBn}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Vocabulary */}
      {activeTab === 'vocabulary' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {unit.vocabulary.map((vocab) => (
              <div
                key={vocab.id}
                className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900 font-english">
                        {vocab.word}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 font-english">
                        {vocab.partOfSpeech}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5 font-english">
                      {vocab.phonetic}
                    </div>
                  </div>
                  <AudioButton text={vocab.word} size="md" />
                </div>

                <div className="p-2.5 bg-indigo-50/50 rounded-xl">
                  <div className="text-sm font-bold text-indigo-950 font-bangla">
                    {vocab.meaningBn}
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-english">
                  Meaning: {vocab.meaningEn}
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-100">
                  <div className="flex items-center justify-between text-slate-800 font-english font-medium">
                    <span>"{vocab.example}"</span>
                    <AudioButton text={vocab.example} size="sm" />
                  </div>
                  <div className="text-slate-500 font-bangla">{vocab.exampleBn}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Grammar */}
      {activeTab === 'grammar' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 no-print">
            <div>
              <div className="text-xs font-bold text-indigo-700 font-bangla">এই ইউনিটের ব্যাকরণ নিয়ম</div>
              <div className="text-xs text-slate-500 font-bangla">আরও ১০০টি পূর্ণাঙ্গ ব্যাকরণ বিষয় পড়তে ব্যাকরণ ল্যাব দেখুন</div>
            </div>
            <a
              href="#grammar"
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold font-bangla flex items-center gap-1 shadow-sm transition-all"
            >
              <span>১০০টি ব্যাকরণ দেখুন</span>
              <ChevronRight size={14} />
            </a>
          </div>

          {unit.grammar.map((rule) => (
            <div
              key={rule.id}
              className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-indigo-600 font-english uppercase tracking-wider">
                  Grammar & Language Focus
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-english">{rule.title}</h3>
                <h4 className="text-sm font-semibold text-slate-600 font-bangla">{rule.titleBn}</h4>
              </div>

              {rule.formula && (
                <div className="p-3 bg-purple-50/80 rounded-xl border border-purple-100">
                  <div className="text-[11px] font-bold text-purple-900 uppercase font-bangla mb-1">
                    📐 গঠন কাঠামো / সূত্র:
                  </div>
                  <div className="text-xs font-mono font-semibold text-purple-950 bg-white/80 px-3 py-1.5 rounded-lg border border-purple-200 overflow-x-auto">
                    {rule.formula}
                  </div>
                </div>
              )}

              <div className="p-4 bg-indigo-50/60 rounded-xl text-slate-800 text-sm leading-relaxed border border-indigo-100 font-bangla">
                {rule.explanationBn}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-bangla">
                  উদাহরণ (Examples):
                </div>
                {rule.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 font-english">{ex.en}</div>
                      <div className="text-xs text-slate-600 font-bangla mt-0.5">{ex.bn}</div>
                      {ex.note && (
                        <div className="text-xs text-indigo-600 font-medium mt-1 italic font-bangla">
                          Tip: {ex.note}
                        </div>
                      )}
                    </div>
                    <AudioButton text={ex.en} size="sm" />
                  </div>
                ))}
              </div>

              {rule.commonMistakes && rule.commonMistakes.length > 0 && (
                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 space-y-2 text-xs">
                  <div className="font-bold text-rose-800 font-bangla">⚠️ সাধারণ ভুল ও সঠিক রূপ:</div>
                  {rule.commonMistakes.map((m, mIdx) => (
                    <div key={mIdx} className="bg-white p-2.5 rounded-lg border border-rose-100 space-y-1">
                      <div className="font-english">
                        <span className="text-rose-600 font-bold">❌ </span>
                        <span className="line-through text-slate-600">{m.incorrect}</span>
                        <span className="mx-2 font-bold text-emerald-700">➜ ✅ {m.correct}</span>
                      </div>
                      <div className="text-slate-600 font-bangla text-[11px]">💡 {m.reasonBn || m.reason}</div>
                    </div>
                  ))}
                </div>
              )}

              {rule.tips && (
                <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-900 border border-amber-200 font-medium font-bangla">
                  💡 <strong>বিশেষ পরামর্শ:</strong> {rule.tips}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Creative Exam Lab (সৃজনশীল প্রশ্ন ও প্যাসেজ অনুশীলন) */}
      {activeTab === 'creative' && activeExam && (
        <div className="space-y-6">
          {/* Top Generator & Print Control Bar */}
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-emerald-50 rounded-2xl border-2 border-indigo-200 p-4 sm:p-5 shadow-sm space-y-3 no-print">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={20} className="text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900 font-bangla">
                    পঞ্চম শ্রেণির চূড়ান্ত পরীক্ষার আদলে সৃজনশীল প্রশ্নপত্র
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-bangla mt-0.5">
                  জাতীয় প্রাথমিক শিক্ষা সমাপনী সিলেবাস অনুযায়ী প্যাসেজ, কলাম মিলকরণ, সত্য/মিথ্যা, সংক্ষিপ্ত প্রশ্ন ও অনুচ্ছেদ রচনা।
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold font-bangla flex items-center gap-1.5 shadow-sm transition-all"
                  title="প্রশ্নপত্রটি প্রিন্ট করুন"
                >
                  <Printer size={15} />
                  <span>প্রিন্ট করুন</span>
                </button>
              </div>
            </div>

            {/* AI Generation Buttons */}
            <div className="pt-2 border-t border-indigo-100/80 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-600 font-bangla flex items-center gap-1">
                  <Bot size={14} className="text-indigo-600" />
                  নতুন এআই প্রশ্নপত্র তৈরি:
                </span>
                <button
                  type="button"
                  onClick={() => handleGenerateAiExam('seen')}
                  disabled={isAiExamLoading}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold font-bangla flex items-center gap-1.5 shadow-sm transition-all"
                >
                  {isAiExamLoading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                  <span>নতুন Seen Passage সৃজনশীল</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleGenerateAiExam('unseen')}
                  disabled={isAiExamLoading}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold font-bangla flex items-center gap-1.5 shadow-sm transition-all"
                >
                  {isAiExamLoading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                  <span>নতুন Unseen Passage সৃজনশীল</span>
                </button>
              </div>

              {activeExam.source === 'ai' && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bangla flex items-center gap-1">
                  <Check size={12} /> এআই প্রশ্নপত্র সক্রিয়
                </span>
              )}
            </div>

            {aiExamError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2 font-bangla">
                <AlertCircle size={15} className="text-rose-600 shrink-0" />
                <span>{aiExamError}</span>
              </div>
            )}
          </div>

          {/* Reading Passage Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 font-english uppercase">
                    {activeExam.passageType === 'seen' ? 'Seen Passage' : 'Unseen Passage'}
                  </span>
                  <span className="text-xs text-slate-500 font-bangla">
                    নম্বর: ৩১ • সময়: ৩৫ মিনিট
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-english">
                  {activeExam.passageTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2 no-print">
                <button
                  type="button"
                  onClick={() => setShowExamPassageBn(!showExamPassageBn)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold font-bangla flex items-center gap-1 transition-colors"
                >
                  {showExamPassageBn ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{showExamPassageBn ? 'বাংলা অনুবাদ লুকান' : 'বাংলা অনুবাদ দেখুন'}</span>
                </button>
                <AudioButton text={activeExam.passageText} size="sm" />
              </div>
            </div>

            <div className="text-xs font-bold text-indigo-900 uppercase font-english">
              Read the text carefully and answer questions 1, 2, 3, and 4:
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl font-english text-slate-800 text-base leading-relaxed whitespace-pre-line border border-slate-100 shadow-inner">
              {activeExam.passageText}
            </div>

            {showExamPassageBn && activeExam.passageTextBn && (
              <div className="p-4 bg-indigo-50/60 rounded-xl text-slate-700 text-sm leading-relaxed whitespace-pre-line border border-indigo-100 font-bangla">
                <div className="text-xs font-bold text-indigo-700 mb-1 flex items-center gap-1">
                  <Languages size={13} />
                  <span>অনুচ্ছেদের বাংলা ভাবার্থ:</span>
                </div>
                {activeExam.passageTextBn}
              </div>
            )}
          </div>

          {/* Question 1: Match Column A with Column B (5 Marks) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 font-english uppercase">
                  Question 1 • Marks: 5
                </span>
                <h4 className="text-base font-bold text-slate-900 font-english">
                  1. Match the words in Column A with their meanings in Column B.
                </h4>
                <p className="text-xs text-slate-500 font-bangla">
                  কলাম A-এর শব্দগুলোর সাথে কলাম B-এর সঠিক অর্থ মিল করো।
                </p>
              </div>

              <button
                type="button"
                onClick={() => setRevealedMatching(!revealedMatching)}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold font-bangla transition-colors no-print"
              >
                {revealedMatching ? 'নমুনা উত্তর লুকান' : 'নমুনা উত্তর দেখুন'}
              </button>
            </div>

            {/* Two Column Table Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Column A */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-xl font-english">
                  Column A (Words)
                </div>
                {activeExam.matching.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-english flex items-center justify-between"
                  >
                    <span>
                      <strong className="text-indigo-700">({String.fromCharCode(97 + idx)})</strong> {item.word}
                    </span>
                    <AudioButton text={item.word} size="sm" />
                  </div>
                ))}
              </div>

              {/* Column B */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-xl font-english">
                  Column B (Meanings)
                </div>
                {activeExam.matching.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-english"
                  >
                    <strong className="text-purple-700">({['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'][idx]})</strong> {item.meaning}
                  </div>
                ))}
                {activeExam.matching[0]?.distractors?.map((distractor, dIdx) => (
                  <div
                    key={`d-${dIdx}`}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-english text-slate-600"
                  >
                    <strong className="text-purple-700">({['vi', 'vii', 'viii'][dIdx]})</strong> {distractor}
                  </div>
                ))}
              </div>
            </div>

            {/* Revealed Answer Box */}
            {revealedMatching && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 font-bangla animate-fade-in">
                <div className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1 font-english">
                  <Check size={14} /> Model Answer for Question 1:
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm font-english text-emerald-950">
                  {activeExam.matching.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="font-bold">({String.fromCharCode(97 + idx)}) + ({['i', 'ii', 'iii', 'iv', 'v'][idx]}):</span>
                      <span>{item.word} = {item.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Question 2: True or False (6 Marks) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 font-english uppercase">
                  Question 2 • Marks: 6
                </span>
                <h4 className="text-base font-bold text-slate-900 font-english">
                  2. Write 'True' for correct statement or 'False' for incorrect statement. If false, give the correct answer.
                </h4>
                <p className="text-xs text-slate-500 font-bangla">
                  বাক্যটি সত্য হলে 'True' এবং মিথ্যা হলে 'False' লেখো। মিথ্যা হলে সঠিক বাক্যটি লেখো।
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowTfResults(!showTfResults)}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold font-bangla transition-colors no-print"
              >
                {showTfResults ? 'উত্তর লুকান' : 'সকল উত্তর দেখুন'}
              </button>
            </div>

            <div className="space-y-3">
              {activeExam.trueFalse.map((item, idx) => {
                const userAns = userTfAnswers[idx];
                const isAnswered = userAns !== undefined;
                const isUserCorrect = userAns === item.isTrue;

                return (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-slate-900 font-english">
                          <strong className="text-indigo-700">({String.fromCharCode(97 + idx)})</strong> {item.statement}
                        </div>
                        {item.statementBn && (
                          <div className="text-xs text-slate-500 font-bangla">
                            {item.statementBn}
                          </div>
                        )}
                      </div>
                      <AudioButton text={item.statement} size="sm" />
                    </div>

                    {/* Self-check buttons */}
                    <div className="flex items-center gap-2 pt-1 no-print">
                      <button
                        type="button"
                        onClick={() => handleSetTfAnswer(idx, true)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          userAns === true
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        True
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetTfAnswer(idx, false)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          userAns === false
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        False
                      </button>

                      {isAnswered && (
                        <span
                          className={`text-xs font-bold font-bangla px-2 py-0.5 rounded-md ${
                            isUserCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isUserCorrect ? '✅ সঠিক!' : '❌ ভুল হয়েছে'}
                        </span>
                      )}
                    </div>

                    {/* Reveal Answer */}
                    {(showTfResults || isAnswered) && (
                      <div className="pt-2 border-t border-slate-200/80 text-xs space-y-1">
                        <div className="font-bold text-slate-800 font-english">
                          Answer:{' '}
                          <span
                            className={
                              item.isTrue ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'
                            }
                          >
                            {item.isTrue ? 'True' : 'False'}
                          </span>
                        </div>
                        {!item.isTrue && item.correctAnswer && (
                          <div className="text-emerald-800 font-english bg-emerald-50/80 p-2 rounded-lg border border-emerald-200">
                            <strong>Correct Answer: </strong>
                            {item.correctAnswer}
                          </div>
                        )}
                        <div className="text-slate-600 font-bangla">
                          💡 <strong>ব্যাখ্যা: </strong>
                          {item.explanationBn}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question 3: Answer Short Questions (10 Marks, 5x2) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 font-english uppercase">
                  Question 3 • Marks: 10 (5 × 2)
                </span>
                <h4 className="text-base font-bold text-slate-900 font-english">
                  3. Answer the following questions in 1-2 complete sentences.
                </h4>
                <p className="text-xs text-slate-500 font-bangla">
                  নিচের প্রশ্নগুলোর উত্তর ১-২টি পূর্ণাঙ্গ বাক্যে লেখো।
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {activeExam.shortQuestions.map((q, idx) => {
                const isRevealed = Boolean(revealedQuestions[idx]);

                return (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-slate-900 font-english">
                          <strong className="text-indigo-700">({String.fromCharCode(97 + idx)})</strong> {q.question}
                          <span className="text-xs font-semibold text-slate-400 font-english ml-2">[2 marks]</span>
                        </div>
                        {q.questionBn && (
                          <div className="text-xs text-slate-500 font-bangla">
                            {q.questionBn}
                          </div>
                        )}
                      </div>
                      <AudioButton text={q.question} size="sm" />
                    </div>

                    <div className="flex items-center justify-between pt-1 no-print">
                      <button
                        type="button"
                        onClick={() => toggleQuestionReveal(idx)}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 font-bangla flex items-center gap-1"
                      >
                        {isRevealed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        <span>{isRevealed ? 'নমুনা উত্তর লুকান' : 'নমুনা উত্তর দেখুন'}</span>
                      </button>
                    </div>

                    {isRevealed && (
                      <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-1.5 animate-fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-900 uppercase font-english">
                            Model Answer:
                          </span>
                          <AudioButton text={q.modelAnswer} size="sm" />
                        </div>
                        <div className="text-sm font-bold text-emerald-950 font-english">
                          {q.modelAnswer}
                        </div>
                        <div className="text-xs text-slate-600 font-bangla pt-0.5">
                          {q.modelAnswerBn}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question 4: Short Composition / Guided Writing (10 Marks) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 font-english uppercase">
                  Question 4 • Marks: 10
                </span>
                <h4 className="text-base font-bold text-slate-900 font-english">
                  4. Short Composition: {activeExam.composition.title}
                </h4>
                <p className="text-xs text-slate-500 font-bangla">
                  {activeExam.composition.titleBn} সম্পর্কে কমপক্ষে ৫টি বাক্যে একটি অনুচ্ছেদ লেখো।
                </p>
              </div>

              <button
                type="button"
                onClick={() => setRevealedComposition(!revealedComposition)}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold font-bangla transition-colors no-print"
              >
                {revealedComposition ? 'নমুনা রচনা লুকান' : 'নমুনা রচনা দেখুন'}
              </button>
            </div>

            {/* Guiding Questions Box */}
            <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100 space-y-2">
              <div className="text-xs font-bold text-purple-900 uppercase tracking-wider font-bangla">
                নিচের নির্দেশক প্রশ্নগুলোর উত্তরের মাধ্যমে ৫টি বাক্য তৈরি করো:
              </div>
              <ul className="space-y-1 text-xs text-purple-950 font-english list-decimal list-inside">
                {activeExam.composition.guidingQuestions.map((gq, gIdx) => (
                  <li key={gIdx} className="leading-relaxed">
                    {gq}
                  </li>
                ))}
              </ul>
            </div>

            {/* Student Typing / Scratchpad */}
            <div className="space-y-1.5 no-print">
              <label className="text-xs font-bold text-slate-600 font-bangla">
                তোমার উত্তর এখানে লিখে অনুশীলন করতে পারো:
              </label>
              <textarea
                rows={4}
                value={studentWriting}
                onChange={(e) => setStudentWriting(e.target.value)}
                placeholder="Write your 5 sentences here in English..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-english focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
              />
            </div>

            {/* Model Composition Box */}
            {revealedComposition && (
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3 animate-fade-in">
                <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase font-english">
                      Model Paragraph (নমুনা অনুচ্ছেদ)
                    </span>
                    <h5 className="text-sm font-bold text-emerald-950 font-english">
                      {activeExam.composition.title}
                    </h5>
                  </div>
                  <AudioButton text={activeExam.composition.modelParagraph} size="sm" />
                </div>

                <div className="text-sm text-emerald-950 font-english leading-relaxed">
                  {activeExam.composition.modelParagraph}
                </div>

                <div className="p-3 bg-white/80 rounded-xl text-xs text-slate-700 font-bangla leading-relaxed border border-emerald-100">
                  <strong>বাংলা অনুবাদ: </strong>
                  {activeExam.composition.modelParagraphBn}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: QA / Quizzes */}
      {activeTab === 'qa' && (
        <div className="space-y-4">
          {unit.quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-600 font-english uppercase">
                    অধ্যায় মূল্যায়ন কুইজ
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-english">
                    {quiz.question}
                  </h3>
                  {quiz.questionBn && (
                    <h4 className="text-xs text-slate-500 font-bangla">{quiz.questionBn}</h4>
                  )}
                </div>
                <AudioButton text={quiz.question} size="sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {quiz.options.map((opt, optIdx) => (
                  <div
                    key={optIdx}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      opt === quiz.correctAnswer
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-english">{opt}</span>
                      {opt === quiz.correctAnswer && (
                        <span className="text-xs text-emerald-700 font-bold font-bangla">
                          ✓ সঠিক উত্তর
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100 font-bangla">
                <strong>ব্যাখ্যা: </strong>
                {quiz.explanationBn || quiz.explanation}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="pt-6 border-t border-slate-200 flex items-center justify-between no-print">
        {unit.id > 1 ? (
          <button
            type="button"
            onClick={() => onSelectUnit(unit.id - 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors font-bangla"
          >
            <ChevronLeft size={16} />
            <span>পূর্ববর্তী অধ্যায়</span>
          </button>
        ) : (
          <div />
        )}

        {unit.id < totalUnits ? (
          <button
            type="button"
            onClick={() => onSelectUnit(unit.id + 1)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors font-bangla"
          >
            <span>পরবর্তী অধ্যায়</span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors font-bangla"
          >
            <span>সবগুলো অধ্যায় সম্পন্ন!</span>
          </button>
        )}
      </div>
    </div>
  );
};
