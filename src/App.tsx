import React, { useState, useEffect } from 'react';
import { unitsData } from './data/unitsData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { UnitDetailPage } from './pages/UnitDetailPage';
import { VocabularyPage } from './pages/VocabularyPage';
import { GrammarPage } from './pages/GrammarPage';
import { PracticeQuizPage } from './pages/PracticeQuizPage';
import { AiTutorModal } from './components/AiTutorModal';

export const App: React.FC = () => {
  const [activeUnitId, setActiveUnitId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'unit' | 'vocabulary' | 'grammar' | 'practice'>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [completedUnits, setCompletedUnits] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('class5_english_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Handle URL hash changes for direct linking & back/forward navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#unit-')) {
        const uId = parseInt(hash.replace('#unit-', ''), 10);
        if (!isNaN(uId) && uId >= 1 && uId <= unitsData.length) {
          setActiveUnitId(uId);
          setCurrentPage('unit');
        }
      } else if (hash === '#vocabulary') {
        setCurrentPage('vocabulary');
        setActiveUnitId(null);
      } else if (hash === '#grammar') {
        setCurrentPage('grammar');
        setActiveUnitId(null);
      } else if (hash === '#practice') {
        setCurrentPage('practice');
        setActiveUnitId(null);
      } else {
        setCurrentPage('home');
        setActiveUnitId(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update dynamic document.title, meta tags, and send analytics events on route changes
  useEffect(() => {
    let title = '৫ম শ্রেণি ইংরেজি পাঠশালা | English for Today ২০২৬ সম্পূর্ণ সমাধান';
    let description =
      'NCTB পঞ্চম শ্রেণির নতুন ইংরেজি বইয়ের (English for Today 2026) ২০টি ইউনিটের পূর্ণাঙ্গ বাংলা অনুবাদ, অডিও সঠিক উচ্চারণ, শব্দভাণ্ডার, ব্যাকরণ ও সৃজনশীল পরীক্ষা ল্যাব।';
    const activeUnit = unitsData.find((u) => u.id === activeUnitId);

    if (currentPage === 'unit' && activeUnit) {
      title = `Unit ${activeUnit.unitNumber}: ${activeUnit.title} (${activeUnit.titleBn}) - ৫ম শ্রেণি ইংরেজি`;
      description = `Unit ${activeUnit.unitNumber}: ${activeUnit.title} (${activeUnit.titleBn}) এর পাঠ্যবইয়ের পূর্ণাঙ্গ বাংলা অনুবাদ, অডিও উচ্চারণ, শব্দার্থ, ব্যাকরণ ও সমাপনী পরীক্ষার সৃজনশীল প্রশ্ন সেট।`;
    } else if (currentPage === 'vocabulary') {
      title = 'শব্দভাণ্ডার ও ফ্ল্যাশ কার্ড (Vocabulary Bank) - ৫ম শ্রেণি ইংরেজি পাঠশালা';
      description =
        'পঞ্চম শ্রেণির ইংরেজি বইয়ের সব গুরুত্বপূর্ণ শব্দের অর্থ, আইপিএ ফোনেটিক্স, বাংলা উচ্চারণ, পদ রূপান্তর ও উদাহরণ বাক্য।';
    } else if (currentPage === 'grammar') {
      title = 'ব্যাকরণ সহায়িকা (Grammar & Language Focus) - ৫ম শ্রেণি ইংরেজি পাঠশালা';
      description =
        'পঞ্চম শ্রেণির ২০টি অধ্যায়ের ব্যাকরণ নিয়ম, বিরামচিহ্ন, বাক্যরীতি ও সহজ বাংলা ব্যাখ্যা ও উদাহরণ।';
    } else if (currentPage === 'practice') {
      title = 'অনুশীলন ল্যাব ও কুইজ পরীক্ষা (Quiz Lab) - ৫ম শ্রেণি ইংরেজি পাঠশালা';
      description =
        'পঞ্চম শ্রেণির ইংরেজি পরীক্ষার প্রস্তুতিতে এআই চালিত আনলিমিটেড বহুনির্বাচনী কুইজ ও তাৎক্ষণিক মূল্যায়ন ল্যাব।';
    }

    document.title = title;

    // Dynamically update meta tags for search engines & social previews
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', window.location.href);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', description);

    // Google Analytics & Google Tag Manager tracking
    if (typeof window !== 'undefined') {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_title: title,
          page_path: window.location.pathname + window.location.hash,
          page_location: window.location.href,
        });
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'pageview',
          page_title: title,
          page_path: window.location.pathname + window.location.hash,
          page_location: window.location.href,
        });
      }
    }
  }, [currentPage, activeUnitId]);

  const handleSelectUnit = (id: number) => {
    setActiveUnitId(id);
    setCurrentPage('unit');
    window.location.hash = `#unit-${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: 'home' | 'vocabulary' | 'grammar' | 'practice') => {
    setCurrentPage(page);
    setActiveUnitId(null);
    window.location.hash = page === 'home' ? '' : `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleComplete = (id: number) => {
    setCompletedUnits((prev) => {
      const next = prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id];
      try {
        localStorage.setItem('class5_english_completed', JSON.stringify(next));
      } catch (e) {
        console.error('LocalStorage write error:', e);
      }
      return next;
    });
  };

  const activeUnit = unitsData.find((u) => u.id === activeUnitId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-bangla text-slate-900 selection:bg-indigo-100 selection:text-indigo-800">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAiTutor={() => setAiTutorOpen(true)}
        completedCount={completedUnits.length}
        totalUnits={unitsData.length}
        onToggleSidebar={currentPage === 'unit' ? () => setSidebarOpen(!sidebarOpen) : undefined}
      />

      {/* Main Layout */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Sidebar on Unit View */}
        {currentPage === 'unit' && (
          <Sidebar
            units={unitsData}
            activeUnitId={activeUnitId}
            onSelectUnit={handleSelectUnit}
            completedUnits={completedUnits}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* Content Area */}
        <main className="flex-1 min-w-0 overflow-x-hidden min-h-[calc(100vh-4rem)]">
          {currentPage === 'home' && (
            <HomePage
              units={unitsData}
              onSelectUnit={handleSelectUnit}
              completedUnits={completedUnits}
              onToggleComplete={handleToggleComplete}
              onNavigate={handleNavigate}
              onOpenAiTutor={() => setAiTutorOpen(true)}
            />
          )}

          {currentPage === 'unit' && activeUnit && (
            <UnitDetailPage
              unit={activeUnit}
              totalUnits={unitsData.length}
              onSelectUnit={handleSelectUnit}
              isCompleted={completedUnits.includes(activeUnit.id)}
              onToggleComplete={handleToggleComplete}
              onGoHome={() => handleNavigate('home')}
              onOpenAiTutor={() => setAiTutorOpen(true)}
            />
          )}

          {currentPage === 'vocabulary' && <VocabularyPage />}

          {currentPage === 'grammar' && <GrammarPage />}

          {currentPage === 'practice' && <PracticeQuizPage />}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 font-bangla space-y-2.5 mt-12 no-print">
        <p className="font-semibold text-slate-700">
          ৫ম শ্রেণি ইংরেজি পাঠশালা • English for Today (২০২৬ সংস্করণ)
        </p>
        <p className="text-slate-500">
          জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত পাঠ্যক্রম অবলম্বনে প্রস্তুতকৃত।
        </p>
        <div className="pt-2 border-t border-slate-100 max-w-md mx-auto flex items-center justify-center gap-1.5 text-slate-600 flex-wrap">
          <span>পরিকল্পনা ও কারিগরি সহায়তায়:</span>
          <a
            href="https://jqsafi.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors font-english"
          >
            Shafayat Hossain
          </a>
        </div>
        <p className="text-[11px] text-slate-400">
          © {new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত • শিক্ষা ও জনকল্যাণে উন্মুক্ত
        </p>
      </footer>

      {/* AI Tutor Floating / Triggered Modal */}
      <AiTutorModal
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
        currentUnitTitle={activeUnit?.title}
      />
    </div>
  );
};

export default App;
