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

  // Update dynamic document.title and send analytics events on route changes
  useEffect(() => {
    let title = 'পঞ্চম শ্রেণি ইংরেজি পাঠশালা - English for Today ২০২৬ সম্পূর্ণ সমাধান';
    const activeUnit = unitsData.find((u) => u.id === activeUnitId);

    if (currentPage === 'unit' && activeUnit) {
      title = `Unit ${activeUnit.unitNumber}: ${activeUnit.title} (${activeUnit.titleBn}) - ৫ম শ্রেণি ইংরেজি`;
    } else if (currentPage === 'vocabulary') {
      title = 'শব্দভাণ্ডার ও ফ্ল্যাশ কার্ড (Vocabulary Bank) - ৫ম শ্রেণি ইংরেজি পাঠশালা';
    } else if (currentPage === 'grammar') {
      title = 'ব্যাকরণ সহায়িকা (Grammar & Language Focus) - ৫ম শ্রেণি ইংরেজি পাঠশালা';
    } else if (currentPage === 'practice') {
      title = 'অনুশীলন ল্যাব ও কুইজ পরীক্ষা (Quiz Lab) - ৫ম শ্রেণি ইংরেজি পাঠশালা';
    }

    document.title = title;

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
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 font-bangla space-y-2 mt-12">
        <p className="font-semibold text-slate-700">
          পঞ্চম শ্রেণি ইংরেজি পাঠশালা • English for Today (২০২৬ সংস্করণ)
        </p>
        <p>
          জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত পাঠ্যক্রম অবলম্বনে প্রস্তুতকৃত।
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
