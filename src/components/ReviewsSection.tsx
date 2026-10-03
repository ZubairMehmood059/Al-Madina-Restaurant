import React, { useState } from 'react';
import { Star, MessageSquarePlus, X, Check } from 'lucide-react';
import { Review } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

const buildAvatarDataUrl = (name: string, female = false) => {
  const safeName = name.trim() || 'Guest';
  const hash = [...safeName].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const palette = female
    ? ['#F7C7D9', '#F9E5C8', '#DFA4C7', '#8D4F6F', '#F8F5F1']
    : ['#D7E8FF', '#F5D7A6', '#A7D1FF', '#7C9CD4', '#F6F3EE'];
  const bg = palette[hash % palette.length];
  const skin = '#F4C7A1';
  const hair = female ? '#3B2A2A' : '#4A3B2B';
  const shirt = female ? '#C25A7B' : '#18312D';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="${safeName} avatar">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${bg}"/>
          <stop offset="100%" stop-color="${palette[(hash + 1) % palette.length]}"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="30" fill="url(#bg)"/>
      <circle cx="60" cy="46" r="25" fill="${skin}"/>
      <path d="M35 48c2-18 14-28 25-28 15 0 27 10 29 28v8H35v-8Z" fill="${hair}"/>
      <path d="M38 91c4-16 18-24 22-24s19 8 22 24v11H38V91Z" fill="${shirt}"/>
      <circle cx="51" cy="48" r="2.5" fill="#2B2A2A"/>
      <circle cx="69" cy="48" r="2.5" fill="#2B2A2A"/>
      <path d="M52 59c4 5 12 5 16 0" stroke="#C67863" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M44 85c8 6 24 6 32 0" stroke="${shirt}" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.45"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'dateAgo' | 'source'>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    onAddReview({
      author: name.trim(),
      rating,
      text: text.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setName('');
      setText('');
      setRating(5);
    }, 1800);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3e453e] block mb-2">
            FROM OUR GUESTS
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#151816] tracking-tight">
            What people <span className="italic font-serif font-normal text-[#252b27]">are saying.</span>
          </h2>
        </div>

        {/* Google Rating Block (matching screenshot layout) */}
        <div className="flex items-center gap-4 bg-[#f2eee3] px-5 py-3 rounded-2xl border border-[#ded8c9] self-start md:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl sm:text-3xl font-serif text-[#161a18] tabular-nums font-normal">
              {RESTAURANT_INFO.rating}
            </span>
            <Star size={20} className="fill-amber-500 text-amber-500" aria-hidden="true" />
          </div>
          <div className="border-l border-[#d4cdbe] pl-3.5 text-xs text-[#323933]">
            <div className="font-bold text-[#181c1a]">Google rating</div>
            <div className="text-[11px] text-[#4d554e] font-medium">{RESTAURANT_INFO.reviewCount} reviews verified</div>
          </div>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.slice(0, 3).map((rev) => {
          const isDark = rev.isDark;

          return (
            <div
              key={rev.id}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                isDark
                  ? 'bg-[#181c1a] text-white border border-[#2a302c] hover:border-[#424c46] shadow-md'
                  : 'bg-[#f4f2e8] text-[#161917] border border-[#e4dfd2] hover:border-[#c5bea8] hover:bg-[#faf8f0]'
              }`}
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-5" aria-label={`${rev.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={
                        i < rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-300 text-gray-300'
                      }
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p
                  className={`text-lg sm:text-xl font-serif leading-snug tracking-tight mb-8 ${
                    isDark ? 'text-white' : 'text-[#181c1a]'
                  }`}
                >
                  "{rev.text}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="flex items-center gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                <img
                  src={buildAvatarDataUrl(rev.author, rev.author.toLowerCase().includes('ayesha') || rev.author.toLowerCase().includes('hira') || rev.author.toLowerCase().includes('sana'))}
                  alt={`${rev.author} avatar`}
                  className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
                  aria-label={`${rev.author} profile picture`}
                />
                <div>
                  <h4
                    className={`text-xs sm:text-sm font-semibold leading-tight ${
                      isDark ? 'text-white' : 'text-[#181c1a]'
                    }`}
                  >
                    {rev.author}
                  </h4>
                  <p
                    className={`text-[11px] mt-0.5 ${
                      isDark ? 'text-[#b9c3bc]' : 'text-[#4e554d]'
                    }`}
                  >
                    {rev.dateAgo}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer: Leave Feedback */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-xs font-semibold text-[#181c1a] bg-[#eeeae0] hover:bg-[#e3ded2] rounded-full transition-colors border border-[#dcd6c7] focus-visible:ring-2 focus-visible:ring-[#181c1a]"
        >
          <MessageSquarePlus size={15} />
          <span>Leave a Customer Review</span>
        </button>
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-[#fcfbf7] border border-[#e2ddd0] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#6c7269] hover:text-[#181c1a]"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h3 className="text-xl font-serif text-[#181c1a]">Thank you for your feedback!</h3>
                <p className="text-xs text-[#5e645c]">
                  Your review has been shared with the Al Madina Restaurant team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] uppercase font-semibold text-[#7c837a]">Feedback</span>
                  <h3 className="text-2xl font-serif text-[#161a18]">Write a Review</h3>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#484d46] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full bg-[#f4f2e9] text-sm px-4 py-2.5 rounded-xl border border-[#ded8c9] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#484d46] mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={24}
                          className={
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#484d46] mb-1">Your Experience</label>
                  <textarea
                    rows={3}
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell us what dish you enjoyed or how the service was..."
                    className="w-full bg-[#f4f2e9] text-sm px-4 py-2.5 rounded-xl border border-[#ded8c9] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#181c1a] text-white text-xs font-semibold rounded-xl hover:bg-[#2c332e] transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
