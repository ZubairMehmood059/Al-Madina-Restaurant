import React from 'react';
import { Phone, Clock, ArrowRight } from 'lucide-react';
import { MediaPlaceholder } from './MediaPlaceholder';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const PlaceStory: React.FC = () => {
  return (
    <section id="story" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        
        {/* Left Dark Card (The Place) with Hover Polish */}
        <div className="lg:col-span-6 bg-[#161a18] text-[#e8eee9] rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-sm border border-[#272e2a] hover:border-[#38423c] transition-all duration-300 group">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#a8b3ac] block">
              THE PLACE
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
              A neighborhood table,{' '}
              <span className="italic font-serif font-normal text-amber-200">
                made welcoming.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#d8e0da] leading-relaxed">
              From our signature biryani to sizzling karahi, Al Madina Restaurant has
              been a cornerstone of flavor in Police Lines Quarters. We pride ourselves
              on authentic recipes, warm hospitality, and a commitment to quality that
              brings families together around the table.
            </p>
          </div>

          <div className="pt-8">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/15 text-sm font-semibold text-white hover:text-amber-200 transition-all duration-200 group/btn focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Call the restaurant</span>
              <Phone size={14} className="transition-transform duration-200 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
            </a>
          </div>
        </div>

        {/* Right Side Composition */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Top Span Image Card: Dining Ambiance with smooth image zoom */}
          <div className="sm:col-span-2 rounded-3xl overflow-hidden aspect-[16/9] border border-[#e2ddd0] bg-[#f0ede3] hover:border-[#c4bea8] transition-all duration-300 group/img">
            <div className="w-full h-full transition-transform duration-500 group-hover/img:scale-103">
              <MediaPlaceholder
                id="story-dining"
                label="The Place: Dining Atmosphere"
                dimensions="800 x 450"
                className="w-full h-full"
                theme="warm"
              >
                <div className="absolute bottom-3 right-3 text-[10px] text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full transition-opacity group-hover/img:bg-black/80">
                  Police Lines Quarters
                </div>
              </MediaPlaceholder>
            </div>
          </div>

          {/* Bottom Left: Food Detail */}
          <div className="rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-square border border-[#e2ddd0] bg-[#ebe7dc] hover:border-[#c4bea8] transition-all duration-300 group/food">
            <div className="w-full h-full transition-transform duration-500 group-hover/food:scale-105">
              <MediaPlaceholder
                id="story-bread"
                label="Tandoori Bread & Gravies"
                dimensions="400 x 400"
                className="w-full h-full"
                theme="warm"
              />
            </div>
          </div>

          {/* Bottom Right: 24/7 Stat Card with subtle hover lift */}
          <div className="rounded-3xl bg-[#f0ede3] border border-[#e1dcce] p-6 sm:p-8 flex flex-col justify-between hover:bg-[#eae5d8] hover:-translate-y-1 hover:shadow-sm transition-all duration-300">
            <span className="text-xs font-mono text-[#8b9186]">02</span>

            <div className="py-4">
              <span className="block text-4xl sm:text-5xl font-serif text-[#161a18] font-normal tracking-tight">
                24/7
              </span>
              <p className="text-xs sm:text-sm text-[#5f655d] mt-1 font-medium flex items-center gap-1.5">
                <Clock size={13} className="text-emerald-700 animate-spin" style={{ animationDuration: '12s' }} />
                <span>Open 24 hours</span>
              </p>
            </div>

            <span className="text-[11px] text-[#7d847b]">
              Breakfast, Lunch, Dinner & Late Night
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
