import React from 'react';
import { MessageCircle, ExternalLink, Star } from 'lucide-react';
import { MediaPlaceholder } from './MediaPlaceholder';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Salam! I would like to check the menu and place an order at Al Madina Restaurant.'
  )}`;

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-7">
            {/* Status Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#303631]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>OPEN 24 HOURS</span>
              <span aria-hidden="true">·</span>
              <span>KARACHI</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-[#141715] leading-[1.08] text-balance">
              Good food.{' '}
              <span className="italic font-serif font-normal text-[#222724]">Warmly</span>
              <br />
              served.
            </h1>

            {/* Editorial Lead Subtitle */}
            <p className="text-base sm:text-lg text-[#323933] leading-relaxed max-w-xl">
              Al Madina Restaurant brings a relaxed place to eat, meet and enjoy
              familiar flavors in Police Lines Quarters, Karachi.
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[44px] text-sm font-semibold text-white bg-[#181c1a] hover:bg-[#2e3531] rounded-full transition-all shadow-sm active:scale-95 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#181c1a]"
              >
                <MessageCircle size={17} className="text-emerald-400" />
                <span>Order on WhatsApp</span>
              </a>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 min-h-[44px] text-sm font-semibold text-[#181c1a] hover:text-[#38413a] hover:underline transition-colors whitespace-nowrap group focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#181c1a]"
              >
                <span>Get directions</span>
                <ExternalLink size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Social Proof Row */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#3b433d] pt-1">
              <div className="flex items-center gap-1">
                <Star size={15} className="fill-amber-500 text-amber-500" />
                <span className="font-bold text-[#181c1a] tabular-nums">4.4</span>
                <span className="text-[#454d47] font-medium">(16 reviews)</span>
              </div>
              <span aria-hidden="true">·</span>
              <span className="font-medium">Police Lines Quarters</span>
            </div>
          </div>

          {/* Right Column: Visual Bento Composition (Placeholders) */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              
              {/* Card 1: Featured Dish / Biryani Platter */}
              <div className="relative rounded-3xl overflow-hidden shadow-sm aspect-[4/5] sm:aspect-[3/4] border border-[#e3dfd3] bg-[#f2efe6]">
                <MediaPlaceholder
                  id="hero-biryani"
                  label="Hero Dish: Biryani Platter"
                  dimensions="600 x 800"
                  className="w-full h-full"
                  theme="warm"
                  previewSrc="/assets/hero-biryani.jpg"
                >
                  {/* Floating Google Rating Pill from Screenshot */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[#181c1a]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 shadow-sm">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="tabular-nums font-bold">4.4/5</span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider">Google Rating</span>
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-white/90 bg-[#181c1a]/85 backdrop-blur-sm px-3.5 py-2 rounded-2xl border border-white/10">
                    <span className="font-mono text-[11px] text-amber-200/90">01</span>
                    <span className="font-medium">Made for sharing</span>
                  </div>
                </MediaPlaceholder>
              </div>

              {/* Card 2: Chef in Action / Plating */}
              <div className="relative rounded-3xl overflow-hidden shadow-sm aspect-[4/5] sm:aspect-[3/4] border border-[#e3dfd3] bg-[#ece8dc] sm:translate-y-6">
                <MediaPlaceholder
                  id="hero-chef"
                  label="Hero Chef: Kitchen Plating"
                  dimensions="600 x 800"
                  className="w-full h-full"
                  theme="warm"
                  previewSrc="/assets/hero-chef.jpg"
                >
                  {/* Bottom Subtle Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-[#2b2f2c] bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-2xl border border-black/5">
                    <span className="font-medium">Freshly Cooked</span>
                    <span className="text-[11px] text-[#6b7168]">Karachi Heritage</span>
                  </div>
                </MediaPlaceholder>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
