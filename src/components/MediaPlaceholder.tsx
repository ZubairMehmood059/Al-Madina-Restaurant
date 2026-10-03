import React, { useMemo, useState } from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

interface MediaPlaceholderProps {
  id: string;
  label: string;
  dimensions?: string;
  aspectRatio?: string;
  className?: string;
  theme?: 'warm' | 'dark' | 'amber';
  iconSize?: number;
  previewSrc?: string;
  children?: React.ReactNode;
}

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  id,
  label,
  dimensions = '800 x 600',
  className = '',
  theme = 'warm',
  iconSize = 22,
  previewSrc,
  children,
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const assetCandidates = useMemo(() => {
    const paths = previewSrc ? [previewSrc] : [];

    const folders = ['/assets', '/gallery'];
    const autoExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

    folders.forEach((folder) => {
      autoExtensions.forEach((ext) => {
        const candidate = `${folder}/${id}.${ext}`;
        if (!paths.includes(candidate)) {
          paths.push(candidate);
        }
      });
    });

    return paths;
  }, [id, previewSrc]);

  const currentSrc = assetCandidates[imageIndex] ?? assetCandidates[0];

  if (currentSrc && !imageFailed) {
    return (
      <div className={`relative overflow-hidden group ${className}`}>
        <img
          src={currentSrc}
          alt={label}
          referrerPolicy="no-referrer"
          onError={() => {
            if (imageIndex < assetCandidates.length - 1) {
              setImageIndex((prev) => prev + 1);
              return;
            }
            setImageFailed(true);
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {children}
      </div>
    );
  }

  const themeStyles = {
    warm: 'bg-[#ece9df] text-[#2c322d] border-[#dad4c4]',
    dark: 'bg-[#1c201e] text-[#d9e2db] border-[#2d3430]',
    amber: 'bg-[#f4ebe1] text-[#4d3826] border-[#ebdccb]',
  }[theme];

  return (
    <div
      data-placeholder-id={id}
      className={`relative flex flex-col items-center justify-center p-4 text-center select-none overflow-hidden transition-colors border ${themeStyles} ${className}`}
    >
      {/* Subtle geometric background motif */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-2 max-w-[90%]">
        <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center mb-1">
          <ImageIcon size={iconSize} className="opacity-80" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider line-clamp-1">
          {label}
        </span>

        <span className="text-[11px] font-mono tracking-tight text-[#454c46] dark:text-[#c4cec6] bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded font-medium">
          {dimensions}
        </span>

        <span className="text-[10px] tracking-tight text-[#525a53] dark:text-[#a8b3ac] flex items-center gap-1 mt-0.5 font-medium">
          <Sparkles size={10} /> Media Slot
        </span>
      </div>

      {/* Children overlays (such as category tag, rating pills, etc.) */}
      {children}
    </div>
  );
};
