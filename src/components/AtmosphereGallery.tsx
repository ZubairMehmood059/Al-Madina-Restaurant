import React, { useState } from 'react';
import { Maximize2, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { MediaPlaceholder } from './MediaPlaceholder';

export const AtmosphereGallery: React.FC = () => {
  const [activeItem, setActiveItem] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  return (
    <section id="gallery" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#787d74] block mb-2">
          ATMOSPHERE
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#151816] tracking-tight">
          Experience <span className="italic font-serif font-normal">Al Madina.</span>
        </h2>
      </div>

      {/* Grid: 6 Gallery Placeholders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative cursor-pointer rounded-3xl overflow-hidden aspect-[4/3] border border-[#e4ded0] bg-[#f0ece2] hover:border-[#272e2a] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
              <MediaPlaceholder
                id={item.id}
                label={item.title}
                dimensions={item.dimensions}
                className="w-full h-full"
                theme="warm"
                previewSrc={`/gallery/${item.id}.jpg`}
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#161a18]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-xs font-mono text-amber-200 uppercase tracking-widest mb-1">
                    {item.ratio} Aspect Ratio
                  </span>
                  <h4 className="text-base font-serif font-normal">{item.title}</h4>
                  <p className="text-xs text-[#d1d7d2] line-clamp-1">{item.subtitle}</p>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-300">
                    <Maximize2 size={12} />
                    <span>Inspect Media Slot</span>
                  </div>
                </div>
              </MediaPlaceholder>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="bg-[#1c201e] border border-[#313935] text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider">
                <Sparkles size={14} />
                <span>Media Slot Detail · {activeItem.id}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif">{activeItem.title}</h3>
              <p className="text-sm text-[#a3aba5]">{activeItem.subtitle}</p>

              {/* Large Placeholder Canvas */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-[#3b4440] bg-[#242b28] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                  <ImageIcon size={26} className="text-[#a8b1ab]" />
                </div>
                <span className="text-sm font-semibold tracking-wider uppercase text-white/90">
                  {activeItem.title}
                </span>
                <span className="text-xs font-mono text-amber-300 mt-1 bg-white/5 px-2.5 py-1 rounded">
                  Target Resolution: {activeItem.dimensions} ({activeItem.ratio})
                </span>
                <p className="text-xs text-[#8f9892] max-w-sm mt-3">
                  Designers: Drop your high-res photography into{' '}
                  <code className="text-white bg-black/40 px-1.5 py-0.5 rounded">/public/gallery/{activeItem.id}.jpg</code>
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-5 py-2.5 rounded-xl bg-white text-[#181c1a] text-xs font-semibold hover:bg-[#e4ded0] transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
