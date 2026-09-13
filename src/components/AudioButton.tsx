import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { speechService } from '../services/speechService';

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  className = '',
  size = 'md',
  label,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    speechService.speak(
      text,
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'px-3 py-2 text-base',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 20,
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      title="শুনুন (Audio pronunciation)"
      className={`inline-flex items-center gap-1.5 rounded-full transition-all duration-200 font-medium ${
        isPlaying
          ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-105 animate-pulse'
          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 active:scale-95'
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <VolumeX size={iconSizes[size]} className="animate-spin" />
      ) : (
        <Volume2 size={iconSizes[size]} className="text-indigo-600 hover:text-indigo-800" />
      )}
      {label && <span className="font-bangla">{isPlaying ? 'থামুন' : label}</span>}
    </button>
  );
};
