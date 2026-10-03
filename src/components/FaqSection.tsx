import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/restaurantData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#ebe6d8]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Matching Screenshot) */}
        <div className="lg:col-span-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3b433c] block mb-2">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#161a18] tracking-tight">
            Before <span className="italic font-serif font-normal text-[#252b27]">you visit.</span>
          </h2>
        </div>

        {/* Right Column: Clean Accordion List */}
        <div className="lg:col-span-8 divide-y divide-[#e2ddd0]">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full flex items-center justify-between text-left gap-4 group min-h-[44px] py-1 focus-visible:ring-2 focus-visible:ring-[#181c1a] rounded-lg transition-colors"
                >
                  <span className="text-base sm:text-lg font-serif text-[#1b1e1c] group-hover:text-amber-900 transition-colors">
                    {item.question}
                  </span>
                  <div
                    className={`p-1.5 text-[#4a524a] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#181c1a]' : ''
                    }`}
                  >
                    <ChevronDown size={18} aria-hidden="true" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="pt-3 pr-8 text-xs sm:text-sm text-[#343c35] leading-relaxed animate-in fade-in duration-200"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
