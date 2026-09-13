import React, { useState } from 'react';
import { BookOpen, Sparkles, Languages, HelpCircle, Menu, X, Volume2, BookmarkCheck } from 'lucide-react';
import { speechService } from '../services/speechService';

interface NavbarProps {
  currentPage: 'home' | 'unit' | 'vocabulary' | 'grammar' | 'practice';
  onNavigate: (page: 'home' | 'vocabulary' | 'grammar' | 'practice') => void;
  onOpenAiTutor: () => void;
  completedCount: number;
  totalUnits: number;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAiTutor,
  completedCount,
  totalUnits,
  onToggleSidebar,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSlowAudio, setIsSlowAudio] = useState(speechService.getSlow());

  const toggleAudioSpeed = () => {
    const nextState = !isSlowAudio;
    setIsSlowAudio(nextState);
    speechService.setSlow(nextState);
  };

  const navItems = [
    { id: 'home', label: 'সকল ইউনিট', icon: BookOpen },
    { id: 'vocabulary', label: 'শব্দভাণ্ডার', icon: Languages },
    { id: 'grammar', label: 'ব্যাকরণ', icon: BookmarkCheck },
    { id: 'practice', label: 'কুইজ ল্যাব', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-indigo-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Unit Sidebar"
              >
                <Menu size={22} />
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform shrink-0">
                <span className="font-english text-base sm:text-lg tracking-wider">E5</span>
              </div>
              <div className="leading-tight">
                <div className="font-bold text-base sm:text-lg text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors flex items-center gap-1.5 font-bangla">
                  <span>৫ম শ্রেণি ইংরেজি</span>
                  <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-english">
                    2026
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs text-indigo-600 font-medium font-english">
                  English for Today
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all font-bangla ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-200/60 font-bold'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Audio Speed + AI Tutor */}
          <div className="flex items-center gap-2">
            {/* Speed Toggle */}
            <button
              type="button"
              onClick={toggleAudioSpeed}
              title={`উচ্চারণ গতি পরিবর্তন করুন (${isSlowAudio ? 'ধীর' : 'স্বাভাবিক'})`}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all font-bangla ${
                isSlowAudio
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Volume2 size={14} className={isSlowAudio ? 'text-amber-600' : 'text-slate-500'} />
              <span>{isSlowAudio ? 'ধীর অডিও' : 'স্বাভাবিক অডিও'}</span>
            </button>

            {/* AI Tutor Button */}
            <button
              type="button"
              onClick={onOpenAiTutor}
              className="flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-300 hover:shadow-lg hover:shadow-indigo-400 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles size={16} className="animate-spin text-amber-300" />
              <span className="hidden sm:inline">ইংলিশ বন্ধু</span>
              <span className="sm:hidden font-english">AI Tutor</span>
            </button>

            {/* Mobile menu toggle button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">অডিও উচ্চারণ গতি:</span>
            <button
              type="button"
              onClick={toggleAudioSpeed}
              className={`px-3 py-1 rounded-md text-xs font-semibold ${
                isSlowAudio ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {isSlowAudio ? 'ধীর অডিও' : 'স্বাভাবিক অডিও'}
            </button>
          </div>

          <div className="text-xs text-slate-400 pt-1 text-center font-bangla">
            সম্পন্ন ইউনিট: <span className="text-indigo-600 font-bold">{completedCount}</span> / {totalUnits}
          </div>
        </div>
      )}
    </header>
  );
};
