import React, { useState } from 'react';
import { Utensils, ShoppingBag, Menu as MenuIcon, X, SlidersHorizontal, PhoneCall, Compass } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onOpenOrderModal: () => void;
  onOpenTrackModal: () => void;
  onOpenDashboard: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrderModal,
  onOpenTrackModal,
  onOpenDashboard,
  cartCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Our Story', href: '#story' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reserve', href: '#reserve' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 pt-4 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto rounded-[28px] border border-[#dcd4c4] bg-[#fcfbf7]/90 backdrop-blur-md shadow-[0_10px_30px_rgba(17,24,17,0.06)]">
        <div className="h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Zone */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-[#181c1a] text-amber-100 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-sm group-hover:shadow-md">
            <Utensils size={18} className="text-[#f4ede1]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-[#171918] uppercase leading-none font-sans group-hover:text-amber-900 transition-colors">
              AL MADINA
            </span>
            <span className="text-[10px] tracking-widest text-[#727571] uppercase font-sans mt-0.5">
              RESTAURANT
            </span>
          </div>
        </a>

        {/* Center Nav Links (Desktop) with Smooth Hover Animations */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-[#4f534e]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1.5 hover:text-[#171918] transition-colors group/nav"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#181c1a] transition-all duration-300 ease-out group-hover/nav:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action Zone */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Track Order Live Button */}
          <button
            onClick={onOpenTrackModal}
            title="Track Live Kitchen & Delivery Status"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#181c1a] hover:text-black bg-[#f0ebd9] hover:bg-[#e6dec8] rounded-full transition-all duration-200 border border-[#ded5be] hover:shadow-xs active:scale-95 group/track"
          >
            <Compass size={13} className="text-emerald-700 transition-transform duration-500 group-hover/track:rotate-45" />
            <span className="hidden sm:inline">Track Order</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </button>

          {/* Quick Staff Dashboard Toggle */}
          <button
            onClick={onOpenDashboard}
            title="Management Dashboard & Media Slots"
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#4f534e] hover:text-[#171918] bg-[#f4f1e7] hover:bg-[#eae5d7] rounded-full transition-all border border-[#ded8c7] active:scale-95"
          >
            <SlidersHorizontal size={13} />
            <span>Dashboard</span>
          </button>

          {/* Primary Action: Order Now */}
          <button
            onClick={onOpenOrderModal}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#181c1a] hover:bg-[#2c332f] rounded-full shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 group/btn"
          >
            <ShoppingBag size={15} className="transition-transform group-hover/btn:-translate-y-0.5" />
            <span className="whitespace-nowrap">Order Now</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#171918] hover:bg-[#efebe0] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
        </div>
      </div>

      {/* Mobile Drawer with smooth animations */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fcfbf7] border-b border-[#ece8dc] px-5 py-6 space-y-4 animate-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#3b3e39] hover:text-[#171918] py-1 border-b border-[#f0ece1] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#8c948b]">→</span>
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-[#181c1a] bg-[#f0ebd9] rounded-xl border border-[#ded5be]"
            >
              <Compass size={15} className="text-emerald-700" />
              <span>Track Live Order Status</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#181c1a] bg-[#ede8da] rounded-xl"
            >
              <SlidersHorizontal size={15} />
              <span>Open Staff Dashboard & Media Slots</span>
            </button>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-[#181c1a] rounded-xl"
            >
              <PhoneCall size={15} />
              <span>Call: {RESTAURANT_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
