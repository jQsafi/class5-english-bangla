import React, { useState } from 'react';
import { CheckCircle2, Search, X, BookCheck, ChevronRight } from 'lucide-react';
import { UnitData } from '../types/english';

interface SidebarProps {
  units: UnitData[];
  activeUnitId: number | null;
  onSelectUnit: (id: number) => void;
  completedUnits: number[];
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  units,
  activeUnitId,
  onSelectUnit,
  completedUnits,
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUnits = units.filter(
    (u) =>
      u.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.titleBn.includes(searchTerm) ||
      u.unitNumber.toString() === searchTerm
  );

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BookCheck size={18} className="text-indigo-600" />
            <span>সূচিপত্র (Units)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">মোট ২০টি অধ্যায় • NCTB ২০২৬</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-slate-100">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="ইউনিট খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Units List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredUnits.map((u) => {
          const isActive = u.id === activeUnitId;
          const isDone = completedUnits.includes(u.id);

          return (
            <button
              key={u.id}
              onClick={() => {
                onSelectUnit(u.id);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'text-slate-700 hover:bg-indigo-50/70 hover:text-indigo-700'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {u.unitNumber}
                </span>
                <div className="truncate">
                  <div className="truncate text-xs font-medium font-english">
                    {u.title}
                  </div>
                  <div className={`truncate text-xs ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {u.titleBn}
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1">
                {isDone ? (
                  <CheckCircle2
                    size={16}
                    className={isActive ? 'text-amber-300' : 'text-emerald-500'}
                  />
                ) : (
                  <ChevronRight
                    size={14}
                    className={isActive ? 'text-indigo-200' : 'text-slate-300'}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-80 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
