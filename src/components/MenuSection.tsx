import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Plus, Check } from 'lucide-react';
import { MenuItem, CategoryType } from '../types';
import { MediaPlaceholder } from './MediaPlaceholder';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface MenuSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ items, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories: CategoryType[] = [
    'All',
    'Featured',
    'Biryani',
    'Karahi',
    'BBQ',
    'Fast Food',
    'Drinks',
  ];

  const filteredItems = useMemo(() => {
    return items.filter((dish) => {
      const matchesCategory =
        selectedCategory === 'All'
          ? true
          : selectedCategory === 'Featured'
          ? dish.category === 'Featured' || dish.tag === "Chef's Pick" || dish.tag === 'Popular' || dish.tag === 'Best Seller'
          : dish.category === selectedCategory;

      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dish.tag && dish.tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const handleQuickAdd = (dish: MenuItem) => {
    onAddToCart(dish);
    setAddedItemIds((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [dish.id]: false }));
    }, 1500);
  };

  const getDirectWhatsAppUrl = (dish: MenuItem) => {
    const text = `Salam! I want to order "${dish.name}" (Rs. ${dish.price}) from Al Madina Restaurant.`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="menu" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3e453e] block mb-2">
            THE MENU
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#151816] tracking-tight">
            Something for <span className="italic font-serif font-normal text-[#242926]">every craving.</span>
          </h2>
        </div>

        {/* Search Dish Input */}
        <div className="relative w-full md:w-72">
          <label htmlFor="dish-search-input" className="sr-only">Search dishes</label>
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#575e56]" aria-hidden="true" />
          <input
            id="dish-search-input"
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f4f2e9] text-[#1b1e1c] text-sm pl-11 pr-4 py-3 min-h-[44px] rounded-full border border-[#ded8cb] placeholder-[#626a61] focus:outline-none focus:ring-2 focus:ring-[#181c1a] focus:bg-white transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div role="tablist" aria-label="Menu dish categories" className="flex items-center gap-2 overflow-x-auto pb-6 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 min-h-[42px] rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#181c1a] ${
                isActive
                  ? 'bg-[#181c1a] text-white shadow-sm'
                  : 'bg-[#f4f2e9] text-[#424942] hover:bg-[#eae6d9] hover:text-[#181c1a] border border-[#e6e1d4]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Dishes Grid (3 Columns Desktop, matching screenshots) */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#f7f5ed] rounded-3xl border border-[#ded8c7] animate-in fade-in duration-300">
          <p className="text-base text-[#464e46]">No dishes matched "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs font-semibold text-[#181c1a] underline hover:text-black focus-visible:ring-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {filteredItems.map((dish) => {
            const isAdded = addedItemIds[dish.id];

            return (
              <div
                key={dish.id}
                className="group flex flex-col justify-between bg-[#fcfbf7] p-3 sm:p-4 rounded-3xl border border-transparent hover:border-[#ded6c5] hover:bg-[#fffdf8] hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Media Placeholder with Tag Overlay & Hover Zoom */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#e4dfd2] bg-[#f0ede3] group-hover:border-[#c5bfae] transition-colors">
                    <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
                      <MediaPlaceholder
                        id={dish.placeholderId}
                        label={dish.name}
                        dimensions={dish.dimensions}
                        className="w-full h-full"
                        theme="warm"
                      />
                    </div>

                    {/* Top Category / Specialty Tag Pill */}
                    {dish.tag && (
                      <div className="absolute top-3 left-3 z-20 pointer-events-none">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#181c1a]/90 backdrop-blur-sm text-white border border-white/10 shadow-sm transition-transform duration-200 group-hover:scale-105">
                          {dish.tag}
                        </span>
                      </div>
                    )}

                    {/* Quick Add overlay button with micro-animation */}
                    <button
                      onClick={() => handleQuickAdd(dish)}
                      aria-label={`Add ${dish.name} to order tray`}
                      className={`absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-200 active:scale-85 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#181c1a] ${
                        isAdded
                          ? 'bg-emerald-600 text-white scale-110'
                          : 'bg-white/95 hover:bg-white text-[#181c1a] hover:scale-110'
                      }`}
                    >
                      {isAdded ? (
                        <Check size={18} className="animate-in zoom-in duration-200" />
                      ) : (
                        <Plus size={18} />
                      )}
                    </button>
                  </div>

                  {/* Title & Price Header */}
                  <div className="flex items-baseline justify-between gap-3 pt-4 pb-1.5">
                    <h3 className="text-lg sm:text-xl font-serif text-[#161917] font-normal group-hover:text-amber-900 transition-colors">
                      {dish.name}
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-[#181c1a] tabular-nums whitespace-nowrap">
                      Rs. {dish.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#3e463f] leading-relaxed line-clamp-2">
                    {dish.description}
                  </p>
                </div>

                {/* Card Action Link: Exact button style from PDF screenshot with arrow animation */}
                <div className="pt-4 flex items-center justify-between border-t border-[#f0ece0] mt-3">
                  <a
                    href={getDirectWhatsAppUrl(dish)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#181c1a] hover:text-[#5a645d] transition-colors py-1 group/btn focus-visible:ring-2"
                  >
                    <span>Order on WhatsApp</span>
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-200 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                    />
                  </a>

                  <button
                    onClick={() => handleQuickAdd(dish)}
                    className="text-xs font-semibold text-[#4e554d] hover:text-[#181c1a] transition-colors active:scale-95 py-1 px-2 rounded focus-visible:ring-2"
                  >
                    {isAdded ? 'Added ✓' : '+ Add to Tray'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
