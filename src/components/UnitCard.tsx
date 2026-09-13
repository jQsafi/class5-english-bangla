import React from 'react';
import { BookOpen, CheckCircle, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { UnitData } from '../types/english';
import { AudioButton } from './AudioButton';

interface UnitCardProps {
  unit: UnitData;
  isCompleted: boolean;
  onSelect: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({
  unit,
  isCompleted,
  onSelect,
  onToggleComplete,
}) => {
  return (
    <div
      onClick={() => onSelect(unit.id)}
      className={`group relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden ${
        isCompleted
          ? 'border-emerald-200/80 shadow-sm bg-gradient-to-b from-emerald-50/20 to-white'
          : 'border-slate-200 shadow-sm hover:border-indigo-300'
      }`}
    >
      {/* Top Banner Stripe */}
      <div
        className={`h-2 w-full transition-colors ${
          isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
        }`}
      />

      <div className="p-5 flex-1 flex flex-col">
        {/* Header: Unit badge + Audio Preview + Complete button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold font-english bg-indigo-50 text-indigo-700 border border-indigo-100">
              Unit {unit.unitNumber}
            </span>
            <span className="text-xs text-slate-400 font-medium">পৃষ্ঠা {unit.pageRange}</span>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <AudioButton text={unit.title} size="sm" />
            <button
              type="button"
              onClick={() => onToggleComplete(unit.id)}
              title={isCompleted ? 'সম্পন্ন হিসেবে চিহ্নিত' : 'সম্পন্ন করুন'}
              className={`p-1.5 rounded-full transition-colors ${
                isCompleted
                  ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                  : 'text-slate-300 hover:text-slate-400 hover:bg-slate-50'
              }`}
            >
              <CheckCircle size={18} className={isCompleted ? 'fill-emerald-100' : ''} />
            </button>
          </div>
        </div>

        {/* Titles */}
        <h3 className="text-lg font-bold text-slate-800 font-english group-hover:text-indigo-600 transition-colors leading-snug">
          {unit.title}
        </h3>
        <h4 className="text-sm font-semibold text-slate-600 mb-2.5">
          {unit.titleBn}
        </h4>

        {/* Theme badge */}
        <div className="mb-3">
          <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
            {unit.themeBn}
          </span>
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
          {unit.summaryBn}
        </p>

        {/* Badges / Metrics */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <BookOpen size={13} className="text-indigo-500" />
              <span>{unit.sections.length}টি পাঠ</span>
            </span>
            <span className="flex items-center gap-1">
              <Sparkles size={13} className="text-amber-500" />
              <span>{unit.vocabulary.length} শব্দ</span>
            </span>
          </div>

          <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
            <span>পড়ুন</span>
            <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </div>
  );
};
