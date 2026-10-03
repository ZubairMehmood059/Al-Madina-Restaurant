import React from 'react';

export const Marquee: React.FC = () => {
  const marqueeItems = [
    'AUTHENTIC FLAVORS',
    'GOOD COMPANY',
    'OPEN 24 HOURS',
    'KARACHI',
    'TRADITIONAL KARAHI',
    'CHARCOAL BBQ',
    'FRESH BIRYANI',
    'FAMILY SEATING',
  ];

  return (
    <div
      role="region"
      aria-label="Restaurant highlights"
      className="relative w-full overflow-hidden border-y border-[#e2ddd0] bg-[#f8f6ee] py-3.5 my-6 sm:my-10 select-none"
    >
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 text-[12px] sm:text-xs font-semibold tracking-widest uppercase text-[#343b35]">
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
};
