import React, { useState } from 'react';
import {
  BookOpen,
  Languages,
  BookmarkCheck,
  HelpCircle,
  Sparkles,
  Search,
  CheckCircle2,
  Trophy,
  Volume2,
  Flame,
  ArrowRight
} from 'lucide-react';
import { UnitData } from '../types/english';
import { UnitCard } from '../components/UnitCard';

interface HomePageProps {
  units: UnitData[];
  onSelectUnit: (id: number) => void;
  completedUnits: number[];
  onToggleComplete: (id: number) => void;
  onNavigate: (page: 'vocabulary' | 'grammar' | 'practice') => void;
  onOpenAiTutor: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  units,
  onSelectUnit,
  completedUnits,
  onToggleComplete,
  onNavigate,
  onOpenAiTutor,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUnits = units.filter(
    (u) =>
      u.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.titleBn.includes(searchTerm) ||
      u.themeBn.includes(searchTerm) ||
      u.unitNumber.toString() === searchTerm
  );

  const percent = Math.round((completedUnits.length / units.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 text-white shadow-2xl p-6 sm:p-10">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-xs sm:text-sm font-bold backdrop-blur border border-white/20">
            <Sparkles size={15} className="text-amber-300" />
            <span>স্বাগতম বন্ধু! NCTB ২০২৬ নতুন পাঠ্যক্রম অনুসারে</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            পঞ্চম শ্রেণি ইংরেজি পাঠশালা
          </h1>

          <p className="text-base sm:text-lg text-indigo-100/90 leading-relaxed font-bangla">
            <span className="font-english font-semibold text-white">English for Today</span> বইয়ের ২০টি ইউনিটের পূর্ণাঙ্গ বাংলা অনুবাদ, অডিও সঠিক উচ্চারণ, সমৃদ্ধ শব্দভাণ্ডার, ব্যাকরণ নিয়মাবলী ও স্মার্ট এআই শিক্ষক।
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur border border-white/10">
              <div className="text-2xl font-extrabold font-english text-amber-300">২০টি</div>
              <div className="text-xs text-indigo-200">সম্পূর্ণ ইউনিট</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur border border-white/10">
              <div className="text-2xl font-extrabold font-english text-emerald-300">১০০%</div>
              <div className="text-xs text-indigo-200">অডিও উচ্চারণ</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur border border-white/10">
              <div className="text-2xl font-extrabold font-english text-sky-300">শব্দার্থ</div>
              <div className="text-xs text-indigo-200">ফ্ল্যাশ কার্ডসহ</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur border border-white/10">
              <div className="text-2xl font-extrabold font-english text-pink-300">২৪/৭</div>
              <div className="text-xs text-indigo-200">এআই ইংলিশ বন্ধু</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Trophy size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              তোমার পড়ার অগ্রগতি (Learning Progress)
            </h3>
            <p className="text-xs text-slate-500">
              ২০টি ইউনিটের মধ্যে <strong>{completedUnits.length}টি</strong> সম্পন্ন হয়েছে ({percent}%)
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full sm:w-64 flex items-center gap-3">
          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-700 font-english">{percent}%</span>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => onNavigate('vocabulary')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all text-left group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Languages size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
              শব্দভাণ্ডার ও ফ্ল্যাশ কার্ড
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              সব অধ্যায়ের ইংরেজি শব্দার্থ, আন্তর্জাতিক উচ্চারণ ও ইন্টারঅ্যাক্টিভ ফ্ল্যাশ কার্ড।
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('grammar')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all text-left group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookmarkCheck size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
              ব্যাকরণ সহায়িকা (Grammar)
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              সিলেবল স্ট্রেস, কালেক্টিভ নাউন, মোডাল ভার্ব ও সহজ ব্যাকরণ নিয়মাবলী।
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('practice')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all text-left group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <HelpCircle size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
              অনুশীলন ও কুইজ ল্যাব
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              অধ্যায়ভিত্তিক বহুনির্বাচনী প্রশ্ন, তাত্ক্ষণিক ফলাফল ও কনফেটি উদযাপন।
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={onOpenAiTutor}
          className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all text-left group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md shadow-indigo-300">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="font-bold text-indigo-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <span>ইংলিশ বন্ধু</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-800 font-english font-bold">
                AI Tutor
              </span>
            </h4>
            <p className="text-xs text-indigo-700/80 mt-1 leading-relaxed">
              যেকোনো ইংরেজি প্রশ্ন, অর্থ বা প্যারাগ্রাফ লেখার জন্য সার্বক্ষণিক বন্ধু।
            </p>
          </div>
        </button>
      </div>

      {/* Units Section Header & Search */}
      <div className="pt-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen size={24} className="text-indigo-600" />
              <span>বইয়ের সকল অধ্যায় (All 20 Units)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              পাঠ শুরু করতে যেকোনো ইউনিটে ক্লিক করুন
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="ইউনিটের নাম দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 shadow-sm"
            />
          </div>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredUnits.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              isCompleted={completedUnits.includes(unit.id)}
              onSelect={onSelectUnit}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>

        {filteredUnits.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-2">
            <p className="text-slate-500 font-medium">
              "{searchTerm}" দিয়ে কোনো অধ্যায় খুঁজে পাওয়া যায়নি।
            </p>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="text-xs text-indigo-600 font-bold hover:underline"
            >
              সকল অধ্যায় দেখান
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
