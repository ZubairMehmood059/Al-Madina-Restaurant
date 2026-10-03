import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MediaPlaceholder } from './MediaPlaceholder';

export const FindUsSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        
        {/* Left Card: Map Visual & Prompt */}
        <div className="lg:col-span-7 relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[440px] border border-[#dcd7c7] bg-[#ece8dc] flex flex-col justify-between p-8 sm:p-10 shadow-sm">
          {/* Background Map Placeholder */}
          <div className="absolute inset-0 z-0">
            <MediaPlaceholder
              id="location-map"
              label="Karachi Police Lines Map View"
              dimensions="800 x 500"
              className="w-full h-full opacity-60"
              theme="warm"
            />
          </div>

          {/* Foreground Top Info */}
          <div className="relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#343b35] block mb-2">
              FIND US
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#161a18] tracking-tight">
              Come by <span className="italic font-serif font-normal text-[#272d29]">and stay awhile.</span>
            </h2>
          </div>

          {/* Foreground Bottom CTA */}
          <div className="relative z-10 pt-16">
            <div className="bg-[#181c1a]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 text-white max-w-md shadow-lg space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={17} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs sm:text-sm text-gray-100 leading-snug">
                  {RESTAURANT_INFO.address}
                </p>
              </div>

              <div>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-white text-[#181c1a] text-xs font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                >
                  <MapPin size={15} aria-hidden="true" />
                  <span>Open in Google Maps</span>
                  <ExternalLink size={13} className="opacity-75" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Contact Details Card (Matching Screenshot) */}
        <div className="lg:col-span-5 bg-[#f4f2e9] rounded-3xl p-8 sm:p-10 border border-[#ded8c9] flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3b433c] block mb-2">
              CONTACT
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#161a18] mb-8">
              Al Madina Restaurant
            </h3>

            {/* List of Details with Icons */}
            <div className="space-y-6">
              {/* Call */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#eae5d7] flex items-center justify-center text-[#181c1a] shrink-0 mt-0.5">
                  <Phone size={17} aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#434b44]">
                    CALL
                  </span>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="text-sm sm:text-base font-semibold text-[#181c1a] hover:underline"
                  >
                    {RESTAURANT_INFO.phoneFormatted}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#eae5d7] flex items-center justify-center text-[#181c1a] shrink-0 mt-0.5">
                  <Clock size={17} aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#434b44]">
                    HOURS
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[#181c1a]">
                    Open 24 Hours
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#eae5d7] flex items-center justify-center text-[#181c1a] shrink-0 mt-0.5">
                  <MapPin size={17} aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#434b44]">
                    ADDRESS
                  </span>
                  <span className="text-xs sm:text-sm text-[#313832] font-medium leading-relaxed block">
                    {RESTAURANT_INFO.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-6 border-t border-[#ded8c9]">
            <span className="text-xs text-[#4c544d] font-medium">
              Direct takeaway orders, table bookings & queries available anytime.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
