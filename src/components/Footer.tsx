import React from 'react';
import { Utensils, MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141715] text-[#dce2de] pt-16 pb-12 border-t border-[#232925]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Block (Matching Screenshot) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-14 border-b border-[#29302b]">
          
          {/* Brand & Tagline */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#272e2a] text-amber-200 flex items-center justify-center border border-white/10">
                <Utensils size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white uppercase leading-none font-sans">
                  AL MADINA
                </span>
                <span className="text-[9px] tracking-widest text-[#8a928c] uppercase font-sans mt-0.5">
                  RESTAURANT
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#cbd3cf] leading-relaxed">
              {RESTAURANT_INFO.tagline}
            </p>
          </div>

          {/* Quick Actions (WhatsApp & Call) */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-[#202623] hover:bg-[#2b332f] text-white text-xs font-semibold border border-[#38433d] transition-colors focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle size={16} className="text-emerald-400" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-[#202623] hover:bg-[#2b332f] text-white text-xs font-semibold border border-[#38433d] transition-colors focus-visible:ring-2 focus-visible:ring-white"
            >
              <Phone size={15} className="text-amber-300" aria-hidden="true" />
              <span>Call</span>
            </a>
          </div>

        </div>

        {/* Subfooter */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a2aca6]">
          <div>
            © 2026 Al Madina Restaurant. All rights reserved.
          </div>

          <div>
            Police Lines Quarters, Karachi, Pakistan
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="flex items-center gap-1.5 py-2 px-3 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white rounded-lg"
          >
            <span>Back to top</span>
            <ArrowUp size={13} aria-hidden="true" />
          </button>
        </div>

      </div>
    </footer>
  );
};
