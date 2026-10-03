import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Salam! I want to enquire about dishes and ordering at Al Madina Restaurant.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Quick Greeting Bubble */}
      {showTooltip && (
        <div className="bg-[#171b19] text-white text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
          <span>Need help or want to order? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-white"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Floating Action Circle */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-[#181c1a] text-emerald-400 hover:bg-[#27302b] flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95 border border-[#3b453f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} className="text-emerald-400" aria-hidden="true" />
      </a>
    </div>
  );
};
