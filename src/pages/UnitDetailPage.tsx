import React, { useState } from 'react';
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
  Share2
} from 'lucide-react';
import { UnitData } from '../types/english';
import { AudioButton } from '../components/AudioButton';
import { speechService } from '../services/speechService';

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
  const [showBengali, setShowBengali] = useState(true);
  const [activeTab, setActiveTab] = useState<'text' | 'vocabulary' | 'grammar' | 'qa'>('text');

  const handleSpeakAll = () => {
    // Combine text from sections to speak
    const fullText = unit.sections
      .map((s) => {
        if (s.dialogues) {
          return s.dialogues.map((d) => `${d.speaker} says: ${d.text}`).join('. ');
        }
        return s.bodyText || '';
      })
      .join('. ');
    speechService.speak(fullText);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 space-y-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>সকল ইউনিটে ফিরে যান</span>
        </button>

        <div className="flex items-center gap-2">
          {unit.id > 1 && (
            <button
              type="button"
              onClick={() => onSelectUnit(unit.id - 1)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
              title="পূর্ববর্তী ইউনিট"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          <span className="text-xs font-bold text-slate-500 font-english">
            {unit.id} / {totalUnits}
          </span>
          {unit.id < totalUnits && (
            <button
              type="button"
              onClick={() => onSelectUnit(unit.id + 1)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
              title="পরবর্তী ইউনিট"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Unit Header Card */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-white/20 text-white font-bold text-xs font-english tracking-wide backdrop-blur">
                UNIT {unit.unitNumber}
              </span>
              <span className="text-xs text-indigo-200 font-medium">বইয়ের পৃষ্ঠা: {unit.pageRange}</span>
            </div>

            <button
              type="button"
              onClick={() => onToggleComplete(unit.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isCompleted
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-white/10 hover:bg-white/20 text-indigo-100'
              }`}
            >
              <CheckCircle2 size={15} />
              <span>{isCompleted ? 'সম্পন্ন হয়েছে' : 'সম্পন্ন করুন'}</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-english tracking-tight">
            {unit.title}
          </h1>
          <h2 className="text-lg sm:text-xl font-bold text-indigo-200">
            {unit.titleBn}
          </h2>

          <p className="text-sm text-indigo-100/90 max-w-2xl leading-relaxed pt-1">
            {unit.summaryBn}
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleSpeakAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-indigo-800 font-bold text-xs sm:text-sm shadow-md hover:bg-indigo-50 active:scale-95 transition-all"
            >
              <Volume2 size={16} className="text-indigo-600" />
              <span>সম্পূর্ণ পাঠ শুনুন (Listen All)</span>
            </button>

            <button
              type="button"
              onClick={() => setShowBengali(!showBengali)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur transition-colors"
            >
              {showBengali ? <EyeOff size={15} /> : <Eye size={15} />}
              <span>{showBengali ? 'বাংলা অনুবাদ লুকান' : 'বাংলা অনুবাদ দেখুন'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenAiTutor}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs sm:text-sm transition-transform hover:scale-105 active:scale-95"
            >
              <Sparkles size={15} className="text-indigo-900" />
              <span>এআই শিক্ষককে প্রশ্ন করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center border-b border-slate-200 gap-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'text', label: 'মূল পাঠ ও সংলাপ (Read & Listen)', icon: BookOpen },
          { id: 'vocabulary', label: `শব্দার্থ (${unit.vocabulary.length})`, icon: Languages },
          { id: 'grammar', label: 'গ্রামার সহায়িকা (Grammar)', icon: Sparkles },
          { id: 'qa', label: `প্রশ্নোত্তর (${unit.quizzes.length})`, icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
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
                  <h4 className="text-xs sm:text-sm text-slate-500 font-medium">
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
                      <div className="text-xs font-bold text-indigo-700 mb-1 flex items-center gap-1">
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
                          {d.speakerBn && (
                            <span className="text-xs text-slate-400">({d.speakerBn})</span>
                          )}
                        </div>
                        <div className="text-base text-slate-800 font-english leading-relaxed">
                          {d.text}
                        </div>
                        {showBengali && (
                          <div className="text-xs text-indigo-900/80 font-bangla mt-1">
                            {d.textBn}
                          </div>
                        )}
                      </div>
                      <AudioButton text={d.text} size="sm" />
                    </div>
                  ))}
                </div>
              )}

              {/* Section QA List */}
              {section.qaList && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    প্রশ্নাভ্যাস ও উত্তর (Comprehension Q&A)
                  </div>
                  {section.qaList.map((qa, qIdx) => (
                    <div
                      key={qIdx}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-sm text-slate-900 font-english">
                            Q{qIdx + 1}: {qa.question}
                          </div>
                          {qa.questionBn && (
                            <div className="text-xs text-slate-500">{qa.questionBn}</div>
                          )}
                        </div>
                        <AudioButton text={qa.question + '. ' + qa.answer} size="sm" />
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-100 text-sm text-emerald-800 font-medium font-english">
                        <span className="font-bold text-emerald-700">Ans: </span>
                        {qa.answer}
                        {showBengali && qa.answerBn && (
                          <div className="text-xs text-slate-600 font-bangla mt-1 font-normal">
                            {qa.answerBn}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bullets if any */}
              {section.bullets && (
                <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-1.5">
                  <div className="text-xs font-bold text-indigo-800 mb-2">লক্ষ্যণীয় নিয়মাবলী:</div>
                  {section.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="text-sm text-indigo-950 font-english flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{b}</span>
                      <AudioButton text={b} size="sm" />
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
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-indigo-900">এই অধ্যায়ের শব্দভাণ্ডার</h3>
              <p className="text-xs text-indigo-700">প্রতিটি শব্দের উচ্চারণ শুনতে স্পিকার বাটনে ক্লিক করো।</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unit.vocabulary.map((vocab) => (
              <div
                key={vocab.id}
                className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-sm space-y-2 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900 font-english">
                      {vocab.word}
                    </span>
                    <span className="text-xs text-slate-400 font-mono font-english">
                      {vocab.phonetic}
                    </span>
                  </div>
                  <AudioButton text={vocab.word} size="sm" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase bg-slate-100 text-slate-600 font-english">
                    {vocab.partOfSpeech}
                  </span>
                  <span className="text-sm font-bold text-indigo-700 font-bangla">
                    {vocab.meaningBn}
                  </span>
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

              <div className="p-4 bg-indigo-50/60 rounded-xl text-slate-800 text-sm leading-relaxed border border-indigo-100 font-bangla">
                {rule.explanationBn}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
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
                        <div className="text-xs text-indigo-600 font-medium mt-1 italic">
                          Tip: {ex.note}
                        </div>
                      )}
                    </div>
                    <AudioButton text={ex.en} size="sm" />
                  </div>
                ))}
              </div>

              {rule.tips && (
                <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-900 border border-amber-200 font-medium">
                  💡 <strong>বিশেষ পরামর্শ:</strong> {rule.tips}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Practice Quizzes */}
      {activeTab === 'qa' && (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h3 className="font-bold text-sm text-indigo-900">অধ্যায় মূল্যায়ন কুইজ</h3>
            <p className="text-xs text-indigo-700">প্রশ্নের সঠিক উত্তর নির্বাচন করো।</p>
          </div>

          {unit.quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-english">{quiz.question}</h4>
                  {quiz.questionBn && (
                    <div className="text-xs text-slate-500 mt-0.5 font-bangla">{quiz.questionBn}</div>
                  )}
                </div>
                <AudioButton text={quiz.question} size="sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {quiz.options.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      opt === quiz.correctAnswer
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
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
      <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
        {unit.id > 1 ? (
          <button
            type="button"
            onClick={() => onSelectUnit(unit.id - 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors"
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
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors"
          >
            <span>পরবর্তী অধ্যায়</span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
          >
            <span>সবগুলো অধ্যায় সম্পন্ন!</span>
          </button>
        )}
      </div>
    </div>
  );
};
